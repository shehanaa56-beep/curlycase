import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

/* ✅ SAFE PRICE PARSER (ADDED — logic only) */
const parsePrice = (price) => {
  if (!price) return 0;
  return Number(price.toString().replace(/[₹Rs.,\s]/g, ''));
};

export default function Checkout() {
  const { cartItems, getCartTotal } = useCart();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/payment');
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>

        <div className="checkout-content">
          {/* LEFT */}
          <div className="checkout-left">
            <div className="checkout-section">
              <h2>Shipping Address</h2>

              <form onSubmit={handleSubmit} className="shipping-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={shippingAddress.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={shippingAddress.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={shippingAddress.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={shippingAddress.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Country</label>
                    <input
                      type="text"
                      name="country"
                      value={shippingAddress.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT */}
          <div className="checkout-right">
            <div className="checkout-section">
              <h2>Order Summary</h2>

              <div className="order-items">
                {cartItems.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedModel}-${item.selectedColor}`}
                    className="order-item"
                  >
                    <div className="item-image">
                      <img src={item.cardImage} alt={item.name} />
                    </div>

                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Model: {item.selectedModel}</p>
                      <p>Color: {item.selectedColor}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>

                  </div>
                ))}
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>Rs. {getCartTotal().toLocaleString()}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <div className="summary-row total">
                  <span>Total</span>
                  <span>Rs. {getCartTotal().toLocaleString()}</span>
                </div>
              </div>

              <button className="place-order-btn" onClick={handleSubmit}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
