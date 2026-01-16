import React from 'react';
import Contact from '../view/Contact';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";


const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
    return (
        <nav className="navbar" id="navbar">
            <div className="navbar-container">
                <a href="#" className="navbar-brand">
                    <i className="fas fa-tools"></i>
                    Helpigo
                </a>
                <ul className="navbar-nav">
                    <li><ScrollLink to="home" smooth={true}>Home</ScrollLink></li>
                    <li><ScrollLink to="services" smooth={true}>Services</ScrollLink></li>
                    <li><ScrollLink to="how-it-works" smooth={true}>How it Works</ScrollLink></li>
                    <li><ScrollLink to="about" smooth={true}>About</ScrollLink></li>
                    <li><RouterLink to="/contact">Contact</RouterLink></li>
                </ul>

                <div className="navbar-buttons">
                    <button onClick={() => navigate("/login")} className="btn btn-outline">Log In</button>
                    <button onClick={() => navigate("/signup")} className="btn btn-outline">Sign Up</button>
                    <button onClick={() => navigate("/signup")} className="btn btn-outline"><FaShoppingCart /></button>
                    <button onClick={handleLogout} className="btn btn-outline">Logout</button>

                </div>
                <button className="mobile-menu-btn" id="mobileMenuBtn">
                    <i className="fas fa-bars"></i>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
