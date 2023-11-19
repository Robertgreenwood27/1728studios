import React, { useState, useMemo, useRef, useLayoutEffect, ChangeEvent, KeyboardEvent } from 'react';
import builder from '../lib/imageUrlBuilder';
import { generatePrompt } from '../lib/generatePrompt';
import { useLoading } from '../components/LoadingContext';

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
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const { setLoading } = useLoading();

  useLayoutEffect(() => {
    const scrollArea = scrollAreaRef.current;
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [chatLog]);

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
    setLoading(true);
    const newChatLog = [...chatLog, { sender: 'user', message: userInput }];
    const messages = newChatLog.map((chat) => ({
      role: chat.sender === 'user' ? 'user' : 'system',
      content: chat.message,
    }));
    const initialPrompt = generatePrompt(teacher);
    messages.unshift({ role: 'system', content: initialPrompt });
    const res = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: messages }),
    });
    const data = await res.json();
    if (res.status !== 200) {
      console.error('Error from API:', data);
      newChatLog.push({ sender: 'api', message: 'An error occurred.' });
    } else {
      newChatLog.push({ sender: 'api', message: data.message });
    }
    setChatLog(newChatLog);
    setUserInput('');
    setLoading(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-between text-white">
      <header className="flex flex-col items-center mb-10">
        <div
          className="w-40 h-40 rounded-full bg-cover bg-center shadow-lg mb-6"
          style={{ backgroundImage: `url('${bgImagePath}')` }}
        >
          <img src={imageUrl} alt={teacher.name} className="w-full h-full rounded-full" />
        </div>
        <h2 className="font-bold text-zinc-300">{teacher.name}</h2>
        <span className="text-zinc-500">{teacher.departmentOrSubject}</span>
      </header>

      <div className="flex flex-col w-full rounded-lg shadow-inner flex-grow">
        <div ref={scrollAreaRef} className="custom-scrollbar overflow-y-auto h-96 p-6">
          {chatLog.map((chat, index) => (
            <div
              key={index}
              className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'} my-3`}
            >
              <div
                className={`inline-flex px-5 py-3 rounded-lg shadow-md ${
                  chat.sender === 'user' ? 'bg-blue-700' : ''
                }`}
              >
                {chat.message}
              </div>
            </div>
          ))}
        </div>

        <textarea
          value={userInput}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="mt-6 p-4 bg-black rounded-lg focus:ring focus:ring-blue-600"
        />

        <button
          onClick={handleSendMessage}
          className="mt-6 w-full py-3 font-semibold text-white rounded-lg shadow-md transform transition duration-200 ease-in-out border-2 border-blue-800 hover:border-opacity-50 hover:border-blue-800"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default TeacherChat;
