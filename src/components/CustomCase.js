import React from "react";
import { Link } from "react-router-dom";
import "./CustomCase.css";

export default function CustomCase() {
  return (
    <div className="customcase-page">
      {/* Page Header */}
      <div className="customcase-header">
        <h1>CUSTOM CASE</h1>
        <p>
          Design your own case with Case Max Custom Cases—personalized protection
          that reflects your unique style while keeping your phone safe and
          secure.
        </p>
      </div>

      {/* Filter + Sort Bar */}
      <div className="customcase-toolbar">
        <div className="toolbar-left">
          <span>Filter:</span>
          <button className="toolbar-btn">Availability ▾</button>
          <button className="toolbar-btn">Price ▾</button>
        </div>

        <div className="toolbar-right">
          <span>Sort by:</span>
          <button className="toolbar-btn">Best selling ▾</button>
          <span className="product-count">1 product</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="customcase-grid">
        <Link to="/custom-details" className="customcase-card-link">
          <div className="customcase-card">
            <div className="card-image">
              <span className="sale-badge">Sale</span>
              <img
                src="/images/cru.png"
                alt="Custom Case"
              />
            </div>

            <div className="card-info">
              <h3>Custom Case</h3>
              <p className="old-price">Rs. 699.00</p>
              <p className="new-price">From Rs. 349.00</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
