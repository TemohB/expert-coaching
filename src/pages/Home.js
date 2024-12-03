import React from 'react';
import { Parallax } from 'react-parallax';
import PageTransition from '../components/PageTransition';
import '../styles/Home.css';

const Home = () => {
    return (
        <PageTransition>
            <div className="home-page">
                {/* Parallax Hero Section */}
                <Parallax
                    blur={{ min: -15, max: 15 }}
                    bgImage="/images/hero-background.jpg"
                    bgImageAlt="Coaching Background"
                    strength={-200}
                >
                    <div className="hero-parallax-content">
                        <h1>Transformez Votre Potentiel</h1>
                        <p>Coaching personnalisé pour votre réussite</p>
                        <button className="btn btn-primary">Commencer</button>
                    </div>
                </Parallax>

                {/* Sections avec effets parallax */}
                <section className="features-section">
                    <Parallax 
                        translateX={['0px', '50px']}
                        opacity={[1, 0.3]}
                    >
                        <div className="features-content">
                            <h2>Nos Services</h2>
                            {/* Contenu des services */}
                        </div>
                    </Parallax>
                </section>
            </div>
        </PageTransition>
    );
};

export default Home;