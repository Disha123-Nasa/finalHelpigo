import React, { useState } from 'react';
import './AddToCart.css';

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 99.99,
      image: 'https://placehold.co/600x400/EEE/31343C?text=Headphones',
      quantity: 1
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 199.99,
      image: 'https://placehold.co/600x400/EEE/31343C?text=Smart+Watch',
      quantity: 1
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity), 
    0
  );

  return (
    <div className="add-to-cart-container">
      <h1>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <img 
            src="https://placehold.co/600x400/EEE/31343C?text=Empty+Cart" 
            alt="Illustration of empty shopping cart with a sad face" 
          />
          <p>Your cart is empty</p>
          <button className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="price">${item.price.toFixed(2)}</p>
                  <div className="quantity-control">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="summary-card">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
              <button className="continue-shopping-btn">
                Continue Shopping
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddToCart;
