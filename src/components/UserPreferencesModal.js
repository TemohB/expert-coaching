import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUserPreferences } from '../context/UserPreferencesContext';
import '../styles/UserPreferencesModal.css';

const UserPreferencesModal = ({ isOpen, onClose }) => {
    const { preferences, updatePreferences, resetPreferences } = useUserPreferences();
    const [localPreferences, setLocalPreferences] = useState(preferences);

    const handleSave = () => {
        updatePreferences(localPreferences);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <motion.div 
            className="preferences-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="preferences-modal-content">
                <h2>Mes Préférences</h2>

                {/* Langue */}
                <div className="preference-section">
                    <h3>Langue</h3>
                    <select 
                        value={localPreferences.language}
                        onChange={(e) => setLocalPreferences(prev => ({
                            ...prev,
                            language: e.target.value
                        }))}
                    >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                    </select>
                </div>

                {/* Style de coaching */}
                <div className="preference-section">
                    <h3>Style de Coaching</h3>
                    {['Analytique', 'Motivationnel', 'Empathique'].map(style => (
                        <label key={style}>
                            <input 
                                type="checkbox" 
                                checked={localPreferences.coachingStyle.includes(style)}
                                onChange={() => {
                                    const currentStyles = localPreferences.coachingStyle;
                                    setLocalPreferences(prev => ({
                                        ...prev,
                                        coachingStyle: currentStyles.includes(style)
                                            ? currentStyles.filter(s => s !== style)
                                            : [...currentStyles, style]
                                    }));
                                }}
                            />
                            {style}
                        </label>
                    ))}
                </div>

                {/* Prix maximum de session */}
                <div className="preference-section">
                    <h3>Prix maximum de session</h3>
                    <input 
                        type="range"
                        min="0"
                        max="300"
                        value={localPreferences.maxSessionPrice}
                        onChange={(e) => setLocalPreferences(prev => ({
                            ...prev,
                            maxSessionPrice: Number(e.target.value)
                        }))}
                    />
                    <span>{localPreferences.maxSessionPrice}€</span>
                </div>

                {/* Paramètres d'accessibilité */}
                <div className="preference-section">
                    <h3>Accessibilité</h3>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={localPreferences.accessibilitySettings.highContrast}
                            onChange={() => setLocalPreferences(prev => ({
                                ...prev,
                                accessibilitySettings: {
                                    ...prev.accessibilitySettings,
                                    highContrast: !prev.accessibilitySettings.highContrast
                                }
                            }))}
                        />
                        Mode Haute Contraste
                    </label>
                    <select 
                        value={localPreferences.accessibilitySettings.fontSize}
                        onChange={(e) => setLocalPreferences(prev => ({
                            ...prev,
                            accessibilitySettings: {
                                ...prev.accessibilitySettings,
                                fontSize: e.target.value
                            }
                        }))}
                    >
                        <option value="small">Petit</option>
                        <option value="medium">Moyen</option>
                        <option value="large">Grand</option>
                    </select>
                </div>

                <div className="preferences-actions">
                    <button onClick={handleSave} className="btn btn-primary">
                        Enregistrer
                    </button>
                    <button onClick={resetPreferences} className="btn btn-secondary">
                        Réinitialiser
                    </button>
                    <button onClick={onClose} className="btn btn-outline">
                        Annuler
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default UserPreferencesModal;