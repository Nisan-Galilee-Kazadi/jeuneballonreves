import axios from 'axios';

// Use environment variable for production, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
});

export const getPosts = () => api.get('/posts');
export const createPost = (data) => api.post('/posts', data);
export const reactToPost = (id, type) => api.post(`/posts/${id}/react`, { type });

export default api;
