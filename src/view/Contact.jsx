import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const FullScreenContainer = styled.div`
  background-color: #f8f9fa;
  font-family: 'Poppins', sans-serif;
`;

const Navbar = styled.nav`
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const Brand = styled.h1`
  font-size: 1.8rem;
  color: #4F46E5;
  font-weight: 700;
  margin: 0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  a {
    color: #333;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      color: #4F46E5;
    }

    &.active {
      color: #4F46E5;
      font-weight: 600;
    }
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
  padding: 2rem;
`;

const MainContent = styled.main`
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin: 2rem 0 3rem;

  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;

    span {
      color: #4F46E5;
    }
  }

  p {
    font-size: 1.2rem;
    color: #666;
    max-width: 700px;
    margin: 0 auto;
  }
`;

const ContactWrapper = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const ContactForm = styled.div`
  flex: 1;
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 1.5rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
  
  input, textarea {
    width: 100%;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: #4F46E5;
    }
  }
  
  textarea {
    min-height: 150px;
    resize: vertical;
  }

  label {
    position: absolute;
    left: 1rem;
    top: 1rem;
    color: #666;
    transition: all 0.2s;
    pointer-events: none;
    background: white;
    padding: 0 0.5rem;
  }

  input:focus + label,
  input:not(:placeholder-shown) + label,
  textarea:focus + label,
  textarea:not(:placeholder-shown) + label {
    transform: translateY(-1.5rem);
    font-size: 0.8rem;
    color: #4F46E5;
  }
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ContactInfo = styled.div`
  flex: 1;
  min-width: 300px;
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const IconWrapper = styled.div`
  background: #f0f2ff;
  color: #4F46E5;
  padding: 0.8rem;
  border-radius: 12px;
  min-width: 48px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoText = styled.div`
  h3 {
    font-size: 1rem;
    color: #333;
    margin-bottom: 0.3rem;
  }

  p {
    color: #666;
    margin-bottom: 0.3rem;
  }

  small {
    color: #999;
    font-size: 0.8rem;
  }
`;

const SuccessMessage = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f0fff4;
  color: #38a169;
  border-radius: 8px;
  text-align: center;
`;

const Footer = styled.footer`
  background: #f1f1f1;
  padding: 2rem;
  text-align: center;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateField = (name, value) => {
    let error = '';

    if (name === 'name') {
        if (!value.trim()) error = 'Name is required';
    } else if (name === 'email') {
        if (!value.trim()) {
            error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = 'Invalid email format';
        }
    } else if (name === 'subject') {
        if (!value.trim()) error = 'Subject is required';
    } else if (name === 'message') {
        if (!value.trim()) error = 'Message is required';
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    let formIsValid = true;
    const newErrors = {};

    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        formIsValid = false;
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    if (formIsValid) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }, 1500);
    }
  };

  return (
    <FullScreenContainer>
      <Navbar>
        <Brand>Helpigo</Brand>
        <NavLinks>
          <a href="/">Home</a>
          <a href="/servicecard">Services</a>
          <a href="/contact" className="active">Contact</a>
        </NavLinks>
      </Navbar>

      <ContentWrapper>
        <MainContent>
          <Header>
            <h1>Get in Touch with <span>Helpigo</span></h1>
            <p>
              Have questions about our services or need assistance? Our team is ready to help you.
            </p>
          </Header>

          <ContactWrapper>
            <ContactForm>
              <h2>Send us a message</h2>
              
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=" "
                  />
                  <label htmlFor="name">Your Name *</label>
                  {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=" "
                  />
                  <label htmlFor="email">Email Address *</label>
                  {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=" "
                  />
                  <label htmlFor="subject">Subject *</label>
                  {errors.subject && <ErrorMessage>{errors.subject}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder=" "
                  />
                  <label htmlFor="message">How can we help? *</label>
                  {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
                </FormGroup>

                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </SubmitButton>

                {submitSuccess && (
                  <SuccessMessage>
                    Thank you for contacting us! We'll get back to you soon.
                  </SuccessMessage>
                )}
              </form>
            </ContactForm>

            <ContactInfo>
              <h2>Contact Information</h2>

              <ContactItem>
                <IconWrapper>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </IconWrapper>
                <InfoText>
                  <h3>Support Phone</h3>
                  <p>+1 (800) HEL-PIGO</p>
                  <small>Available Monday-Friday, 9AM-6PM EST</small>
                </InfoText>
              </ContactItem>

              <ContactItem>
                <IconWrapper>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </IconWrapper>
                <InfoText>
                  <h3>Email Support</h3>
                  <p>support@helpigo.com</p>
                  <small>Response within 24 hours</small>
                </InfoText>
              </ContactItem>

              <ContactItem>
                <IconWrapper>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </IconWrapper>
                <InfoText>
                  <h3>Headquarters</h3>
                  <p>123 Help Street, Suite 100</p>
                  <p>San Francisco, CA 94107</p>
                </InfoText>
              </ContactItem>

              <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #eee' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>FAQ About Getting Help</h3>
                
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ fontWeight: '500', color: '#333', fontSize: '1rem' }}>How quickly will I get a response?</h4>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>
                    We typically respond within 24 hours for email inquiries and immediately for phone calls during business hours.
                  </p>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ fontWeight: '500', color: '#333', fontSize: '1rem' }}>Do you provide 24/7 support?</h4>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>
                    Our standard support hours are 9AM-6PM EST, but premium customers can upgrade to 24/7 support plans.
                  </p>
                </div>
                
                <div>
                  <h4 style={{ fontWeight: '500', color: '#333', fontSize: '1rem' }}>What information should I include in my message?</h4>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>
                    Please include details about your specific need, any relevant account information, and your preferred contact method.
                  </p>
                </div>
              </div>
            </ContactInfo>
          </ContactWrapper>
        </MainContent>
      </ContentWrapper>

      <Footer>
        <p>© {new Date().getFullYear()} Helpigo. All rights reserved.</p>
      </Footer>
    </FullScreenContainer>
  );
};

export default Contact;

