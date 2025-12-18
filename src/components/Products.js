import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

const products = [
  {
    id: 1,
    name: 'IPHONE 15 PRO MAX',
    image: '/images/cr1.jpeg',
    oldPrice: '₹699.00',
    newPrice: '₹499.00',
    onSale: true,
  },
  {
    id: 2,
    name: 'IPHONE 15 PRO',
    image: '/images/cr2.jpeg',
    oldPrice: '₹599.00',
    newPrice: '₹399.00',
    onSale: false,
  },
  {
    id: 3,
    name: 'IPHONE 15 PLUS',
    image: '/images/cr3.jpeg',
    oldPrice: '₹699.00',
    newPrice: '₹499.00',
    onSale: true,
  },
  {
    id: 4,
    name: 'IPHONE 15',
    image: '/images/cr4.jpeg',
    oldPrice: '₹599.00',
    newPrice: '₹399.00',
    onSale: false,
  },
  {
    id: 5,
    name: 'IPHONE 14 PRO MAX',
    image: '/images/cr5.png',
    oldPrice: '₹699.00',
    newPrice: '₹499.00',
    onSale: true,
  },
  {
    id: 6,
    name: 'IPHONE 14 PRO',
    image: '/images/cr6.png',
    oldPrice: '₹599.00',
    newPrice: '₹399.00',
    onSale: false,
  },
  {
    id: 7,
    name: 'IPHONE 14 PLUS',
    image: '/images/cr7.png',
    oldPrice: '₹699.00',
    newPrice: '₹499.00',
    onSale: true,
  },
  {
    id: 8,
    name: 'IPHONE 14',
    image: '/images/cr8.png',
    oldPrice: '₹599.00',
    newPrice: '₹399.00',
    onSale: false,
  },
  {
    id: 9,
    name: 'IPHONE 13 PRO MAX',
    image: '/images/cr9.png',
    oldPrice: '₹699.00',
    newPrice: '₹499.00',
    onSale: true,
  },
  {
    id: 10,
    name: 'IPHONE 13 PRO',
    image: '/images/cr10.png',
    oldPrice: '₹599.00',
    newPrice: '₹399.00',
    onSale: false,
  },
  {
    id: 11,
    name: 'IPHONE 13',
    image: '/images/cr11.png',
    oldPrice: '₹699.00',
    newPrice: '₹499.00',
    onSale: true,
  },
];

export default function Products() {
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [sortBy, setSortBy] = useState('Alphabetically, A-Z');

  const filteredProducts = products
    .filter(product => {
      if (availabilityFilter === 'In Stock') return true;
      if (availabilityFilter === 'Out of Stock') return false;
      return true;
    })
    .filter(product => {
      if (priceFilter === 'Under ₹500') return parseFloat(product.newPrice.replace('₹', '')) < 500;
      if (priceFilter === '₹500 - ₹700') return parseFloat(product.newPrice.replace('₹', '')) >= 500 && parseFloat(product.newPrice.replace('₹', '')) <= 700;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'Alphabetically, A-Z') return a.name.localeCompare(b.name);
      if (sortBy === 'Alphabetically, Z-A') return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div className="products-page">
      <h1 className="products-title">PRODUCTS</h1>

      <div className="filters-section">
        <div className="filters-left">
          <span className="filter-label">Filter:</span>
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="filter-dropdown"
          >
            <option value="">Availability</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="filter-dropdown"
          >
            <option value="">Price</option>
            <option value="Under ₹500">Under ₹500</option>
            <option value="₹500 - ₹700">₹500 - ₹700</option>
          </select>
        </div>

        <div className="filters-right">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-dropdown"
          >
            <option value="Alphabetically, A-Z">Alphabetically, A-Z</option>
            <option value="Alphabetically, Z-A">Alphabetically, Z-A</option>
          </select>
          <span className="product-count">{filteredProducts.length} products</span>
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} className="product-card-link">
            <div className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
              </div>
              <h3 className="product-name">{product.name}</h3>
              <div className="product-price">
                {product.onSale && <span className="old-price">{product.oldPrice}</span>}
                <span className="new-price">{product.newPrice}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
