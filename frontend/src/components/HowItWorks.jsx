import React from 'react';
import PropTypes from 'prop-types';

const HowItWorks = ({ steps }) => {
    console.log("Steps received in HowItWorks:", steps);

    if (!Array.isArray(steps) || steps.length === 0) {
        return <p>No steps available.</p>;
    }

    return (
        <section className="how-it-works" id="how-it-works">
            <div className="container">
                <div className="section-title">
                    <h2>How It Works</h2>
                    <p>Getting help has never been easier. Follow these simple steps</p>
                </div>
                <div className="steps-grid">
                    {steps.map((step, index) => (
                        <div className="step-item" key={index}>
                            <div className="step-icon">
                                {step.icon} {/* ✅ Render React Icon directly */}
                            </div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// ✅ Fix PropTypes: icon should be a React element, not string
HowItWorks.propTypes = {
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.element.isRequired, // <-- CHANGED
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default HowItWorks;
