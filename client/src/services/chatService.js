import api from './api';

export const getChats = async () => {
  const res = await api.get('/chats');
  return res.data;
};

export const getOrCreateChat = async (productId, receiverId) => {
  const res = await api.post('/chats', { productId, receiverId });
  return res.data;
};

export const getChat = async (id) => {
  const res = await api.get(`/chats/${id}`);
  return res.data;
};

export const sendMessage = async (chatId, content) => {
  const res = await api.post(`/chats/${chatId}/messages`, { content });
  return res.data;
};

export const markAsRead = async (chatId) => {
  const res = await api.put(`/chats/${chatId}/read`);
  return res.data;
};
