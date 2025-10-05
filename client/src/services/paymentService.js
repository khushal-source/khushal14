import api from './api';

export const createPaymentIntent = async (productId) => {
  const res = await api.post('/payment/create-intent', { productId });
  return res.data;
};

export const confirmPayment = async (paymentIntentId, productId) => {
  const res = await api.post('/payment/confirm', { paymentIntentId, productId });
  return res.data;
};

export const getTransactions = async () => {
  const res = await api.get('/payment/transactions');
  return res.data;
};

export const createTransaction = async (productId, exchangedProductId) => {
  const res = await api.post('/payment/transaction', { productId, exchangedProductId });
  return res.data;
};
