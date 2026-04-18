import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // SimpleJWT uses user_id by default
                setUser({ id: decoded.user_id });
            } catch (error) {
                console.error("Invalid token", error);
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
            }
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        const response = await api.post('/accounts/login/', { username, password });
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        const decoded = jwtDecode(response.data.access);
        setUser({ id: decoded.user_id, username });
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
