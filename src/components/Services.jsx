import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

const Services = ({ services, activeCategory, filterServices }) => {
  const navigate = useNavigate(); // Use the useNavigate hook
  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  const bookService = (serviceName) => {
    const token = localStorage.getItem('token'); // check if user is logged in

    if (token) {
      // User is logged in → go to booking page
      navigate(`/servicecard`);
    } else {
      // User not logged in → go to login page
      navigate('/login');
    }
  };

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>From minor repairs to major renovations, we've got you covered with quality professionals</p>
        </div>
        <div className="category-tabs" id="categoryTabs">
          {['all', 'cleaning', 'repairs', 'installation', 'maintenance'].map(category => (
            <div 
              className={`category-tab ${activeCategory === category ? 'active' : ''}`} 
              key={category} 
              onClick={() => filterServices(category)}
              role="button"
              aria-pressed={activeCategory === category}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && filterServices(category)} // Changed to onKeyDown
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
          ))}
        </div>
        <div className="services-grid" id="servicesGrid">
          {filteredServices.length > 0 ? (
            filteredServices.map(service => (
              <div className="service-card" key={service.id}>
                <img 
                  src={service.image} 
                  alt={service.alt || 'Service image'} 
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/400x300?text=Image+Not+Found';
                  }} 
                />
                <div className="service-content">
                  <div className="service-header">
                    <h3 className="service-title">{service.name}</h3>
                    {service.popular && <span className="service-badge badge-popular">Popular</span>}
                  </div>
                  <p className="service-description">{service.description}</p>
                  <div className="service-footer">
                    <span className="service-price">{service.price}</span>
                    <button className="btn-sm" onClick={() => bookService(service.name)}>Book Now</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No services available in this category.</p>
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link className="btn btn-outline" to="/servicecard">View All Services (10+)</Link>
        </div>
      </div>
    </section>
  );
};

Services.propTypes = {
  services: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    alt: PropTypes.string,
    popular: PropTypes.bool,
  })).isRequired,
  activeCategory: PropTypes.string.isRequired,
  filterServices: PropTypes.func.isRequired,
};

export default Services;
