import axios from 'axios';

const API = axios.create({
    baseURL: 'https://health-wallet-irqm.onrender.com/api',
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;