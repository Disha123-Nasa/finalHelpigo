import React, { useEffect, useState } from 'react';
import './ServiceCard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart } from "react-icons/fa";

const ServiceCard = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); 
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setServices(res.data);
        setFilteredServices(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchTerm(input);
    const filtered = services.filter(service =>
      service.title.toLowerCase().includes(input) ||
      service.description.toLowerCase().includes(input)
    );
    setFilteredServices(filtered);
  };

  const handleBookService = async (id) => {
    if (!isLoggedIn) {
      openModal(); // Show login modal if not logged in
      return;
    }
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:5000/api/cart/add',
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert('Service has been added to your cart!'); // Alert message
      navigate('/booking'); // Navigate to the booking page
    } catch (error) {
      console.error('Error adding service to cart:', error);
      alert('Failed to add service to cart. Please try again.'); // Error alert
    }
  };

  const openModal = () => {
    document.getElementById('login-modal').style.display = 'flex';
  };

  const closeModal = () => {
    document.getElementById('login-modal').style.display = 'none';
  };

  const performLogin = () => {
    alert('Login performed'); // Replace with your login logic
    setIsLoggedIn(true); // Update login state
    closeModal();
  };

  return (
    <div>
      {/* Navigation Bar */}
      <div className="navbar1">
        <h1>Helpigo</h1>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for services..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="search-button" onClick={handleSearch}>Search</button>
          <button onClick={() => navigate("/addtocart")} className="btn btn-outline"><FaShoppingCart /></button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button className="filter-button" onClick={() => setFilteredServices(services)}>All Services</button>
        <button className="filter-button" onClick={() => setFilteredServices(services.filter(s => s.category === 'cleaning'))}>Cleaning</button>
        <button className="filter-button" onClick={() => setFilteredServices(services.filter(s => s.category === 'repairs'))}>Repairs</button>
        <button className="filter-button" onClick={() => setFilteredServices(services.filter(s => s.category === 'installation'))}>Installation</button>
        <button className="filter-button" onClick={() => setFilteredServices(services.filter(s => s.category === 'maintenance'))}>Maintenance</button>
      </div>

      {/* Cards Grid */}
      <div className="service-cards grid-cols-4 gap-6 p-6">
        {filteredServices.map(service => (
          <div className="card service-card" key={service._id}>
            <img src={service.image} alt={service.title} />
            <div className="card-content">
              <h3 className="card-title">{service.title}</h3>
              <p className="card-description">{service.description}</p>
              <p className="card-price">{service.price}</p>
              <button className="book-button" onClick={() => handleBookService(service._id)}>Book Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* Login Modal */}
      <div id="login-modal" className="modal">
        <div className="modal-content">
          <span className="close-modal" onClick={closeModal}>&times;</span>
          <h2>Login Required</h2>
          <p>Please login to book this service.</p>
          <button className="login-button" onClick={performLogin}>Login Now</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
