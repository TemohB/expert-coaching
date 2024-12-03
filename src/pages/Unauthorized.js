import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import '../styles/Unauthorized.css';

const Unauthorized = () => {
    return (
        <PageTransition>
            <div className="unauthorized-page">
                <motion.div 
                    className="unauthorized-container"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1>Accès non autorisé</h1>
                    <p>Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
                    <div className="unauthorized-actions">
                        <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
                        <Link to="/login" className="btn btn-secondary">Se connecter</Link>
                    </div>
                </motion.div>
            </div>
        </PageTransition>
    );
};

export default Unauthorized;