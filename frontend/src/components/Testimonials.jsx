import React from 'react';

const Testimonials = ({ testimonials }) => {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-title">
          <h2>What Our Customers Say</h2>
          <p>Real reviews from real customers</p>
        </div>
        <div className="testimonials-grid" id="testimonialsGrid">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-rating">
                {'★'.repeat(testimonial.rating)}
              </div>
              <p className="testimonial-text">"{testimonial.quote}"</p>
              <div className="testimonial-author">
                <img src={testimonial.image} alt={testimonial.alt} className="testimonial-avatar" />
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>Verified Customer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
