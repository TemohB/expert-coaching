import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const InteractiveCard = ({ 
    children, 
    className = '', 
    hoverScale = 1.05,
    hoverRotate = 2
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    return (
        <motion.div 
            ref={ref}
            className={`interactive-card ${className}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
                opacity: inView ? 1 : 0, 
                y: inView ? 0 : 50 
            }}
            whileHover={{ 
                scale: hoverScale,
                rotate: hoverRotate,
                transition: { duration: 0.2 }
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {React.Children.map(children, child => 
                React.cloneElement(child, { isHovered })
            )}
        </motion.div>
    );
};

export default InteractiveCard;