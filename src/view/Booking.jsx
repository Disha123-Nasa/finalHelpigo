import React, { useState } from 'react';
import './Booking.css';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const Booking = () => {
    const [formData, setFormData] = useState({
        service: '',
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        notes: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrorMessage('');
    };

    const handleBooking = async () => {
        const selectedDate = new Date(formData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            setErrorMessage('Please select a date in the future');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setErrorMessage('You must be logged in to make a booking.');
                return;
            }

            // Send request correctly
            await axios.post(
                'http://localhost:5000/api/bookings',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Show alert message
            alert('Form submitted successfully! Your appointment has been booked.');

            // Navigate to addtocart page
            navigate('/addtocart');

            // Reset form data
            setFormData({
                service: '',
                name: '',
                email: '',
                phone: '',
                date: '',
                time: '',
                notes: ''
            });

        } catch (error) {
            console.error(error);
            setErrorMessage(
                error.response?.data?.message ||
                'There was an error submitting your booking. Please try again.'
            );
        }
    };

    return (
        <div className="boxes">
            <div className="box">
                <div className="container">
                    <header>
                        <div className="logo">HELPIGO</div>
                        <p>Book your professional services with ease</p>
                    </header>

                    <main>
                        <h1 className="section-title">Schedule Your Appointment</h1>

                        <form id="bookingForm" className="booking-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                                <label htmlFor="service">Service Type</label>
                                <select
                                    id="service"
                                    name="service"
                                    className="form-control"
                                    value={formData.service}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a service</option>
                                    <option value="consultation">Professional Consultation</option>
                                    <option value="repair">Repair Service</option>
                                    <option value="maintenance">Maintenance</option>
                                    <option value="installation">Installation</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    placeholder="Enter your Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    placeholder="Enter your Email"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="form-control"
                                    value={formData.phone}
                                    placeholder="Enter your Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="date">Preferred Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    className="form-control"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="time">Preferred Time</label>
                                <input
                                    type="time"
                                    id="time"
                                    name="time"
                                    className="form-control"
                                    value={formData.time}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="notes">Additional Notes</label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    className="form-control"
                                    rows="4"
                                    value={formData.notes}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            {errorMessage && <div className="error-message">{errorMessage}</div>}

                            <button type="button" onClick={handleBooking} className="btn btn-block">Book Appointment</button>
                        </form>
                    </main>

                    <footer>
                        <p>&copy; 2023 Helpigo. All rights reserved.</p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Booking;
