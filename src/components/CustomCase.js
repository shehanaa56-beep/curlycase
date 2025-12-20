import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CustomDetails.css';

export default function CustomDetails() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState(''); // ✅ ADDED
  const [selectedMaterial, setSelectedMaterial] = useState('Metal Glass Case');
  const [quantity, setQuantity] = useState(1);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [dragging, setDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target.result);
      setPosition({ x: 0, y: 0 });
      setScale(1);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const handleQuantityChange = (delta) =>
    setQuantity((q) => Math.max(1, q + delta));

  const handleMouseDown = (e) => {
    setDragging(true);
    startPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y,
    });
  };

  const handleMouseUp = () => setDragging(false);

  const zoomIn = () => setScale((s) => Math.min(s + 0.1, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.1, 0.5));

const handleAddToCart = () => {
  const item = {
    id: 'custom-case',
    name: 'Custom Case',
    selectedModel: selectedModel,
    selectedColor: selectedMaterial,
    quantity: quantity,

    // ✅ FIX: price must be NUMBER (not string)
    newPrice: 499,
    oldPrice: 699,

    cardImage: '/images/cru.png',
    uploadedImage,
    position,
    scale,
  };

  addToCart(item);
  navigate('/cart');
};

  return (
    <div className="custom-details-page">
      <div className="custom-details-container">

        {/* LEFT */}
        <div className="product-preview">
          <div className="mockup-container">
            <div className="background-pattern">
              <span className="pattern-text">CURLYCASE</span>
            </div>

            <div className="print-area">
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="print-image"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    cursor: dragging ? 'grabbing' : 'grab',
                  }}
                />
              ) : (
                <div className="placeholder-text">YOUR IMAGE HERE</div>
              )}
            </div>

            <img src="/images/cru.png" alt="Phone Case" className="mockup-image" />

            <div className="zoom-controls">
              <button onClick={zoomOut}><i className="bi bi-dash"></i></button>
              <button onClick={zoomIn}><i className="bi bi-plus"></i></button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="product-info">
          <div className="brand-label">CURLYCASE</div>
          <h1 className="product-title">Custom Case</h1>

          <div className="pricing-area">
            <span className="old-price">Rs. 699.00</span>
            <span className="new-price">Rs. 499.00</span>
            <span className="sale-badge">Sale</span>
          </div>

          <p className="pricing-helper">
            Taxes included. Shipping calculated at checkout.
          </p>

          <div className="config-options">

            {/* BRAND */}
            <div className="selector-group">
              <label className="selector-label">BRAND</label>
              <select
                className="brand-dropdown"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">SELECT BRAND</option>
                <option value="iPhone">iPhone</option>
                <option value="Samsung">Samsung</option>
                <option value="OnePlus">OnePlus</option>
              </select>
            </div>

            {/* ✅ MODEL (NEW) */}
            <div className="selector-group">
              <label className="selector-label">MODEL</label>
              <select
                className="brand-dropdown"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
              >
                <option value="">SELECT MODEL</option>
                <option value="iPhone 13">iPhone 13</option>
                <option value="iPhone 13 Pro">iPhone 13 Pro</option>
                <option value="iPhone 14">iPhone 14</option>
                <option value="iPhone 14 Pro">iPhone 14 Pro</option>
                <option value="iPhone 15">iPhone 15</option>
                <option value="iPhone 15 Pro">iPhone 15 Pro</option>
              </select>
            </div>

            {/* MATERIAL */}
            <div className="selector-group">
              <label className="selector-label">MATERIAL</label>
              <div className="material-buttons">
                <button
                  className={`material-btn ${selectedMaterial === 'Metal Glass Case' ? 'active' : ''}`}
                  onClick={() => setSelectedMaterial('Metal Glass Case')}
                >
                  Metal Glass Case
                </button>
                <button
                  className={`material-btn ${selectedMaterial === 'Silicon Case' ? 'active' : ''}`}
                  onClick={() => setSelectedMaterial('Silicon Case')}
                >
                  Silicon Case
                </button>
              </div>
            </div>

            {/* QUANTITY */}
            <div className="selector-group">
              <label className="selector-label">Quantity</label>
              <div className="quantity-selector">
                <button className="qty-btn" onClick={() => handleQuantityChange(-1)}>
                  <i className="bi bi-dash"></i>
                </button>
                <span className="qty-number">{quantity}</span>
                <button className="qty-btn" onClick={() => handleQuantityChange(1)}>
                  <i className="bi bi-plus"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="upload-btn" onClick={triggerFileInput}>
              <i className="bi bi-upload"></i> UPLOAD YOUR IMAGE
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              hidden
            />

            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              <i className="bi bi-cart3"></i> ADD TO CART
            </button>
          </div>

          <div className="trust-badges">
            <div className="badge"><i className="bi bi-truck"></i> 4–8 DAYS DELIVERY</div>
            <div className="badge"><i className="bi bi-arrow-counterclockwise"></i> EASY RETURN</div>
            <div className="badge"><i className="bi bi-box-seam"></i> FREE SHIPPING</div>
          </div>

          <div className="extra-actions">
            <button className="share-btn">
              <i className="bi bi-share"></i> Share
            </button>
          </div>
        </div>
      </div>

      <button className="floating-chat-btn">
        <i className="bi bi-chat-dots"></i>
      </button>
    </div>
  );
}
