'use client'
import React, { createContext, ReactNode, useContext, useState } from 'react';
import Cookies from 'js-cookie'; 


interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return Cookies.get('auth') === 'true';
    });

    const login = () => {
        setIsAuthenticated(true);
        Cookies.set('auth', 'true'); 
    };

    const logout = () => {
        setIsAuthenticated(false);
        Cookies.remove('auth'); 
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};



export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};