import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs
} from "firebase/firestore";
import { db } from '../firebase';
import './OrderHistory.css';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const snapshot = await getDocs(collection(db, "orders"));
      setOrders(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    };
    fetchOrders();
  }, []);

  return (
    <div className="order-history-page">
      <div className="order-history-container">
        <h1>Order History</h1>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <h3>Order #{order.id}</h3>
                  <span className="order-date">{order.date}</span>
                  <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                </div>

                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <img src={item.cardImage} alt={item.name} className="item-thumb" />
                      <div>
                        <span>{item.name}</span>
                        <span>Model: {item.selectedModel}, Color: {item.selectedColor}</span>
                        <span>Quantity: {item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-total">
                  <strong>Total: Rs. {order.total.toLocaleString()}</strong>
                  <p>Payment Method: {order.paymentMethod}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
