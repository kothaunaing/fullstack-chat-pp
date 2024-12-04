import { create } from "zustand";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSiginingUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  socket: null,
  onlineUser: [],
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      if (res && res.data) {
        set({ authUser: res.data });
        get().connectSocket();
      }
    } catch (error) {
      console.log("Error in checkAuth " + error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSiginingUp: true });

    try {
      const res = await axiosInstance.post("/auth/signup", data);
      toast.success("Account created successfully");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in signup function " + error.message);
      toast.error(error.response.data.message);
    } finally {
      set({ isSiginingUp: false });
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout successfully");
      get().disconnectSocket();
    } catch (error) {
      console.log("Error in logout function " + error.message);
      toast.success(error.response.data.message);
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login successfully");
      get().connectSocket();
    } catch (error) {
      console.log("Error in login function " + error.message);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      set({ isUpdatingProfile: false });
      toast.success("Updated profile picture successfully");
    } catch (error) {
      console.log("Error in updateProfile " + error.message);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();

    if (get().socket?.connected || !authUser) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));

export default useAuthStore;
