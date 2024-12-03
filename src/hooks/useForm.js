import { useState, useCallback } from 'react';

// Règles de validation comme fonctions autonomes
export const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Email invalide';
};

export const validatePassword = (value) => {
    if (value.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères';
    if (!/[A-Z]/.test(value)) return 'Doit contenir au moins une majuscule';
    if (!/[0-9]/.test(value)) return 'Doit contenir au moins un chiffre';
    return null;
};

export const validateName = (value) => {
    return value.trim().length >= 2 ? null : 'Nom invalide';
};

export const validateRequired = (value) => {
    return value.trim() !== '' ? null : 'Ce champ est requis';
};

export const useForm = (initialState, validations = {}) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: value
        }));

        // Validation en temps réel
        if (validations[name]) {
            const errorMessage = validations[name](value);
            setErrors(prev => ({
                ...prev,
                [name]: errorMessage
            }));
        }
    };

    const handleSubmit = useCallback((callback) => async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validation de tous les champs
        const newErrors = {};
        Object.keys(validations).forEach(key => {
            const errorMessage = validations[key](values[key]);
            if (errorMessage) {
                newErrors[key] = errorMessage;
            }
        });

        setErrors(newErrors);

        // Soumettre si pas d'erreurs
        if (Object.keys(newErrors).length === 0) {
            try {
                await callback(values);
            } catch (error) {
                console.error('Submission error:', error);
                // Gérer les erreurs de soumission si nécessaire
                setErrors(prevErrors => ({
                    ...prevErrors,
                    submit: error.message || 'Une erreur est survenue'
                }));
            }
        }

        setIsSubmitting(false);
    }, [validations, values]);

    // Méthode pour réinitialiser le formulaire
    const resetForm = useCallback(() => {
        setValues(initialState);
        setErrors({});
        setIsSubmitting(false);
    }, [initialState]);

    return {
        handleChange,
        handleSubmit,
        resetForm,
        values,
        errors,
        isSubmitting
    };
};