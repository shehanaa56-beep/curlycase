import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const data = productSnap.data();
          setProduct({ id: productSnap.id, ...data });

          setSelectedModel(data.models?.[0] || '');
          setSelectedColor(data.colors?.[0] || '');
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchAllProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const list = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAllProducts(list);
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    fetchAllProducts();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">

        {/* Image Gallery */}
        <div className="image-gallery">
          <div className="gallery-grid">
            {(product.galleryImages || []).map((img, index) => (
              img && (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className="gallery-image"
                />
              )
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
            {product.onSale && (
              <span className="old-price">{product.oldPrice}</span>
            )}
            <span className="new-price">{product.newPrice}</span>
            {product.onSale && <span className="sale-badge">Sale</span>}
            <p className="tax-info">
              Taxes included. Shipping calculated at checkout.
            </p>
          </div>

          {/* Model Selector */}
          <div className="option-section">
            <h3>Choose Model</h3>
            <div className="model-buttons">
              {(product.models || []).map(model => (
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
              {(product.colors || []).map(color => (
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

          {/* Quantity */}
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

          {/* Reviews */}
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
          {allProducts.slice(0, 4).map(p => (
            <Link key={p.id} to={`/product/${p.id}`} className="related-card">
              <img src={p.cardImage} alt={p.name} />
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
