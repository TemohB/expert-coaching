import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserPreferencesProvider } from './context/UserPreferencesContext';
import Navbar from './components/Navbar';
import AnimatedRoutes from './components/AnimatedRoutes';
import ThemeToggle from './components/ThemeToggle';

const App = () => {
    return (
        <AuthProvider>
            <UserPreferencesProvider>
                <Router>
                    <div className="app">
                        <Navbar />
                        <AnimatedRoutes />
                        <ThemeToggle />
                    </div>
                </Router>
            </UserPreferencesProvider>
        </AuthProvider>
    );
};

export default App;