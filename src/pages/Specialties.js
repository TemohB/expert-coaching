import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import InteractiveCard from '../components/InteractiveCard';
import '../styles/Specialties.css';

const SpecialtyCard = ({ specialty, isHovered }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="specialty-card-content">
            <div className="specialty-icon">{specialty.icon}</div>
            <h3>{specialty.title}</h3>
            <p>{specialty.description}</p>
            
            {isHovered && (
                <motion.div 
                    className="specialty-details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                >
                    <button 
                        onClick={() => setExpanded(!expanded)}
                        className="expand-btn"
                    >
                        {expanded ? 'Réduire' : 'En savoir plus'}
                    </button>
                    
                    {expanded && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <ul>
                                {specialty.detailedDescription.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

const Specialties = () => {
    const specialties = [
        {
            id: 1,
            title: "Développement Personnel",
            icon: "💪",
            description: "Développez votre potentiel",
            detailedDescription: [
                "Identification des objectifs personnels",
                "Stratégies de motivation",
                "Gestion du stress et de l'anxiété"
            ]
        },
        // Autres spécialités...
    ];

    return (
        <PageTransition>
            <div className="specialties-page">
                <div className="specialties-grid">
                    {specialties.map(specialty => (
                        <InteractiveCard key={specialty.id}>
                            <SpecialtyCard specialty={specialty} />
                        </InteractiveCard>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
};

export default Specialties;