import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, roles = [] }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    // Gérer l'état de chargement
    if (isLoading) {
        return (
            <div className="loading-overlay">
                <div className="spinner"></div>
            </div>
        );
    }

    // Vérifier si l'utilisateur est connecté
    if (!user) {
        // Rediriger vers la page de connexion avec l'intention de revenir à la page précédente
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Vérifier les rôles si spécifiés
    if (roles.length > 0 && !roles.includes(user.role)) {
        // Rediriger vers une page d'erreur ou de non-autorisation
        return <Navigate to="/unauthorized" replace />;
    }

    // Rendre les enfants si toutes les vérifications passent
    return children;
};

export default ProtectedRoute;