// src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. BUAT CONTEXT
const AuthContext = createContext(null);

// 2. BUAT PROVIDER
export const AuthProvider = ({ children }) => {
    // Ambil user dari localStorage saat inisialisasi
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Error parsing user from localStorage", error);
            return null;
        }
    });

    // Simpan user ke localStorage setiap kali user berubah
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = (userData) => {
        // userData adalah objek user dari DUMMY_USERS
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}> 
            {children}
        </AuthContext.Provider>
    );
};

// 3. CUSTOM HOOK
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};