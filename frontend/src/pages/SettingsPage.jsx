import React from "react";
import { Themes } from "../constants";
import useThemeStore from "../store/useThemeStore";
import { Send } from "lucide-react";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <h1 className="text-primary text-xl">Theme</h1>
          <p>Choose a theme for your chat interface</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 gap-4">
          {Themes.map((t) => {
            return (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className="   overflow-hidden"
              >
                <div>
                  <div
                    data-theme={t}
                    className={`h-10 flex items-center border-4 ${
                      theme === t ? "border-blue-600" : "border-base-200"
                    } rounded-md`}
                  >
                    <div className="h-full w-full bg-primary rounded-md"></div>
                    <div className="h-full w-full bg-secondary rounded-md"></div>
                    <div className="h-full w-full bg-accent rounded-md"></div>
                    <div className="h-full w-full bg-neutral rounded-md"></div>
                  </div>
                  <p className="text-sm">{t[0].toUpperCase() + t.slice(1)}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      {/* Chat Preview */}
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl text-primary mb-2">Preview</h1>
        <div className=" bg-base-200 rounded-md p-2">
          <div className="max-w-sm mx-auto     bg-base-100 rounded-md">
            <div className="p-2 border-b border-b-base-200 flex items-center gap-x-2">
              <div className="avatar  online placeholder">
                <div className="size-8  bg-primary rounded-full flex items-center justify-center text-xl text-secondary-content">
                  J
                </div>
              </div>
              <div>
                <p className="font-bold">John Doe</p>
                <p className="text-sm ">Online</p>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="bg-base-200 rounded-lg w-max p-2 m-2">
                <p className="text-sm">Hey How's it going?</p>
                <p className="text-xs text-base-content mt-1">12:00 PM</p>
              </div>
            </div>
            <div className="flex justify-end ">
              <div className="bg-primary text-primary-content rounded-lg w-max p-2 m-2">
                <p className="text-sm">I am doing great. What about you?</p>
                <p className="text-xs  mt-1">12:00 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-1 p-2 border-t border-t-base-200 mt-2">
              <div className="input input-sm input-primary w-full">
                This is a preview
              </div>
              <span className="btn btn-sm border border-primary">
                <Send className="size-5 " />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
