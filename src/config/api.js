// Configuration API pour le client
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
    // Auth & Users
    messages: `${API_BASE_URL}/messages`,
    visitors: `${API_BASE_URL}/visitors`,
    
    // Admin
    admin: {
        stats: `${API_BASE_URL}/admin/stats`,
        messages: `${API_BASE_URL}/admin/messages`,
        news: `${API_BASE_URL}/admin/news`,
        posts: `${API_BASE_URL}/posts`,
        partners: `${API_BASE_URL}/partners`,
        aggregateNews: `${API_BASE_URL}/admin/aggregate-news`,
        verifySource: `${API_BASE_URL}/admin/verify-source`
    },
    
    // Public
    news: `${API_BASE_URL}/news`,
    posts: `${API_BASE_URL}/posts`
};

export default API_ENDPOINTS;
