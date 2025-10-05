import api from './api';

export const getProducts = async (params) => {
  const res = await api.get('/products', { params });
  return res.data;
};

export const getProduct = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const createProduct = async (formData) => {
  const res = await api.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};

export const getMyProducts = async () => {
  const res = await api.get('/products/my/listings');
  return res.data;
};

export const markInterest = async (id) => {
  const res = await api.post(`/products/${id}/interest`);
  return res.data;
};
