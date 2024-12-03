import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Utiliser useCallback pour stabiliser la fonction
    const loadUserProfile = useCallback(async () => {
        setIsLoading(true);
        try {
            const userProfile = await authService.getUserProfile(token);
            setUser(userProfile);
        } catch (err) {
            // Token invalide, déconnexion
            logout();
        } finally {
            setIsLoading(false);
        }
    }, [token]); // Ajouter token comme dépendance

    // Charger le profil utilisateur au démarrage si un token existe
    useEffect(() => {
        if (token) {
            loadUserProfile();
        }
    }, [token, loadUserProfile]); // Ajouter loadUserProfile comme dépendance

    const login = async (credentials) => {
        setIsLoading(true);
        setError(null);
        try {
            const { user: userData, token: authToken } = await authService.login(credentials);
            setUser(userData);
            setToken(authToken);
            localStorage.setItem('authToken', authToken);
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (userData) => {
        setIsLoading(true);
        setError(null);
        try {
            // Supprimer l'affectation non utilisée
            await authService.register(userData);
            // Connecter automatiquement après l'inscription
            await login({
                email: userData.email,
                password: userData.password
            });
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isLoading,
            error,
            login,
            register,
            logout,
            loadUserProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};