import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import ShopByCategory from './components/ShopByCategory';
import FeaturedProducts from './components/FeaturedProducts';
import ProductComparison from './components/ProductComparison';
import TrustBenefits from './components/TrustBenefits';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import TrackOrder from './components/TrackOrder';
import ContactUs from './components/ContactUs';
import CustomCase from "./components/CustomCase";
import CustomDetails from "./components/CustomDetails";
import AdminDashboard from "./components/AdminDashboard";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <ShopByCategory />
                <FeaturedProducts />
                <ProductComparison />
                <TrustBenefits />
                <Footer />
              </>
            } />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/custom-case" element={<CustomCase />} />
            <Route path="/custom-details" element={<CustomDetails />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;