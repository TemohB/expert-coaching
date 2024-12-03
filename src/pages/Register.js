import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    useForm, 
    validateEmail, 
    validatePassword, 
    validateName 
} from '../hooks/useForm';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/PageTransition';
import '../styles/Register.css';

const Register = () => {
    const navigate = useNavigate();
    const { register, error, isLoading } = useAuth();
    const [role, setRole] = useState('client');

    const { 
        handleChange, 
        handleSubmit, 
        values, 
        errors, 
        isSubmitting 
    } = useForm(
        { 
            name: '', 
            email: '', 
            password: '', 
            confirmPassword: '' 
        },
        {
            // Utiliser validateName pour le nom
            name: (value) => {
                // Validation combinée avec un message personnalisé
                const nameError = validateName(value);
                return nameError || (value.split(' ').length > 1 
                    ? null 
                    : 'Veuillez entrer votre nom complet');
            },
            email: validateEmail,
            password: validatePassword,
            confirmPassword: (value) => {
                return value === values.password 
                    ? null 
                    : 'Les mots de passe ne correspondent pas';
            }
        }
    );

    const onSubmit = async () => {
        try {
            await register({
                name: values.name,
                email: values.email,
                password: values.password,
                role: role
            });
            
            // Rediriger vers le tableau de bord après inscription
            navigate('/dashboard');
        } catch (err) {
            console.error('Registration failed', err);
        }
    };

    return (
        <PageTransition>
            <div className="register-page">
                <motion.div 
                    className="register-container"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2>Créer un compte</h2>
                    
                    {error && (
                        <div className="global-error">
                            {error}
                        </div>
                    )}

                    <div className="role-selection">
                        <h3>Je souhaite m'inscrire en tant que</h3>
                        <div className="role-buttons">
                            <motion.button
                                type="button"
                                className={`role-btn ${role === 'client' ? 'active' : ''}`}
                                onClick={() => setRole('client')}
                                whileTap={{ scale: 0.95 }}
                            >
                                Client
                            </motion.button>
                            <motion.button
                                type="button"
                                className={`role-btn ${role === 'coach' ? 'active' : ''}`}
                                onClick={() => setRole('coach')}
                                whileTap={{ scale: 0.95 }}
                            >
                                Coach
                            </motion.button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="name">Nom complet</label>
                            <input 
                                type="text" 
                                id="name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                placeholder="Votre nom et prénom"
                                className={errors.name ? 'error' : ''}
                            />
                            {errors.name && (
                                <motion.p 
                                    className="error-message"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {errors.name}
                                </motion.p>
                            )}
                        </div>

                        {/* Reste du formulaire identique */}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                placeholder="Votre email"
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && (
                                <motion.p 
                                    className="error-message"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {errors.email}
                                </motion.p>
                            )}
                        </div>

                        {/* Autres champs similaires */}
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            disabled={isSubmitting || isLoading}
                        >
                            {isSubmitting || isLoading ? 'Inscription...' : "S'inscrire"}
                        </button>
                    </form>

                    <div className="register-footer">
                        <p>
                            Déjà un compte ? 
                            <Link to="/login"> Connectez-vous</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </PageTransition>
    );
};

export default Register;