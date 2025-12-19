import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

/* ✅ SAFE PRICE PARSER (FIX) */
const parsePrice = (price) => {
  if (!price) return 0;
  return Number(price.toString().replace(/[₹Rs.,\s]/g, ''));
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
    getCartTotal,
    getCartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
