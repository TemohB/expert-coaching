import { useState, useEffect } from 'react';

export const useDarkMode = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'light'
    );

    useEffect(() => {
        const className = 'dark-mode';
        const bodyClass = window.document.body.classList;

        theme === 'dark' 
            ? bodyClass.add(className) 
            : bodyClass.remove(className);

        localStorage.setItem('theme', theme);
    }, [theme]);

    return [theme, setTheme];
};