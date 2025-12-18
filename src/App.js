import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import TrackOrder from './components/TrackOrder';
import ContactUs from './components/ContactUs';
import CustomCase from "./components/CustomCase";
import CustomDetails from "./components/CustomDetails";

function App() {
  return (
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
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/custom-case" element={<CustomCase />} />
          <Route path="/custom-details" element={<CustomDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
