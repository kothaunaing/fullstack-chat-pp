import React, { useEffect, useRef, useState } from "react";
import useChatStore from "../store/useChatStore";
import { Loader2, Send } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import { format } from "date-fns";

const Messages = () => {
  const { authUser, onlineUsers } = useAuthStore();
  const {
    selectedUser,
    messages,
    getMessages,
    isMessageLoading,
    sendMessage,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const [message, setMessage] = useState("");
  const isUserOnline = onlineUsers.includes(selectedUser._id);
  const messageEndRef = useRef();

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessageLoading)
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin" />
        Loading...
      </div>
    );

  return (
    <div className="flex flex-col min-h-[90vh]">
      <div className="border-b border-b-base-200">
        <button className="w-full flex gap-x-2 items-center  p-1 rounded-md transition-colors">
          <div
            className={`avatar placeholder size-10 ${
              isUserOnline ? "online" : "offline"
            }`}
          >
            {selectedUser.profilePic ? (
              <img
                src={selectedUser.profilePic}
                className="object-cover object-center rounded-full"
              />
            ) : (
              <div className="size-10 bg-primary rounded-full text-primary-content font-bold">
                {selectedUser.fullName[0].toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex flex-col items-start">
            <p>{selectedUser.fullName}</p>
            <p className="text-sm text-base-content">Online</p>
          </div>
        </button>
      </div>
      <div className="max-h-[70vh] overflow-y-auto">
        {messages.map((message) => {
          const isMyMessage = message.senderId === authUser._id;

          return (
            <div
              className={`chat ${
                isMyMessage ? "chat-end text-right" : "chat-start text-left"
              } `}
              ref={messageEndRef}
            >
              <div className="bg-primary chat-bubble text-primary-content rounded-lg max-w-max p-2 m-2">
                <p className="text-primary-content">{message.text}</p>
                <p className="text-sm mt-2 text-primary-content">
                  {format(message.createdAt, "MMM d, yyyy h:mm a")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-x-1 mt-auto border-t border-t-base-200 p-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter a message"
          className="input input-bordered w-full"
        />
        <button
          onClick={() => {
            sendMessage(selectedUser._id, {
              senderId: authUser._id,
              receiverId: selectedUser._id,
              text: message,
            });
            setMessage("");
          }}
          className="btn"
        >
          <Send />
        </button>
      </div>
    </div>
  );
};

export default Messages;
