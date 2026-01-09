import axios from 'axios';

// Use environment variable for production, fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'https://jbrbackend.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000, // 10 second timeout
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add response interceptor for better error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Log detailed error for debugging
        console.error('API Error:', {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });

        // Handle network errors and timeouts
        if (!error.response) {
            throw new Error('Erreur de connexion au serveur. Vérifiez votre connexion internet.');
        }

        // Handle HTTP errors
        const status = error.response.status;
        const message = error.response.data?.error || error.response.data?.message || 'Erreur serveur';

        switch (status) {
            case 400:
                throw new Error(`Requête invalide: ${message}`);
            case 401:
                throw new Error('Non autorisé: Veuillez vous connecter');
            case 403:
                throw new Error('Accès interdit: Permissions insuffisantes');
            case 404:
                throw new Error(`Ressource non trouvée: ${message}`);
            case 429:
                throw new Error('Trop de requêtes: Veuillez réessayer plus tard');
            case 500:
                throw new Error(`Erreur serveur: ${message}`);
            default:
                throw new Error(`Erreur ${status}: ${message}`);
        }
    }
);

export const getPosts = () => api.get('/posts');
export const createPost = (data) => api.post('/posts', data);
export const reactToPost = (id, type) => api.post(`/posts/${id}/react`, { type });
export const deletePost = (id) => api.delete(`/posts/${id}`);

// Admin routes
export const aggregateNews = () => api.get('/admin/aggregate-news');
export const verifyRSSSource = (url) => api.post('/admin/verify-source', { url });

export default api;
