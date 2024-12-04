import { LogOutIcon, MessageSquare, Settings, UserIcon } from "lucide-react";
import React from "react";
import useAuthStore from "../store/useAuthStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-base-100 border-b border-base-300 sticky w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to={"/"}
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="size-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chatty</h1>
            </Link>
          </div>
          <div className="flex gap-1">
            <Link to={"/settings"} className=" btn btn-sm">
              <Settings className="size-5" />
              <span className="hidden lg:block">Settings</span>
            </Link>
            {authUser && (
              <>
                <Link to={"/profile"} className=" btn btn-sm">
                  <UserIcon className="size-5" />
                  <span className="hidden lg:block">Profile</span>
                </Link>
                <button onClick={logout} className=" btn btn-sm">
                  <LogOutIcon className="size-5" />
                  <span className="hidden lg:block">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
