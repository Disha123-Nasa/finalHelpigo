import React from 'react';
import PropTypes from 'prop-types';

const Features = ({ features }) => {
    // Check if features is an array
    if (!Array.isArray(features) || features.length === 0) {
        return <p>No features available.</p>;
    }

    return (
        <section className="features" id="about">
            <div className="container">
                <div className="section-title">
                    <h2>Why Choose Helpigo?</h2>
                    <p>We're committed to providing you with the best service experience</p>
                </div>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div className="feature-item" key={index}>
                            <div className="feature-icon">
                                {feature.icon} {/* ✅ Render React Icon directly */}
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ✅ Fix PropTypes: icon is a React element, not a string
Features.propTypes = {
    features: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.element.isRequired, // <-- CHANGED
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Features;
