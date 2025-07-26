import toast from 'react-hot-toast';
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from './useAuthStore';

export const useChatStore = create((set, get) => ({
  messages: [],
  globalMessages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isGlobalMessagesLoading: false,

  /** ========== USERS ========== */
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get('/messages/users');
      const users = res.data.map((user) => ({
        ...user,
        profilePic: user.profilePic || {
          public_id: '',
          secure_url: '/avatar.png',
        },
      }));
      set({ users });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch users');
    } finally {
      set({ isUsersLoading: false });
    }
  },

  /** ========== PRIVATE MESSAGES ========== */
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch messages');
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (formData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      );
      // Optimistic update
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message');
    }
  },

  deleteMessage: async (messageId) => {
    try {
      const res = await axiosInstance.delete(`/messages/delete/${messageId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg._id === messageId ? { ...msg, isDeleted: true } : msg
          ),
        }));
        toast.success('Message deleted successfully');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete message');
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    socket.off('newMessage'); // avoid duplicate listeners

    socket.on('newMessage', (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off('newMessage');
  },

  /** ========== GLOBAL CHAT ========== */
  getGlobalMessages: async () => {
    set({ isGlobalMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/global-chat`);
      set({ globalMessages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch messages');
    } finally {
      set({ isGlobalMessagesLoading: false });
    }
  },

  sendGlobalMessage: async (formData) => {
    try {
      // Do NOT push to state here. Server will broadcast back
      await axiosInstance.post('/global-chat', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message');
    }
  },

  subscribeToGlobalMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off('newGlobalMessage'); // clear existing listeners

    socket.on('newGlobalMessage', (newMessage) => {
      set((state) => {
        // Deduplicate
        if (state.globalMessages.some((m) => m._id === newMessage._id)) {
          return state;
        }
        return {
          globalMessages: [...state.globalMessages, newMessage],
        };
      });
    });
  },

  unsubscribeFromGlobalMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off('newGlobalMessage');
  },

  /** ========== STATE HELPERS ========== */
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
