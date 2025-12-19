import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getCartCount } = useCart();

  return (
    <>
      {/* TOP BAR */}
      <div className="topbar">
        <div className="topbar-track">
          <div className="topbar-item">
            <i className="bi bi-truck"></i> Pan-India Free Delivery
          </div>
          <div className="topbar-item">
            <i className="bi bi-shield-check"></i> Premium Quality Cases
          </div>
          <div className="topbar-item">
            <i className="bi bi-heart"></i> Trusted by Thousands
          </div>

          {/* duplicate for smooth loop */}
          <div className="topbar-item">
            <i className="bi bi-truck"></i> Pan-India Free Delivery
          </div>
          <div className="topbar-item">
            <i className="bi bi-shield-check"></i> Premium Quality Cases
          </div>
          <div className="topbar-item">
            <i className="bi bi-heart"></i> Trusted by Thousands
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="header">
        {/* LOGO */}
        <div className="logo">
          <img src="/images/cu.JPG" alt="Curly Case Logo" className="logo-image" />
          Curly Case
        </div>

        {/* DESKTOP NAV */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">All Products</Link>
          <Link to="/custom-case">Custom Case</Link>
          <Link to="/track-order">Track Order</Link>
          <Link to="/contact-us">Contact Us</Link>
        </nav>

        {/* ICONS */}
        <div className="header-icons">
          <span className="icon">
            <i className="bi bi-search"></i>
          </span>

          <Link to="/login" className="icon">
            <i className="bi bi-person"></i>
          </Link>

          <Link to="/cart" className="cart-icon">
            <i className="bi bi-cart"></i>
            <span className="cart-count">{getCartCount()}</span>
          </Link>

          {/* HAMBURGER (mobile) */}
          <span className="hamburger" onClick={() => setMenuOpen(true)}>
            <i className="bi bi-list"></i>
          </span>
        </div>
      </header>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          className="menu-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <span className="close-btn" onClick={() => setMenuOpen(false)}>
          <i className="bi bi-x-lg"></i>
        </span>

        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/products" onClick={() => setMenuOpen(false)}>All Products</Link>
        <Link to="/custom-case" onClick={() => setMenuOpen(false)}>Custom Case</Link>
        <Link to="/track-order" onClick={() => setMenuOpen(false)}>Track Order</Link>
        <Link to="/contact-us" onClick={() => setMenuOpen(false)}>Contact Us</Link>
      </div>
    </>
  );
}