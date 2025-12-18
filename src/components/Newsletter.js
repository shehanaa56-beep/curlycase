import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    alert(`Subscribed with email: ${email}`);
    setEmail('');
  };

  return (
    <section className="newsletter">
      <div className="newsletter-content">
        <h2>Stay Updated</h2>
        <p>Get the latest updates on new products and exclusive offers.</p>
        <form onSubmit={handleSubmit} className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
