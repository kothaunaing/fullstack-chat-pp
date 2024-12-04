import { MessageSquare } from "lucide-react";
import React from "react";

const NoChatSelected = () => {
  return (
    <div className="flex flex-col items-center  justify-center flex-1 min-h-screen">
      <div className="bg-primary/10 size-12 flex items-center justify-center animate-bounce rounded-md">
        <MessageSquare className="text-primary " />
      </div>
      <h1 className="font-bold text-2xl">Welcome to Chatty</h1>
      <p>Select a conversion from the sidebar to start chatting</p>
    </div>
  );
};

export default NoChatSelected;
