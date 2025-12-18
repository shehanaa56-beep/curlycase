import React, { useState } from 'react';
import './TrackOrder.css';
import heroBg from '../assets/c.jpeg'; // ✅ FIX

export default function TrackOrder() {
  const [activeTab, setActiveTab] = useState('order');
  const [orderNumber, setOrderNumber] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'order') {
      alert('Order tracking submitted. (Mock response)');
    } else {
      alert('Tracking number submitted. (Mock response)');
    }
  };

  return (
    <div className="track-order-page">
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15)),
            url(${heroBg})
          `
        }}
      >
        <div className="hero-overlay"></div>
      </div>

      {/* Floating Card */}
      <div className="track-card">
        <h1>Track Your Order</h1>

        {/* Tab Switcher */}
        <div className="tab-switcher">
          <button
            className={`tab ${activeTab === 'order' ? 'active' : ''}`}
            onClick={() => setActiveTab('order')}
          >
            Order Number
          </button>
          <button
            className={`tab ${activeTab === 'tracking' ? 'active' : ''}`}
            onClick={() => setActiveTab('tracking')}
          >
            Tracking Number
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="track-form">
          {activeTab === 'order' ? (
            <>
              <input
                type="text"
                placeholder="Order Number"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Email or Phone Number"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                required
              />
            </>
          ) : (
            <input
              type="text"
              placeholder="Tracking Number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              required
            />
          )}

          <button type="submit" className="track-btn">
            Track Your Order
          </button>
        </form>
      </div>
    
    </div>

  );
}
