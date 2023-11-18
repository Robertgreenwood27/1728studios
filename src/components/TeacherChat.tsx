import React, { useState, useMemo, useRef, useLayoutEffect } from 'react';
import builder from '../lib/imageUrlBuilder';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { generatePrompt } from '../lib/generatePrompt';

const TeacherChat = ({ teacher }) => {
  const [chatLog, setChatLog] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef(null);
  
  useLayoutEffect(() => {
    if (!isLoading) {
      const scrollArea = scrollAreaRef.current;
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      } else {
        console.log("Scroll area not found");
      }
    }
  }, [isLoading]);

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
    setIsLoading(true); // Show loader
  
    const newChatLog = [
      ...chatLog,
      { sender: 'user', message: userInput }
    ];
  
    // Map the chatLog array to the expected format
    const messages = newChatLog.map(chat => ({
      role: chat.sender === 'user' ? 'user' : 'system',
      content: chat.message
    }));

    
  // Generate the initial prompt based on the teacher's data
  const initialPrompt = generatePrompt(teacher);

  
    // Add the initial prompt to the messages array
  messages.unshift({ role: 'system', content: initialPrompt });  // Add the initial prompt here
  
    // Call your own API route
    const res = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: messages }),
    });

    const data = await res.json();

    // Check for errors in the API response
    if (res.status !== 200) {
      console.error("Error from API:", data);
      newChatLog.push({ sender: 'api', message: "An error occurred." });
    } else {
      newChatLog.push({ sender: 'api', message: data.message });
    }

    setChatLog(newChatLog);
    setUserInput('');
    setIsLoading(false); // Hide loader
  };

  

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col items-center w-11/12 mx-auto text-white bg-black shadow-2xl hover:scale-105 transition-all ease-in-out duration-200 border-blue-800 rounded-xl">
  <header className="flex flex-col items-center w-full p-6 border-blue-800 rounded-xl shadow-inner">
    <div 
      className="w-36 h-36 rounded-full bg-cover bg-center shadow-2xl ring-4 ring-zinc-100"
      style={{
        backgroundImage: `url('${bgImagePath}')`,
      }}
    >
      <img src={imageUrl} alt={teacher.name} className="object-cover w-full h-full rounded-full" />
    </div>
    <h2 className="mt-6 text-3xl font-extrabold tracking-wider text-zinc-400">{teacher.name}</h2>
    <span className="mt-2 text-lg text-zinc-500">{teacher.departmentOrSubject}</span>
  </header>
  <div className="flex flex-col items-center w-full flex-grow p-6 bg-zinc-900 rounded-b-lg shadow-inner">
  <div className="flex flex-col items-center w-full flex-grow p-6 bg-zinc-900 rounded-b-lg shadow-inner">
        <div ref={scrollAreaRef} className="flex flex-col w-full h-64 overflow-y-auto custom-scrollbar bg-black rounded-lg shadow-2xl">
          {isLoading ? (
            <div className="loader-container flex justify-center items-center h-full">
              <div className="loader"></div>
            </div>
          ) : (
            chatLog.map((chat, index) => (
              <div key={index} className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'} m-2`}>
                <div className={`inline-flex px-6 py-3 rounded-lg text-sm shadow-2xl ${chat.sender === 'user' ? 'bg-indigo-900' : 'bg-zinc-800'}`}>
                  {chat.message}
                </div>
              </div>
            ))
          )}
        </div>
</div>

<Textarea
  value={isLoading ? 'Loading...' : userInput}
  onChange={(e) => setUserInput(e.target.value)}
  onKeyDown={handleKeyDown}
  placeholder="Type your message..."
  className="w-full mt-6 p-4 text-sm bg-black border-blue-800 rounded-xl focus:ring focus:ring-indigo-700 custom-scrollbar"  // Added custom-scrollbar
/>

    <Button 
  onClick={handleSendMessage} 
  className={`mt-4 px-10 py-2 text-sm font-semibold rounded-full shadow-2xl transform hover:scale-105 ${isLoading ? 'bg-black' : 'bg-indigo-800 hover:bg-indigo-900'}`}>
  {isLoading ? '...' : 'Send'}
</Button>

  </div>
</Card>


  );
  
};

export default TeacherChat;
