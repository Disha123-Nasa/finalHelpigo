import React, { useState } from 'react';
import './payment.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Payment = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    amount: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: '',
    paymentMethod: 'online'
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.paymentMethod === 'online') {
      if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }

      if (!formData.cardHolder.trim()) {
        newErrors.cardHolder = 'Card holder name is required';
      }

      if (!formData.expiryDate.trim() || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Please enter expiry date in MM/YY format';
      } else {
        const [month, year] = formData.expiryDate.split('/').map(num => parseInt(num));
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
        
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
          newErrors.expiryDate = 'Card has expired';
        }
      }

      if (!formData.cvv.trim() || formData.cvv.length !== 3) {
        newErrors.cvv = 'CVV must be 3 digits';
      }
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!formData.billingAddress.trim()) {
      newErrors.billingAddress = 'Billing address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setResponseMessage('');

    const paymentData = {
      userId: '507f1f77bcf86cd799439011', // Replace with actual user ID
      orderId: '507f1f77bcf86cd799439012', // Replace with actual order ID
      paymentMethod: formData.paymentMethod === 'cash' ? 'offline' : 'online',
      amount: Number(formData.amount),
      billingAddress: {
        address: formData.billingAddress.trim(),
        city: formData.city.trim(),
        zipCode: formData.zipCode.trim(),
        country: formData.country.trim()
      }
    };

    if (formData.paymentMethod === 'online') {
      paymentData.cardDetails = {
        cardNumber: formData.cardNumber.replace(/\s/g, ''),
        cardHolder: formData.cardHolder.trim(),
        expiryDate: formData.expiryDate.trim(),
        cvv: formData.cvv.trim()
      };
    }

    try {
      const apiUrl = 'http://localhost:5000';
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('Please log in to make a payment');
      }

      const response = await fetch(`${apiUrl}/api/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
      });

      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        const errorMessage = result?.message || result?.error || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      setResponseMessage(result.message || 'Payment processed successfully!');

      // Reset form on success
      setFormData({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
        amount: '',
        billingAddress: '',
        city: '',
        zipCode: '',
        country: '',
        paymentMethod: 'online'
      });

      // Redirect to the confirmation page after a short delay
      setTimeout(() => {
        navigate('/end'); // Redirect to the confirmation page
      }, 2000);

    } catch (error) {
      console.error('Payment error:', error);
      setResponseMessage(`Error: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, '');
    return v.length >= 2 ? v.substring(0, 2) + '/' + v.substring(2, 4) : v;
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setFormData(prev => ({
      ...prev,
      cardNumber: formattedValue
    }));
    
    if (errors.cardNumber) {
      setErrors(prev => ({
        ...prev,
        cardNumber: ''
      }));
    }
  };

  const handleExpiryDateChange = (e) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setFormData(prev => ({
      ...prev,
      expiryDate: formattedValue
    }));
    
    if (errors.expiryDate) {
      setErrors(prev => ({
        ...prev,
        expiryDate: ''
      }));
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setFormData(prev => ({
      ...prev,
      cvv: value
    }));
    
    if (errors.cvv) {
      setErrors(prev => ({
        ...prev,
        cvv: ''
      }));
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="payment-header">
          <h2>Secure Payment</h2>
          <p>Complete your transaction securely</p>
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-section">
            <h3>Payment Method</h3>
            <div className="form-group">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={formData.paymentMethod === 'online'}
                  onChange={handleInputChange}
                />
                Online Payment
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === 'cash'}
                  onChange={handleInputChange}
                />
                Cash on Delivery
              </label>
            </div>
          </div>

          <div className="form-section">
            <h3>Order Details</h3>
            <div className="form-group">
              <label htmlFor="amount">Amount ($)</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="100.00"
                step="0.01"
                min="0"
                className={errors.amount ? 'error' : ''}
              />
              {errors.amount && <span className="error-text">{errors.amount}</span>}
            </div>
          </div>

          {formData.paymentMethod === 'online' && (
            <div className="form-section">
              <h3>Payment Information</h3>
              
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className={errors.cardNumber ? 'error' : ''}
                />
                {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="cardHolder">Card Holder</label>
                <input
                  type="text"
                  id="cardHolder"
                  name="cardHolder"
                  value={formData.cardHolder}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={errors.cardHolder ? 'error' : ''}
                />
                {errors.cardHolder && <span className="error-text">{errors.cardHolder}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleExpiryDateChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    className={errors.expiryDate ? 'error' : ''}
                  />
                  {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleCvvChange}
                    placeholder="123"
                    maxLength="4"
                    className={errors.cvv ? 'error' : ''}
                  />
                  {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                </div>
              </div>
            </div>
          )}

          <div className="form-section">
            <h3>Billing Address</h3>
            
            <div className="form-group">
              <label htmlFor="billingAddress">Address</label>
              <input
                type="text"
                id="billingAddress"
                name="billingAddress"
                value={formData.billingAddress}
                onChange={handleInputChange}
                placeholder="123 Main St"
                className={errors.billingAddress ? 'error' : ''}
              />
              {errors.billingAddress && <span className="error-text">{errors.billingAddress}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="New York"
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="10001"
                  className={errors.zipCode ? 'error' : ''}
                />
                {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="United States"
                className={errors.country ? 'error' : ''}
              />
              {errors.country && <span className="error-text">{errors.country}</span>}
            </div>
          </div>

          <button 
            type="submit" 
            className={`submit-btn ${isProcessing ? 'processing' : ''}`}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="spinner"></div>
                Processing...
              </>
            ) : (
              formData.paymentMethod === 'cash' ? 'Place Order' : 'Pay Now'
            )}
          </button>
        </form>

        {responseMessage && (
          <div className={`response-message ${responseMessage.includes('successfully') ? 'success' : 'error'}`}>
            {responseMessage}
          </div>
        )}

        <div className="security-notice">
          <div className="security-icon">🔒</div>
          <p>Your payment information is encrypted and secure</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
