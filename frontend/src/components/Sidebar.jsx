import { Loader, UsersIcon } from "lucide-react";
import useChatStore from "../store/useChatStore";
import Users from "./Users";

const Sidebar = () => {
  const { isUserLoading } = useChatStore();

  return (
    <div className="m-1 border-r border-r-base-200 pr-2">
      <div className="flex gap-2">
        <UsersIcon className="size-5" />
        <p className="font-bold">Contact</p>
      </div>
      {isUserLoading ? (
        <div className="mt-24 flex justify-center">
          <Loader className="animate-spin" />
          Loading...
        </div>
      ) : (
        <Users />
      )}
    </div>
  );
};
export default Sidebar;
