import ChatBar from "@/components/chatBar";
import ChatBody from "@/components/chatBody";
import ChatFooter from "@/components/chatFooter";
import React from "react";

export default function Page() {
  return (
    <div className="flex h-screen">
      <ChatBar />
      <div className="flex flex-col flex-grow">
        <ChatBody />
        {/* Pass socket to ChatFooter */}
        <ChatFooter />
      </div>
    </div>
  );
}
