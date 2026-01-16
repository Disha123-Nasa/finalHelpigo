import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Helpigo</h3>
                        <p>Your trusted partner for all home service needs. Professional, reliable, and affordable.</p>
                    </div>
                    <div className="footer-section">
                        <h3>Services</h3>
                        <ul>
                            <li><a href="#">Cleaning Services</a></li>
                            <li><a href="#">Home Repairs</a></li>
                            <li><a href="#">Installation</a></li>
                            <li><a href="#">Maintenance</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Support</h3>
                        <ul>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Contact</h3>
                        <ul>
                            <li><i className="fas fa-phone"></i> (555) 123-4567</li>
                            <li><i className="fas fa-envelope"></i> hello@helpigo.com</li>
                            <li><i className="fas fa-map-marker-alt"></i> 123 Service St, City, State</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2024 Helpigo. All rights reserved.</p>
                    <div className="social-links">
                        <a href="#"><i className="fab fa-facebook"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-linkedin"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
