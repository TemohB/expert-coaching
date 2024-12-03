import React, { useState, useCallback } from 'react';
import PageTransition from '../components/PageTransition';
import CoachFilter from '../components/CoachFilter';
import CoachCard from '../components/CoachCard';

const Coaches = () => {
    // Définissez les coaches avant de les utiliser
    const coaches = [
        {
            id: 1,
            name: "Sarah Martin",
            specialty: "Développement Personnel",
            image: "/images/coach1.jpg",
            sessionPrice: 80,
            isAvailable: true
        },
        {
            id: 2,
            name: "Marc Durant",
            specialty: "Coach Relationnel",
            image: "/images/coach2.jpg",
            sessionPrice: 100,
            isAvailable: false
        },
        {
            id: 3,
            name: "Emma Dubois",
            specialty: "Développement de Carrière",
            image: "/images/coach3.jpg",
            sessionPrice: 90,
            isAvailable: true
        }
    ];

    // Utilisez useState pour gérer les coachs filtrés
    const [filteredCoaches, setFilteredCoaches] = useState(coaches);

    // Utilisez useCallback pour stabiliser la fonction de filtrage
    const handleFilteredCoaches = useCallback((filteredList) => {
        setFilteredCoaches(filteredList);
    }, []);

    return (
        <PageTransition>
            <div className="coaches-page">
                <div className="coaches-header">
                    <h1>Nos Coachs Experts</h1>
                    <p>Trouvez le coach qui vous correspond</p>
                </div>
                
                <CoachFilter 
                    coaches={coaches} 
                    onFilteredCoaches={handleFilteredCoaches} 
                />
                
                <div className="coaches-grid">
                    {filteredCoaches.map(coach => (
                        <CoachCard 
                            key={coach.id} 
                            coach={coach} 
                        />
                    ))}
                </div>
            </div>
        </PageTransition>
    );
};

export default Coaches;