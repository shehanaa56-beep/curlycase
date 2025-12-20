import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Payment.css';

export default function Payment() {
  const { cartItems, getCartTotal, placeOrder } = useCart();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('');

  const handlePaymentSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handleConfirmPayment = () => {
    if (!selectedPayment) {
      alert('Please select a payment method');
      return;
    }

    // Simulate payment processing
    alert(`Payment confirmed via ${selectedPayment}`);

    // Place order and clear cart
    placeOrder({ paymentMethod: selectedPayment });

    // Navigate to order history
    navigate('/order-history');
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>Payment</h1>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-items">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedModel}-${item.selectedColor}`} className="order-item">
                <>
                  <div className="item-image">
                    <img src={item.uploadedImage || item.cardImage} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Model: {item.selectedModel}</p>
                    <p>Color: {item.selectedColor}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </>
              </div>
            ))}
          </div>
          <div className="total">
            <strong>Total: Rs. {getCartTotal().toLocaleString()}</strong>
          </div>
        </div>

        <div className="payment-options">
          <h2>Select Payment Method</h2>
          <div className="payment-methods">
            <div
              className={`payment-method ${selectedPayment === 'cash' ? 'selected' : ''}`}
              onClick={() => handlePaymentSelect('cash')}
            >
              <h3>Cash on Delivery</h3>
              <p>Pay when your order is delivered</p>
            </div>
            <div
              className={`payment-method ${selectedPayment === 'upi' ? 'selected' : ''}`}
              onClick={() => handlePaymentSelect('upi')}
            >
              <h3>UPI</h3>
              <p>Pay using UPI apps like Google Pay, PhonePe, etc.</p>
            </div>
          </div>
        </div>

        <button className="confirm-payment-btn" onClick={handleConfirmPayment}>
          Confirm Payment
        </button>
      </div>
    </div>
  );
}
