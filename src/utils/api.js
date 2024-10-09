import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
        console.error('No token found in sessionStorage');
        return {};
    }
    return {
        Authorization: `Bearer ${token}`,
    };
};

export const updateUser = async (user) => {
    try {
        const response = await axios.put(`${API_URL}/users/${user._id}`, user, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const signupUser = async (name, email, password, phone, profession) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, {
            name,
            email,
            password,
            phone,
            profession,
        });
        return response.data;
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};

export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`, {
            headers: getAuthHeaders(),
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        await axios.delete(`${API_URL}/users/${userId}`, {
            headers: getAuthHeaders(),
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
