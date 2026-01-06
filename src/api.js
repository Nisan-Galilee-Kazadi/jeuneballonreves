import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const getPosts = () => api.get('/posts');
export const createPost = (data) => api.post('/posts', data);
export const reactToPost = (id, type) => api.post(`/posts/${id}/react`, { type });

export default api;
