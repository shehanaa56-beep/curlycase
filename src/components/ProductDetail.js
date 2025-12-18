import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetail.css';

// Products data (same as in Products.js)
const products = [
  {
    id: 1,
    name: 'IPHONE 15 PRO MAX',
    image: '/images/cr1.jpeg',
    oldPrice: '₹699.00',
    newPrice: '₹499.00',
    onSale: true,
    gallery: ['/images/cr1.jpeg', '/images/cr2.jpeg', '/images/cr3.jpeg', '/images/cr4.jpeg'],
    models: ['16', '16 Pro', '16 Pro Max', '16 Plus'],
    colors: ['Black', 'Orange', 'Violet', 'Grey', 'Dark Blue', 'Grape', 'Light Pink', 'Dark Green'],
  },
  {
    id: 2,
    name: 'IPHONE 15 PRO',
    image: '/images/cr2.jpeg',
    oldPrice: '₹599.00',
    newPrice: '₹399.00',
    onSale: false,
    gallery: ['/images/cr2.jpeg', '/images/cr3.jpeg', '/images/cr4.jpeg', '/images/cr1.jpeg'],
    models: ['16', '16 Pro', '16 Pro Max', '16 Plus'],
    colors: ['Black', 'Orange', 'Violet', 'Grey', 'Dark Blue', 'Grape', 'Light Pink', 'Dark Green'],
  },
  {
    id: 3,
    name: 'IPHONE 15 PLUS',
    image: '/images/cr3.jpeg',
    oldPrice: '₹699.00',
    newPrice: '₹499.00',
    onSale: true,
    gallery: ['/images/cr3.jpeg', '/images/cr4.jpeg', '/images/cr1.jpeg', '/images/cr2.jpeg'],
    models: ['16', '16 Pro', '16 Pro Max', '16 Plus'],
    colors: ['Black', 'Orange', 'Violet', 'Grey', 'Dark Blue', 'Grape', 'Light Pink', 'Dark Green'],
  },
  {
    id: 4,
    name: 'IPHONE 15',
    image: '/images/cr4.jpeg',
    oldPrice: '₹599.00',
    newPrice: '₹399.00',
    onSale: false,
    gallery: ['/images/cr4.jpeg', '/images/cr1.jpeg', '/images/cr2.jpeg', '/images/cr3.jpeg'],
    models: ['16', '16 Pro', '16 Pro Max', '16 Plus'],
    colors: ['Black', 'Orange', 'Violet', 'Grey', 'Dark Blue', 'Grape', 'Light Pink', 'Dark Green'],
  },
  {
    id: 5,
    name: 'IPHONE 14 PRO MAX',
    image: '/images/cr5.png',
    oldPrice: '₹699.00',
    newPrice: '₹499.00',
    onSale: true,
    gallery: ['/images/cr5.png', '/images/cr6.png', '/images/cr7.png', '/images/cr8.png'],
    models: ['16', '16 Pro', '16 Pro Max', '16 Plus'],
    colors: ['Black', 'Orange', 'Violet', 'Grey', 'Dark Blue', 'Grape', 'Light Pink', 'Dark Green'],
  },
  {
    id: 6,
    name: 'IPHONE 14 PRO',
    image: '/images/cr6.png',
    oldPrice: '₹599.00',
    newPrice: '₹399.00',
    onSale: false,
    gallery: ['/images/cr6.png', '/images/cr7.png', '/images/cr8.png', '/images/cr5.png'],
    models: ['16', '16 Pro', '16 Pro Max', '16 Plus'],
    colors: ['Black', 'Orange', 'Violet', 'Grey', 'Dark Blue', 'Grape', 'Light Pink', 'Dark Green'],
  },
  {
    id: 7,
    name: 'IPHONE 14 PLUS',
    image: '/images/cr7.png',
    oldPrice: '₹699.00',
    newPrice: '₹499.00',
    onSale: true,
    gallery: ['/images/cr7.png', '/images/cr8.png', '/images/cr5.png', '/images/cr6.png'],
    models: ['16', '16 Pro', '16 Pro Max', '16 Plus'],
    colors: ['Black', 'Orange', 'Violet', 'Grey', 'Dark Blue', 'Grape', 'Light Pink', 'Dark Green'],
  },
  {
    id: 8,
    name: 'IPHONE 14',
    image: '/images/cr8.png',
    oldPrice: '₹599.00',
    newPrice: '₹399.00',
    onSale: false,
    gallery: ['/images/cr8.png', '/images/cr5.png', '/images/cr6.png', '/images/cr7.png'],
    models: ['16', '16 Pro', '16 Pro Max', '16 Plus'],
    colors: ['Black', 'Orange', 'Violet', 'Grey', 'Dark Blue', 'Grape', 'Light Pink', 'Dark Green'],
  },
  {
    id: 9,
    name: 'IPHONE 13 PRO MAX',
    image: '/images/cr9.png',
    oldPrice: '₹699.00',
    newPrice: '₹499.00',
    onSale: true,
    gallery: ['/images/cr9.png', '/images/cr10.png', '/images/cr11.png', '/images/cr5.png'],
    models: ['16', '16 Pro', '16 Pro Max', '16 Plus'],
    colors: ['Black', 'Orange', 'Violet', 'Grey', 'Dark Blue', 'Grape', 'Light Pink', 'Dark Green'],
  },
  {
    id: 10,
    name: 'IPHONE 13 PRO',
    image: '/images/cr10.png',
    oldPrice: '₹599.00',
    newPrice: '₹399.00',
    onSale: false,
    gallery: ['/images/cr10.png', '/images/cr11.png', '/images/cr5.png', '/images/cr9.png'],
    models: ['16', '16 Pro', '16 Pro Max', '16 Plus'],
    colors: ['Black', 'Orange', 'Violet', 'Grey', 'Dark Blue', 'Grape', 'Light Pink', 'Dark Green'],
  },
  {
    id: 11,
    name: 'IPHONE 13',
    image: '/images/cr11.png',
    oldPrice: '₹699.00',
    newPrice: '₹499.00',
    onSale: true,
    gallery: ['/images/cr11.png', '/images/cr5.png', '/images/cr9.png', '/images/cr10.png'],
    models: ['16', '16 Pro', '16 Pro Max', '16 Plus'],
    colors: ['Black', 'Orange', 'Violet', 'Grey', 'Dark Blue', 'Grape', 'Light Pink', 'Dark Green'],
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  const [selectedModel, setSelectedModel] = useState(product?.models[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        {/* Image Gallery */}
        <div className="image-gallery">
          <div className="gallery-grid">
            {product.gallery.map((img, index) => (
              <img key={index} src={img} alt={`${product.name} ${index + 1}`} className="gallery-image" />
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="product-info">
          <div className="product-header">
            <span className="brand-name">CURLYCASE</span>
            <h1 className="product-title">{product.name}</h1>
          </div>

          <div className="pricing">
            {product.onSale && <span className="old-price">{product.oldPrice}</span>}
            <span className="new-price">{product.newPrice}</span>
            {product.onSale && <span className="sale-badge">Sale</span>}
            <p className="tax-info">Taxes included. Shipping calculated at checkout.</p>
          </div>

          {/* Model Selector */}
          <div className="option-section">
            <h3>Choose Model</h3>
            <div className="model-buttons">
              {product.models.map(model => (
                <button
                  key={model}
                  className={`option-btn ${selectedModel === model ? 'active' : ''}`}
                  onClick={() => setSelectedModel(model)}
                >
                  {model}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div className="option-section">
            <h3>Colour</h3>
            <div className="color-buttons">
              {product.colors.map(color => (
                <button
                  key={color}
                  className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="quantity-section">
            <h3>Quantity</h3>
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="cta-buttons">
            <button className="add-to-cart-btn">ADD TO CART</button>
            <button className="buy-now-btn">BUY IT NOW</button>
          </div>

          {/* Trust Badges */}
<div className="trust-badges">
  <div className="badge">
    <i className="bi bi-truck"></i>
    <span>4–8 DAYS DELIVERY</span>
  </div>

  <div className="badge">
    <i className="bi bi-arrow-repeat"></i>
    <span>EASY RETURN</span>
  </div>

  <div className="badge">
    <i className="bi bi-box-seam"></i>
    <span>FREE SHIPPING</span>
  </div>
</div>

              {/* Customer Reviews */}
      <section className="reviews-section">
        <h2>Customer Reviews</h2>
        <div className="rating-summary">
          <div className="stars">★★★★☆</div>
          <span>4.00 out of 5</span>
          <span>Based on 1 review</span>
        </div>
        <button className="write-review-btn">Write a review</button>
      </section>
        </div>
      </div>

  

      {/* Social Proof */}
      <section className="social-proof">
        <h2>1000+</h2>
        <p>SATISFIED CUSTOMERS</p>
      </section>

      {/* You May Also Like */}
      <section className="you-may-also-like">
        <h2>You May Also Like</h2>
        <div className="related-products">
          {products.slice(0, 4).map(p => (
            <Link key={p.id} to={`/product/${p.id}`} className="related-card">
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <div className="price">
                {p.onSale && <span className="old">{p.oldPrice}</span>}
                <span className="new">{p.newPrice}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
