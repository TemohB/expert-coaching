import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1 className="hero-title">
                    Plus qu'un coaching,<br />
                    une transformation
                </h1>
                
                <p className="hero-subtitle">
                    Des experts à votre écoute pour vous accompagner vers vos objectifs
                </p>

                <div className="hero-cta">
                    <a href="/commencer" className="btn btn-primary">
                        Commencer maintenant
                    </a>
                </div>

                {/* Section des avantages */}
                <div className="hero-features">
                    <div className="feature">
                        <span className="feature-icon">🎯</span>
                        <span className="feature-text">Coaching personnalisé</span>
                    </div>
                    <div className="feature">
                        <span className="feature-icon">🔒</span>
                        <span className="feature-text">Confidentialité garantie</span>
                    </div>
                    <div className="feature">
                        <span className="feature-icon">⭐</span>
                        <span className="feature-text">Experts certifiés</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;