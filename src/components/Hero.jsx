import React from 'react';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Your Trusted Home Service Partner</h1>
            <p>Connect with verified, professional service providers for all your home needs.</p>
            <div className="hero-buttons">
              <a href="#services" className="btn btn-white">Book a Service</a>
              <a href="#how-it-works" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>How it Works</a>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="images/main.jpg" 
              alt="Happy homeowner shaking hands with a professional service provider" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
