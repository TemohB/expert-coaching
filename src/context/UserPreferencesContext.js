import React, { createContext, useState, useEffect, useContext } from 'react';

// Interface des préférences utilisateur
const defaultPreferences = {
    language: 'fr',
    coachingStyle: [],
    availabilityPreference: null,
    maxSessionPrice: 200,
    notificationPreferences: {
        email: true,
        sms: false,
        push: true
    },
    accessibilitySettings: {
        highContrast: false,
        fontSize: 'medium'
    }
};

export const UserPreferencesContext = createContext({
    preferences: defaultPreferences,
    updatePreferences: () => {},
    resetPreferences: () => {}
});

export const UserPreferencesProvider = ({ children }) => {
    const [preferences, setPreferences] = useState(() => {
        // Récupérer les préférences du localStorage ou utiliser les valeurs par défaut
        const savedPreferences = localStorage.getItem('userPreferences');
        return savedPreferences 
            ? JSON.parse(savedPreferences) 
            : defaultPreferences;
    });

    // Mettre à jour le localStorage quand les préférences changent
    useEffect(() => {
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
    }, [preferences]);

    // Fonction pour mettre à jour les préférences
    const updatePreferences = (newPreferences) => {
        setPreferences(prev => ({
            ...prev,
            ...newPreferences
        }));
    };

    // Fonction pour réinitialiser les préférences
    const resetPreferences = () => {
        setPreferences(defaultPreferences);
        localStorage.removeItem('userPreferences');
    };

    return (
        <UserPreferencesContext.Provider 
            value={{ 
                preferences, 
                updatePreferences, 
                resetPreferences 
            }}
        >
            {children}
        </UserPreferencesContext.Provider>
    );
};

// Hook personnalisé pour utiliser les préférences utilisateur
export const useUserPreferences = () => {
    const context = useContext(UserPreferencesContext);
    if (!context) {
        throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
    }
    return context;
};