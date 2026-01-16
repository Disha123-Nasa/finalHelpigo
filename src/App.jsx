import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustIndicators from './components/TrustIndicators';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Cta from './components/Cta';
import Footer from './components/Footer';
import ServiceCard from './view/ServiceCard';
import Contact from "./view/Contact";
import Signup from './view/Signup';
import Login from './view/Login';
import './styles.css';
import Booking from './view/Booking';
import NewService from './view/NewService';

// Icons
import { FaSearch, FaHandshake, FaAddressBook, FaClock, FaDollarSign, FaThumbsUp } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import AddToCart from './view/AddToCart';
import Dashboard from './view/Dashboard';
import Payment from './view/Payment';
import End from './view/End';

const App = () => {

    const [activeCategory, setActiveCategory] = useState('all');
    const [bookedServices, setBookedServices] = useState([]);
    const trustIndicators = [
        { value: '5000+', label: 'Happy Customers' },
        { value: '500+', label: 'Trusted Pros' },
        { value: '50+', label: 'Services' },
        { value: '24/7', label: 'Support' }
    ];

    const services = [
        {
            id: 1,
            name: 'Maid Service',
            category: 'cleaning',
            price: '$50-$200',
            image: 'images/maid.jpg',
            alt: 'Professional maid cleaning a modern living room with eco-friendly products',
            description: 'Professional cleaning for your home',
            popular: true
        },
        {
            id: 2,
            name: 'Plumbing',
            category: 'repairs',
            price: '$80-$300',
            image: 'images/plumbing.webp',
            alt: 'Professional plumber fixing a kitchen sink with modern tools',
            description: 'Fix leaks, install fixtures, and more'
        },
        {
            id: 3,
            name: 'Electrical',
            category: 'repairs',
            price: '$70-$250',
            image: 'images/electrical.jpg',
            alt: 'Certified electrician installing new wiring in a modern home',
            description: 'Safe and reliable electrical services'
        },
        {
            id: 4,
            name: 'Carpentry',
            category: 'repairs',
            price: '$65-$200',
            image: 'images/carpenter.jpeg',
            alt: 'Skilled carpenter crafting custom wooden furniture in a workshop',
            description: 'Custom woodwork and repairs'
        },
        {
            id: 5,
            name: 'HVAC',
            category: 'repairs',
            price: '$90-$350',
            image: 'images/ac.avif',
            alt: 'HVAC technician servicing an air conditioning unit on a sunny day',
            description: 'Heating, ventilation, and AC services'
        },
        {
            id: 6,
            name: 'Painting',
            category: 'installation',
            price: '$100-$500',
            image: 'images/painting.jpg',
            alt: 'Professional painters working on interior walls with modern paint equipment',
            description: 'Interior and exterior painting'
        },
        {
            id: 7,
            name: 'Landscaping',
            category: 'maintenance',
            price: '$60-$250',
            image: 'images/garden.webp',
            alt: 'Gardener trimming hedges in a beautifully landscaped backyard',
            description: 'Lawn care and garden maintenance'
        },
        {
            id: 8,
            name: 'Handyman',
            category: 'repairs',
            price: '$55-$150/hr',
            image: 'images/carpenter.jpeg',
            alt: 'Versatile handyman assembling furniture in a bright home environment',
            description: 'Versatile repair and installation',
            isNew: true
        }
    ];

    const steps = [
        {
            icon: <FaSearch />,
            title: 'Find Your Service',
            description: 'Browse our wide range of home services and select what you need'
        },
        {
            icon: <FaAddressBook />,
            title: 'Book & Schedule',
            description: 'Choose your preferred date and time, and book instantly'
        },
        {
            icon: <FaHandshake />,
            title: 'Get It Done',
            description: 'Our verified professionals will complete the job to your satisfaction'
        }
    ];


    const features = [
        {
            icon: <IoShieldCheckmark />,
            title: 'Verified Professionals',
            description: 'All our service providers are background checked and verified'
        },
        {
            icon: <FaClock />,
            title: 'Same Day Service',
            description: 'Get help when you need it with our same-day service options'
        },
        {
            icon: <FaDollarSign />,
            title: 'Transparent Pricing',
            description: 'No hidden fees. You know exactly what you\'ll pay upfront'
        },
        {
            icon: <FaThumbsUp />,
            title: 'Satisfaction Guaranteed',
            description: 'We guarantee your satisfaction or we\'ll make it right'
        }
    ];

    const testimonials = [
        {
            name: 'Sarah Johnson',
            rating: 5,
            quote: 'Amazing service! The cleaner was professional and thorough. My house has never looked better.',
            image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1f73f4d3-54c1-4ca0-a1cf-0337636bb18a.png',
            alt: 'Professional headshot of Sarah Johnson, a satisfied customer smiling'
        },
        {
            name: 'Mike Chen',
            rating: 5,
            quote: 'Quick response time and excellent plumbing work. Highly recommend Helpigo!',
            image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f3c7e9a5-6d8b-4a2f-9e5c-1c3e5f7a9d2b.png',
            alt: 'Professional headshot of Mike Chen, a satisfied customer with a thumbs up'
        },
        {
            name: 'Emily Davis',
            rating: 5,
            quote: 'The handyman fixed multiple issues in one visit. Great value and professional service.',
            image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fb25d40d-72bf-4149-a949-2294f67c2501.png',
            alt: 'Professional headshot of Emily Davis, a happy customer in her home'
        }
    ];
    const filterServices = (category) => {
        setActiveCategory(category);
    };
    const bookService = (serviceName) => {
        const service = services.find(s => s.name === serviceName);
        if (service) {
            setBookedServices(prev => [...prev, service]);
            alert(`Booked: ${serviceName}`);
        }
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Navbar />
                            <Hero />
                            <TrustIndicators indicators={trustIndicators} />
                            <Services
                                services={services}
                                activeCategory={activeCategory}
                                filterServices={filterServices}
                                bookService={bookService}
                            />
                            <HowItWorks steps={steps} />
                            <Features features={features} />
                            <Testimonials testimonials={testimonials} />
                            <Cta />
                            <Footer />
                        </>
                    }
                />
                <Route path="/servicecard" element={<ServiceCard />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<>
                <Navbar />
                <Login/>
                </>} />
                <Route path="/signup" element={<>
                <Navbar />
                <Signup/>
                </>} />
                 <Route path="/booking" element={<Booking/>} />
                 <Route path="/addtocart" element={<AddToCart/>} />
                 <Route path="/dashboard" element={<Dashboard/>} />
                 <Route path="/dashboard/newservice" element={<NewService/>} />
                <Route path="/payment" element={<Payment/>} />
                <Route path="/end" element={<End/>} />

            </Routes>
        </Router>
    );
};

export default App;
