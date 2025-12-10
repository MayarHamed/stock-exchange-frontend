import axios from 'axios';

const BASE_URL = "http://localhost:3030/api/stocks";

export const getAllStocks = () => axios.get(BASE_URL);

export const createStock = (stock) => axios.post(BASE_URL, stock);

export const updateStockPrice = (id, price) =>
  axios.put(`${BASE_URL}/${id}/price`, price);

export const deleteStock = (id) => axios.delete(`${BASE_URL}/${id}`);
