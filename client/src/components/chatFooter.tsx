"use client"

import React, { useState } from "react";

const ChatFooter = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ userName: localStorage.getItem("userName"), message });
    setMessage("");
  };

  return (
    <div className="bg-gray-800 p-4">
      <form className="flex space-x-3" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
        >
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
