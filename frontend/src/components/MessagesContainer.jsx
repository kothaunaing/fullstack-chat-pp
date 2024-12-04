import { MessageSquare } from "lucide-react";
import useChatStore from "../store/useChatStore";
import NoChatSelected from "./NoChatSelected";
import Messages from "./Messages";

const MessagesContainer = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="flex-1 text-center min-h-screen">
      {!selectedUser ? <NoChatSelected /> : <Messages />}
    </div>
  );
};

export default MessagesContainer;
