import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <h1>Your Cart</h1>
          <div className="empty-cart">
            <i className="bi bi-cart-x"></i>
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <Link to="/products" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Your Cart</h1>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.selectedModel}-${item.selectedColor}`}
                className="cart-item"
              >
                <div className="item-image">
                  <img src={item.cardImage} alt={item.name} />
                </div>

                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Model: {item.selectedModel}</p>
                  <p>Color: {item.selectedColor}</p>
                </div>

                <div className="item-price">
                  Rs. {item.newPrice.replace('Rs. ', '')}
                </div>

                <div className="item-quantity">
                  <button
                    className="qty-btn"
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.selectedModel,
                        item.selectedColor,
                        item.quantity - 1
                      )
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="qty-btn"
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.selectedModel,
                        item.selectedColor,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <div className="item-total">
                  Rs. {(
                    parseFloat(
                      item.newPrice
                        .replace('Rs. ', '')
                        .replace(',', '')
                    ) * item.quantity
                  ).toLocaleString()}
                </div>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeFromCart(
                      item.id,
                      item.selectedModel,
                      item.selectedColor
                    )
                  }
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
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

            <div className="cart-actions">
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>

              <Link to="/checkout" className="checkout-btn">
                Proceed to Checkout
              </Link>

              <Link to="/products" className="continue-shopping-link">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
