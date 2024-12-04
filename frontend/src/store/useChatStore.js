import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import useAuthStore from "./useAuthStore";

const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });

    try {
      const res = await axiosInstance.get("/message/user");
      set({ users: res.data });
      set({ isUserLoading: false });
    } catch (error) {
      console.log("Error in getUsers function " + error.message);
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessages: async (userId, limit = 50) => {
    try {
      set({ isMessageLoading: true });
      const res = await axiosInstance.get(`/message/${userId}`, { limit });
      set({ messages: res.data });
      set({ isMessageLoading: false });
    } catch (error) {
      console.log("Error in getMessages function " + error.message);
      toast.error(error.response.data.message);
    } finally {
      set({ isMessageLoading: false });
    }
  },
  setSelectedUser: (userId) => {
    set({ selectedUser: userId });
  },
  sendMessage: async (userToSendId, data) => {
    try {
      const res = await axiosInstance.post(
        `/message/send/${userToSendId}`,
        data
      );
      set({ messages: [...get().messages, res.data] });
    } catch (error) {
      console.log("Erro in sendMessage functin " + error.message);
      toast.error(error.response.data.message);
    }
  },
  subscribeToMessages: () => {
    const { selectedUser } = get();

    if (!selectedUser) return;

    const { socket } = useAuthStore.getState();

    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;

      set({ messages: [...get().messages, newMessage] });
    });
  },
  unsubscribeFromMessages: () => {
    const { socket } = useAuthStore.getState();
    socket.off("newMessage");
  },
}));

export default useChatStore;
