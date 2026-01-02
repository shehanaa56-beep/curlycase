import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Payment.css';

export default function Payment() {
  const { cartItems, getCartTotal, placeOrder } = useCart();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('');
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => console.error('Failed to load Razorpay script');
    document.body.appendChild(script);
  }, []);

  const handlePaymentSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  const handleConfirmPayment = () => {
    if (!selectedPayment) {
      alert('Please select a payment method');
      return;
    }

    if (selectedPayment === 'cash') {
      // Simulate payment processing for cash on delivery
      alert('Payment confirmed via Cash on Delivery');

      // Place order and clear cart
      placeOrder({ paymentMethod: selectedPayment });

      // Navigate to order history
      navigate('/order-history');
    } else {
      // Razorpay payment methods
      if (!razorpayLoaded) {
        alert('Razorpay is still loading. Please try again.');
        return;
      }

      let method = '';
      if (selectedPayment === 'upi') method = 'upi';
      else if (selectedPayment === 'card') method = 'card';
      else if (selectedPayment === 'netbanking') method = 'netbanking';
      else if (selectedPayment === 'wallet') method = 'wallet';

      const options = {
        key: 'rzp_live_RyyKhZoXapgMTE', // Live key
        amount: getCartTotal() * 100, // Amount in paise
        currency: 'INR',
        name: 'CurlyCase',
        description: 'Payment for your order',
        method: method,
        handler: function (response) {
          // Payment successful
          alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);

          // Place order and clear cart
          placeOrder({ paymentMethod: selectedPayment, paymentId: response.razorpay_payment_id });

          // Navigate to order history
          navigate('/order-history');
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#3399cc'
        },
        modal: {
          ondismiss: function() {
            alert('Payment cancelled');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
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
            <label className="payment-radio">
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={selectedPayment === 'upi'}
                onChange={(e) => handlePaymentSelect(e.target.value)}
              />
              UPI
            </label>
            <label className="payment-radio">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={selectedPayment === 'card'}
                onChange={(e) => handlePaymentSelect(e.target.value)}
              />
              Debit/Credit Card
            </label>
            <label className="payment-radio">
              <input
                type="radio"
                name="payment"
                value="netbanking"
                checked={selectedPayment === 'netbanking'}
                onChange={(e) => handlePaymentSelect(e.target.value)}
              />
              Net Banking
            </label>
            <label className="payment-radio">
              <input
                type="radio"
                name="payment"
                value="wallet"
                checked={selectedPayment === 'wallet'}
                onChange={(e) => handlePaymentSelect(e.target.value)}
              />
              Wallets
            </label>
          </div>
        </div>

        <button className="confirm-payment-btn" onClick={handleConfirmPayment}>
          Confirm Payment
        </button>
      </div>
    </div>
  );
}
