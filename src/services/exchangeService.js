import axios from 'axios';

const BASE_URL = "http://localhost:3030/api/exchanges";

export const getAllExchanges = () => axios.get(BASE_URL);

export const createExchange = (exchange) => axios.post(BASE_URL, exchange);
