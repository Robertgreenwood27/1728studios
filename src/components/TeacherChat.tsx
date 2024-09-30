import React, { useState, useMemo, useEffect, KeyboardEvent } from 'react';
import builder from '../lib/imageUrlBuilder';
import { generatePrompt } from '../lib/generatePrompt';
import { useLoading } from '../components/LoadingContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface ChatMessage {
  sender: string;
  message: string;
}

interface TeacherChatProps {
  teacher: {
    photo: string;
    name: string;
    departmentOrSubject: string;
  };
}

const TeacherChat: React.FC<TeacherChatProps> = ({ teacher }) => {
  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [userIsScrolling, setUserIsScrolling] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!userIsScrolling) {
      const chatContainer = document.getElementById('chat-container');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  }, [chatLog, userIsScrolling]);

  useEffect(() => {
    const handleUserScroll = () => {
      setUserIsScrolling(true);
      clearTimeout(timeout);
      var timeout = setTimeout(() => {
        setUserIsScrolling(false);
      }, 1000);
    };

    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleUserScroll);
    }

    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener('scroll', handleUserScroll);
      }
    };
  }, []);

  const imageUrl = builder
    .image(teacher.photo)
    .width(200)
    .height(200)
    .auto('format')
    .fit('crop')
    .url();

  const randomBgNumber = useMemo(() => Math.floor(Math.random() * 10) + 1, []);
  const bgImagePath = `/bg${randomBgNumber}.png`;

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    setIsStreaming(true);
    const newUserMessage = { sender: 'user', message: userInput };
    setChatLog(prevLog => [...prevLog, newUserMessage]);
    setUserInput('');
  
    const messages = [...chatLog, newUserMessage].map((chat) => ({
      role: chat.sender === 'user' ? 'user' : 'assistant',
      content: chat.message,
    }));
    const initialPrompt = generatePrompt(teacher);
    messages.unshift({ role: 'system', content: initialPrompt });
  
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const reader = response.body?.getReader();
      let apiResponse = '';
  
      while (true) {
        const { value, done } = await reader!.read();
        if (done) break;
  
        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n\n');
  
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(5).trim();
            if (data === '[DONE]') {
              setIsStreaming(false);
              break;
            }
            try {
              const parsed = JSON.parse(data);
              apiResponse += parsed.content;
            } catch (e) {
              console.error('Error parsing SSE data', e);
            }
          }
        }
      }

      setChatLog(prevLog => [...prevLog, { sender: 'api', message: apiResponse }]);
    } catch (error) {
      console.error('Error:', error);
      setChatLog(prevLog => [
        ...prevLog,
        { sender: 'api', message: 'An error occurred.' },
      ]);
    } finally {
      setLoading(false);
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <button onClick={() => window.history.back()} className="text-white hover:text-blue-800 ml-4 sm:ml-12 text-xl mb-4">
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="flex flex-col items-center justify-between text-white mx-4 sm:mx-8">
        <header className="flex flex-col items-center mb-6 sm:mb-10">
          <div
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-cover bg-center shadow-lg mb-4 sm:mb-6"
            style={{ backgroundImage: `url('${bgImagePath}')` }}
          >
            <img src={imageUrl} alt={teacher.name} className="w-full h-full rounded-full" />
          </div>
          <h2 className="font-bold text-zinc-300">{teacher.name}</h2>
          <span className="text-zinc-500">{teacher.departmentOrSubject}</span>
        </header>
  
        <div id="chat-container" className="flex flex-col w-full rounded-lg shadow-inner flex-grow overflow-y-auto p-4 sm:p-6 space-y-4 max-h-[50vh] sm:max-h-[60vh]">
          {chatLog.map((chat, index) => (
            <div key={index} className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'} my-2 sm:my-3`}>
              <div
                className={`inline-block px-3 py-2 sm:px-5 sm:py-3 rounded-lg ${
                  chat.sender === 'user' ? 'border-2 border-blue-800' : 'border-2 border-red-800'
                } bg-black bg-opacity-50 max-w-full break-words`}
              >
                {chat.message}
              </div>
            </div>
          ))}
          {isStreaming && (
            <div className="flex justify-start my-2 sm:my-3">
              <div className="inline-block px-3 py-2 sm:px-5 sm:py-3 rounded-lg border-2 border-red-800 bg-black bg-opacity-50">
                <span className="animate-pulse">...</span>
              </div>
            </div>
          )}
        </div>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="mt-4 sm:mt-6 p-3 sm:p-4 w-full bg-transparent text-white border border-blue-800 rounded-lg focus:ring focus:ring-blue-600"
          rows={3}
          disabled={isStreaming}
        />
        <button
          onClick={handleSendMessage}
          className="mt-4 sm:mt-6 w-full py-3 font-semibold text-white rounded-lg shadow-md transform transition duration-200 ease-in-out border-2 border-blue-800 hover:border-opacity-50 hover:border-blue-800"
          disabled={isStreaming}
        >
          Send
        </button>
      </div>
    </>
  );
};

export default TeacherChat;