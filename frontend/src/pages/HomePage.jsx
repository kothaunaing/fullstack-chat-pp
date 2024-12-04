import React, { useEffect } from "react";
import { MessageSquare, Users } from "lucide-react";
import Sidebar from "../components/Sidebar";
import MessagesContainer from "../components/MessagesContainer";
import useChatStore from "../store/useChatStore";

const HomePage = () => {
  const { getUsers } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="min-h-screen ">
      <div className="max-w-3xl mx-auto flex">
        <Sidebar />
        <MessagesContainer />
      </div>
    </div>
  );
};

export default HomePage;
