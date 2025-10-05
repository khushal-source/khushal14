import api from './api';

export const getDashboardStats = async () => {
  const res = await api.get('/admin/stats');
  return res.data;
};

export const getAllUsers = async () => {
  const res = await api.get('/admin/users');
  return res.data;
};

export const getUser = async (id) => {
  const res = await api.get(`/admin/users/${id}`);
  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await api.put(`/admin/users/${id}`, data);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await api.delete(`/admin/users/${id}`);
  return res.data;
};

export const getAllProducts = async () => {
  const res = await api.get('/admin/products');
  return res.data;
};

export const deleteProductAdmin = async (id) => {
  const res = await api.delete(`/admin/products/${id}`);
  return res.data;
};
