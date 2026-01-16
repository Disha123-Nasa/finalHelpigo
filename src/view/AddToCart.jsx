import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddToCart.css';
import { useNavigate } from 'react-router-dom';

const AddToCart = () => {
  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const navigate = useNavigate();

  // Fetch cart items from backend on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/cart', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setService(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load service');
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Remove an item from cart
  const removeFromCart = async (itemId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setService(prev => prev.filter(item => item._id !== itemId));
    } catch (err) {
      console.error('Error removing item:', err);
      alert('Failed to remove item from cart. Please try again.');
    }
  };

  // Calculate total price with discount
  const calculateTotal = () => {
    const total = service.reduce((sum, item) => sum + (item.product?.price || 0), 0);
    return (total - discount).toFixed(2);
  };

  // Navigate to payment page
  const handleCheckout = () => {
    navigate('/payment');
  };

  // Apply coupon
  const applyCoupon = () => {
    if (coupon === 'SAVE10') {
      setDiscount(10);
    } else {
      alert('Invalid coupon code');
    }
  };

  // Loading or error states
  if (loading) return <p>Loading service...</p>;
  if (error) return <p>{error}</p>;
  if (service.length === 0) return <p className='empty-cart-message'>No items in the cart</p>;

  return (
    <div className="add-to-cart-container">
      <div className="header">
        <h1>Services Cart</h1>
      </div>

      <div className="content">
        {/* Cart Items */}
        <div className="add-to-cart">
          {service.map((item) => (
            <div className="cart-item" key={item._id}>
              <div className="image-container">
                <img src={item.product?.image || ''} alt={item.product?.title || ''} />
              </div>
              <div className="item-details">
                <h2>{item.product?.title || 'Untitled Service'}</h2>
                <p>{item.product?.description || ''}</p>
               <p>Price: {item.product?.priceRange || `${item.product?.price}`}</p>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {service.map((item) => (
                <tr key={item._id}>
                  <td>{item.product?.title || 'Untitled Service'}</td>
                  <td>{item.product?.price?.toFixed(2) || '0.00'}</td>
                </tr>
              ))}
              <tr>
                <th>Total Amount</th>
                <td>{calculateTotal()}</td>
              </tr>
            </tbody>
          </table>

          {/* Coupon Section */}
          <div className="coupon-section">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              className="coupon-input"
            />
            <button onClick={applyCoupon} className="apply-coupon-button">
              Apply
            </button>
            {discount > 0 && <p className="discount-message">Discount Applied: ${discount}</p>}
          </div>

          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
