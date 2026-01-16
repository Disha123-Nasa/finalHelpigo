import React, { useState } from 'react';
import './ServiceCard.css';

const services = [
  {
        title: 'Maid Service',
        description: 'Professional home cleaning',
        price: '$50–$200',
        fullDescription: 'This service includes a thorough cleaning of your home, including dusting, vacuuming, and mopping. Our professional maids are trained to provide top-notch service.',
        image: 'images/maid.jpg',
        category: 'cleaning',
      },
      {
        title: 'Plumbing',
        description: 'Leak repair and installations',
        price: '$80–$300',
        fullDescription: 'Our plumbing service covers everything from fixing leaks to installing new fixtures. We ensure quality work and customer satisfaction.',
        image: 'images/plumbing.webp',
        category: 'repairs',
      },
      {
        title: 'Electrical',
        description: 'Wiring, lighting, and repair',
        price: '$70–$250',
        fullDescription: 'We provide comprehensive electrical services, including wiring, lighting installation, and repairs. Safety is our top priority.',
        image: 'images/electrical.jpg',
        category: 'repairs',
      },
      {
        title: 'Carpentry',
        description: 'Furniture work and repairs',
        price: '$65–$200',
        fullDescription: 'Our carpentry services include custom furniture building, repairs, and installations. We work with various materials to meet your needs.',
        image: 'images/carpenter.jpeg',
        category: 'repairs',
      },
      {
        title: 'Painting',
        description: 'Interior and exterior painting',
        price: '$100–$400',
        fullDescription: 'We offer professional painting services for both interiors and exteriors. Our team ensures a clean and beautiful finish.',
        image: 'images/painting.jpg',
        category: 'maintenance',
      },
      {
        title: 'AC Repair',
        description: 'Cooling system repair',
        price: '$150–$500',
        fullDescription: 'Our AC repair service ensures your cooling system is running efficiently. We diagnose and fix all types of AC issues.',
        image: 'images/ac.avif',
        category: 'repairs',
      },
      {
        title: 'Pest Control',
        description: 'Termite, ant, and rodent control',
        price: '$90–$300',
        fullDescription: 'Our pest control services effectively eliminate pests and prevent future infestations. Safe for your family and pets.',
        image: 'images/pest.jpeg',
        category: 'pest-control',
      },
      {
        title: 'Appliance Repair',
        description: 'Washing machine, fridge, etc.',
        price: '$120–$350',
        fullDescription: 'We repair all major appliances, ensuring they work efficiently. Our technicians are experienced and reliable.',
        image: 'images/repair.avif',
        category: 'appliance-repair',
      },
      {
        title: 'Kitchen Setup',
        description: 'Modular kitchen installations',
        price: '$300–$1000',
        fullDescription: 'We specialize in modular kitchen setups, providing customized solutions to fit your space and style.',
        image: 'images/kitchen.jpg',
        category: 'kitchen-setup',
      },
      {
        title: 'Gardening',
        description: 'Lawn and plant maintenance',
        price: '$80–$250',
        fullDescription: 'Our gardening services include lawn care, planting, and maintenance to keep your garden looking beautiful.',
        image: 'images/garden.webp',
        category: 'gardening',
      },
      {
        title: 'Smart Home Device Installation',
        description: 'IoT and automation setup',
        price: '$80–$300',
        fullDescription: 'Setup smart doorbells, thermostats, voice assistants, and home automation devices.',
        image: 'images/smart.jpeg',
        category: 'installation',
      },
      {
        title: 'Home Theater Installation',
        description: 'Audio-visual setup',
        price: '$200–$1000',
        fullDescription: 'Install speakers, projectors, and surround sound systems for a complete home theater experience.',
        image: 'images/theatre.jpeg',
        category: 'installation',
      },
      {
        title: 'Lighting Fixture Installation',
        description: 'Decor and functional lighting setup',
        price: '$30–$150',
        fullDescription: 'Install chandeliers, LED panels, or decorative lighting with safe wiring and alignment.',
        image: 'images/lighting.jpeg',
        category: 'installation',
      },
      {
        title: 'Washing Machine Installation',
        description: 'Plumbing and electrical setup',
        price: '$50–$100',
        fullDescription: 'Install and connect washing machines with proper plumbing, drainage, and electrical setup.',
        image: 'images/machine.jpeg',
        category: 'installation',
      },
      {
        title: 'Solar Panel Installation',
        description: 'Eco-friendly power setup',
        price: '$500–$3000',
        fullDescription: 'Install solar panels for homes and businesses with complete wiring and inverter setup for sustainable energy.',
        image: 'images/solar.jpeg',
        category: 'installation',
      },
      {
        title: 'Water Purifier Installation',
        description: 'RO and purifier setup',
        price: '$60–$120',
        fullDescription: 'Expert installation of water purifiers including RO, UV, and UF systems for clean and safe drinking water.',
        image: 'images/purifier.jpeg',
        category: 'installation',
      },
      {
        title: 'Home Deep Cleaning',
        description: 'Complete home cleaning service',
        price: '$100–$300',
        fullDescription: 'Thorough cleaning of the entire home including floors, furniture, kitchen, bathrooms, and windows.',
        image: 'images/deep.jpeg',
        category: 'cleaning',
      },
      {
        title: 'Carpet Cleaning',
        description: 'Steam and shampoo cleaning',
        price: '$40–$120',
        fullDescription: 'Professional carpet cleaning using steam or shampoo methods to remove dirt, stains, and allergens.',
        image: 'images/carpet.jpeg',
        category: 'cleaning',
      },
      {
        title: 'Car Cleaning',
        description: 'Exterior and interior detailing',
        price: '$25–$100',
        fullDescription: 'Full interior vacuuming, seat shampoo, dashboard polishing, and exterior washing.',
        image: 'images/car.jpg',
        category: 'cleaning',
      },
      {
        title: 'Office Cleaning',
        description: 'Workplace hygiene service',
        price: '$80–$200',
        fullDescription: 'Regular or deep cleaning of office spaces, desks, meeting rooms, and restrooms.',
        image: 'images/office.jpeg',
        category: 'cleaning',
      },
      {
        title: 'Appliance Maintenance',
        description: 'Home appliance checkup',
        price: '$40–$120',
        fullDescription: 'Preventive maintenance and repairs for refrigerators, washing machines, microwaves, and more.',
        image: 'images/appliances.jpeg',
        category: 'maintenance',
      },
      {
        title: 'Floor Maintenance',
        description: 'Polishing and repair',
        price: '$80–$220',
        fullDescription: 'Polishing, sealing, and repairing tile, wood, or marble flooring for a fresh look.',
        image: 'images/floor.jpeg',
        category: 'maintenance',
      },
      {
        title: 'Elevator Maintenance',
        description: 'Safety inspection and servicing',
        price: '$200–$800',
        fullDescription: 'Scheduled inspection, lubrication, and safety checks for residential and commercial elevators.',
        image: 'images/elevator.jpeg',
        category: 'maintenance',
      }

];

const ServiceCard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState(services);

  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchTerm(input);
    const filtered = services.filter(service =>
      service.title.toLowerCase().includes(input) || service.description.toLowerCase().includes(input)
    );
    setFilteredServices(filtered);
  };

  const handleBookService = (serviceName) => {
    if (isLoggedIn) {
      alert(`You have selected to book: ${serviceName}`);
      // Redirect to booking page or perform booking logic here
    } else {
      openModal();
    }
  };

  const openModal = () => {
    document.getElementById('login-modal').style.display = 'flex';
  };

  const closeModal = () => {
    document.getElementById('login-modal').style.display = 'none';
  };

  const performLogin = () => {
    setIsLoggedIn(true);
    closeModal();
    alert('You are now logged in!');
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
          <button className="login-button" onClick={openModal}>Login</button>
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
      <div className="service-cards  grid-cols-4 gap-6 p-6">
        {filteredServices.map(service => (
          <div className="card service-card" key={service.title}>
            <img src={service.image} alt={service.title} />
            <div className="card-content">
              <h3 className="card-title">{service.title}</h3>
              <p className="card-description">{service.description}</p>
              <p className="card-price">{service.price}</p>
              <button className="book-button" onClick={() => handleBookService(service.title)}>Book Now</button>
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

