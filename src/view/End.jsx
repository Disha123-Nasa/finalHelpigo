// End.jsx
import React from 'react';
import './end.css'; // Import the CSS file

const End = () => {
  return (
    <div className="end-container">
      <div className="glitter"></div> {/* Add glitter effect */}
      <h2>Booking Confirmed!</h2>
      <p>Thank you for using Helpigo!</p>
      <p>Your booking has been successfully processed.</p>
      <p>We look forward to serving you!</p>
      <div className="end-footer">
        <p>If you have any questions, feel free to contact our support team.</p>
      </div>
    </div>
  );
};

export default End;
