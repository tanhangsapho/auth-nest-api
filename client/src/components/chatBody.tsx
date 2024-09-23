'use client'

import React, { useEffect, useState } from "react";

const ChatBody = () => {
  const [messages, setMessages] = useState([
    { id: 1, name: "bpl-00406", text: "How are you doing?" },
    { id: 2, name: "You", text: "I'm good, you?" },
    { id: 3, name: "bpl-00406", text: "Same bro!" },
    { id: 4, name: "nevodavid", text: "Hey guys, what's up?" },
    { id: 5, name: "You", text: "Not much, just chilling." },
  ]);

  useEffect(() => {
    // Store username in localStorage
    localStorage.setItem("userName", "You");
  }, []);

  return (
    <>
      {/* Chat Header */}
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <p className="text-lg font-semibold">Chat Room</p>
      </header>

      {/* Chat Messages */}
      <div className="p-6 space-y-4 overflow-y-auto h-[calc(100vh-80px)] bg-gray-100">
        {messages.map((message) =>
          message.name === localStorage.getItem("userName") ? (
            <div className="message__chats text-right" key={message.id}>
              <p className="text-sm text-gray-500 mb-1">You</p>
              <div className="inline-block bg-blue-500 text-white p-3 rounded-xl max-w-xs">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats text-left" key={message.id}>
              <p className="text-sm text-gray-500 mb-1">{message.name}</p>
              <div className="inline-block bg-gray-300 text-black p-3 rounded-xl max-w-xs">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default ChatBody;
