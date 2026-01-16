import React, { useState, useEffect, useRef } from 'react';

const AdminDashboard = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: '', description: '', price: '' });
  const [newServiceImage, setNewServiceImage] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchServices = async () => {
      const mockServices = [
        { 
          id: 1, 
          name: 'Plumbing Service 💧', 
          description: 'Fixing leaks, installing fixtures, and drain cleaning.', 
          price: '$150/hour', 
          image: '/images/plumbing.webp'
        },
        { 
          id: 2, 
          name: 'General Repairing 🔨', 
          description: 'Home repairs, electrical fixes, and handyman tasks.', 
          price: '$80/visit', 
          image: '/images/electrical.jpg'
        }
      ];
      setServices(mockServices);
    };
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewServiceImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newService.name || !newService.description || !newService.price) {
      alert('Please fill all fields');
      return;
    }

    const imageURL = newServiceImage
      ? URL.createObjectURL(newServiceImage)
      : 'https://via.placeholder.com/150/808080/FFFFFF?text=No+Image';

    const addedService = {
      ...newService,
      id: services.length + 1 + Math.random(),
      image: imageURL
    };

    setServices([...services, addedService]);
    setNewService({ name: '', description: '', price: '' });
    setNewServiceImage(null);
    alert(`Service "${addedService.name}" added successfully!`);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <h1>Admin Dashboard - Manage Services 🛠️</h1>
      <hr style={{ margin: '20px 0', borderTop: '1px solid #ccc' }} />

      <div style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
        <h2>➕ Add New Service</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>

          <label style={{ marginBottom: '15px' }}>
            Service Name:
            <input type="text" name="name" value={newService.name} onChange={handleInputChange} required
              placeholder="e.g., Electrical Wiring" style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
          </label>

          <label style={{ marginBottom: '15px' }}>
            Description:
            <textarea name="description" value={newService.description} onChange={handleInputChange} required
              placeholder="Describe the service" style={{ width: '100%', padding: '10px', marginTop: '5px', height: '80px' }} />
          </label>

          <label style={{ marginBottom: '15px' }}>
            Price:
            <input type="text" name="price" value={newService.price} onChange={handleInputChange} required
              placeholder="e.g., $100" style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
          </label>

          <label style={{ marginBottom: '20px', padding: '10px', border: '1px dashed #007bff', borderRadius: '4px', cursor: 'pointer' }}>
            {newServiceImage ? `File Selected: ${newServiceImage.name}` : 'Click to select Service Image'}
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} />
            <button type="button" onClick={() => fileInputRef.current.click()} style={{ marginLeft: '10px', padding: '8px 12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
              {newServiceImage ? 'Change Image' : 'Add Image'}
            </button>
          </label>

          <button type="submit" style={{ padding: '12px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Submit Service
          </button>
        </form>
      </div>

      <hr style={{ margin: '20px 0', borderTop: '1px solid #ccc' }} />

      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
        <h2>📝 Existing Services ({services.length})</h2>

        {services.length === 0 ? (
          <p>No services available.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {services.map((service) => (
              <li key={service.id} style={{ display: 'flex', alignItems: 'center', padding: '15px', borderRadius: '6px', backgroundColor: '#f9f9f9', marginBottom: '10px' }}>
                <img src={service.image} alt={service.name} style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '15px' }} />
                <div>
                  <h3 style={{ margin: 0 }}>{service.name}</h3>
                  <p style={{ margin: '5px 0' }}>{service.description}</p>
                  <strong style={{ color: '#28a745' }}>Price: {service.price}</strong>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
};

export default AdminDashboard;