import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Importer les composants de page
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Coaches from '../pages/Coaches';
import Dashboard from '../pages/Dashboard';
import Unauthorized from '../pages/Unauthorized';
import ProtectedRoute from '../components/ProtectedRoute';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/coaches" element={<Coaches />} />
                
                {/* Routes protégées */}
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />
                
                {/* Route pour les coachs uniquement */}
                <Route 
                    path="/coach-management" 
                    element={
                        <ProtectedRoute roles={['coach']}>
                            <CoachManagement />
                        </ProtectedRoute>
                    } 
                />

                {/* Page non autorisé */}
                <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>
        </AnimatePresence>
    );
};

// Composant fictif pour l'exemple
const CoachManagement = () => (
    <div>
        <h1>Gestion des Coachs</h1>
    </div>
);

export default AnimatedRoutes;