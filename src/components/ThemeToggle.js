import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import '../styles/ThemeToggle.css';

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <motion.button 
            className="theme-toggle"
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
        >
            {isDarkMode ? '☀️' : '🌙'}
        </motion.button>
    );
};

export default ThemeToggle;