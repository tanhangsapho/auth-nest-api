import React from "react";

const ChatBar = () => {
  return (
    <div className="bg-gray-800 text-white h-full p-4 w-1/4 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Open Chat</h2>

      <div>
        <h4 className="text-lg font-semibold mb-4">ACTIVE USERS</h4>
        <div className="space-y-2">
          <p className="bg-gray-700 p-2 rounded-md">User 1</p>
          <p className="bg-gray-700 p-2 rounded-md">User 2</p>
          <p className="bg-gray-700 p-2 rounded-md">User 3</p>
          <p className="bg-gray-700 p-2 rounded-md">User 4</p>
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
