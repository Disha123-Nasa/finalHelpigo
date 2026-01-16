import React from 'react';

const TrustIndicators = ({ indicators }) => {
    return (
        <section className="trust-indicators">
            <div className="container">
                <div className="trust-grid">
                    {indicators.map((indicator, index) => (
                        <div className="trust-item" key={index}>
                            <h3>{indicator.value}</h3>
                            <p>{indicator.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustIndicators;
