import React from 'react'; // Utilisé implicitement par JSX
import { motion } from 'framer-motion';
import '../styles/CoachFilter.css';

const CoachFilter = ({ coaches, onFilteredCoaches }) => {
    const [selectedSpecialties, setSelectedSpecialties] = React.useState([]);
    const [priceRange, setPriceRange] = React.useState([0, 200]);
    const [availabilityFilter, setAvailabilityFilter] = React.useState(false);

    // Extraction des spécialités uniques
    const allSpecialties = [...new Set(coaches.map(coach => coach.specialty))];

    React.useEffect(() => {
        const filteredCoaches = coaches.filter(coach => {
            const specialtyMatch = selectedSpecialties.length === 0 || 
                selectedSpecialties.includes(coach.specialty);
            
            const priceMatch = coach.sessionPrice >= priceRange[0] && 
                coach.sessionPrice <= priceRange[1];
            
            const availabilityMatch = !availabilityFilter || coach.isAvailable;

            return specialtyMatch && priceMatch && availabilityMatch;
        });

        onFilteredCoaches(filteredCoaches);
    }, [
        coaches, 
        selectedSpecialties, 
        priceRange, 
        availabilityFilter, 
        onFilteredCoaches
    ]);

    const toggleSpecialty = (specialty) => {
        setSelectedSpecialties(prev => 
            prev.includes(specialty)
                ? prev.filter(s => s !== specialty)
                : [...prev, specialty]
        );
    };

    return (
        <motion.div 
            className="coach-filter"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="filter-section">
                <h4>Spécialités</h4>
                <div className="specialty-tags">
                    {allSpecialties.map(specialty => (
                        <motion.button
                            key={specialty}
                            className={`specialty-tag ${selectedSpecialties.includes(specialty) ? 'selected' : ''}`}
                            onClick={() => toggleSpecialty(specialty)}
                            whileTap={{ scale: 0.95 }}
                        >
                            {specialty}
                        </motion.button>
                    ))}
                </div>
            </div>

            <div className="filter-section">
                <h4>Prix de la session</h4>
                <div className="price-range">
                    <input 
                        type="range" 
                        min="0" 
                        max="200" 
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    />
                    <span>{priceRange[1]}€ max</span>
                </div>
            </div>

            <div className="filter-section">
                <h4>Disponibilité</h4>
                <motion.label 
                    className="availability-toggle"
                    whileTap={{ scale: 0.95 }}
                >
                    <input 
                        type="checkbox" 
                        checked={availabilityFilter}
                        onChange={() => setAvailabilityFilter(!availabilityFilter)}
                    />
                    Uniquement disponibles
                </motion.label>
            </div>
        </motion.div>
    );
};

export default CoachFilter;