import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

/* ✅ SAFE PRICE PARSER (FIX) */
export const parsePrice = (price) => {
  if (!price) return 0;
  const cleaned = price.toString().replace(/[₹Rs\s]/g, '').replace(',', '.');
  return Number(cleaned);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i =>
        i.id === item.id &&
        i.selectedModel === item.selectedModel &&
        i.selectedColor === item.selectedColor
      );

      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id &&
          i.selectedModel === item.selectedModel &&
          i.selectedColor === item.selectedColor
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prevItems, item];
      }
    });
  };

  const removeFromCart = (itemId, selectedModel, selectedColor) => {
    setCartItems(prevItems =>
      prevItems.filter(item =>
        !(item.id === itemId &&
          item.selectedModel === selectedModel &&
          item.selectedColor === selectedColor)
      )
    );
  };

  const updateQuantity = (itemId, selectedModel, selectedColor, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId, selectedModel, selectedColor);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId &&
        item.selectedModel === selectedModel &&
        item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = async (orderData) => {
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');

    // Create a lightweight version of cart items for storage (remove large images)
    const lightweightItems = cartItems.map(item => ({
      ...item,
      cardImage: undefined, // Remove potentially large image data
      uploadedImage: item.uploadedImage // Keep uploaded images for order history
    }));

    const newOrder = {
      id: `ORD${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      items: lightweightItems,
      total: getCartTotal(),
      status: 'Pending',
      ...orderData
    };

    orderHistory.push(newOrder);

    // Keep only the last 50 orders to prevent quota exceeded errors
    const recentOrders = orderHistory.slice(-50);

    try {
      localStorage.setItem('orderHistory', JSON.stringify(recentOrders));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      // If quota exceeded, clear old orders and try again with just the new order
      if (error.name === 'QuotaExceededError') {
        try {
          localStorage.setItem('orderHistory', JSON.stringify([newOrder]));
        } catch (retryError) {
          console.error("Failed to save even single order:", retryError);
        }
      }
    }

    // Save to Firebase (keep full order data including images)
    try {
      await addDoc(collection(db, "orders"), {
        ...newOrder,
        items: cartItems // Include full items with images for Firebase
      });
    } catch (error) {
      console.error("Error saving order to Firebase:", error);
    }

    clearCart();
    return newOrder;
  };

  /* ✅ FIXED TOTAL CALCULATION */
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parsePrice(item.newPrice);
      return total + price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    placeOrder,
    getCartTotal,
    getCartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
