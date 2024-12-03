import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/PageTransition';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <PageTransition>
            <div className="dashboard-page">
                <motion.div 
                    className="dashboard-container"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="dashboard-header">
                        <h1>Tableau de bord</h1>
                        <p>Bienvenue, {user.name}</p>
                    </div>

                    <div className="dashboard-content">
                        {user.role === 'coach' ? (
                            <CoachDashboard />
                        ) : (
                            <ClientDashboard />
                        )}
                    </div>

                    <button 
                        onClick={logout} 
                        className="btn btn-secondary logout-btn"
                    >
                        Déconnexion
                    </button>
                </motion.div>
            </div>
        </PageTransition>
    );
};

const CoachDashboard = () => {
    return (
        <div className="coach-dashboard">
            <h2>Espace Coach</h2>
            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>Clients</h3>
                    <p>0</p>
                </div>
                <div className="stat-card">
                    <h3>Sessions</h3>
                    <p>0</p>
                </div>
            </div>
        </div>
    );
};

const ClientDashboard = () => {
    return (
        <div className="client-dashboard">
            <h2>Espace Client</h2>
            <div className="dashboard-actions">
                <button className="btn btn-primary">Trouver un coach</button>
                <button className="btn btn-secondary">Mes sessions</button>
            </div>
        </div>
    );
};

export default Dashboard;