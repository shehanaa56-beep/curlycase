import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { parsePrice } from '../context/CartContext';
import "./FeaturedProducts.css";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "products"),
      where("featured", "==", true)
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const featuredProducts = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.name,
            image: data.cardImage,      // ✅ single card image
            price: data.newPrice,
            oldPrice: data.oldPrice || '',
            tag: data.tag || null,
            onSale: data.onSale || false
          };
        });

        setProducts(featuredProducts);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching featured products: ", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <section className="featured-section">
      <h2 className="featured-title">Featured Products</h2>
      <p className="featured-subtitle">
        Our most popular cases, crafted with premium materials
      </p>

      <div className="featured-grid">
        {products.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            className="product-card-link"
          >
            <div className="product-card">

              {/* Tag / Sale */}
              {item.tag && (
                <span className="product-tag">{item.tag}</span>
              )}

              <div className="product-image">
                <img src={item.image} alt={item.title} />
              </div>

              <h3 className="product-name">{item.title}</h3>

              <div className="product-price">
                {item.oldPrice && (
                  <span className="old-price">{item.oldPrice}</span>
                )}
                <span className="price">{item.price}</span>
              </div>

            </div>
          </Link>
        ))}
      </div>

      <div className="view-all">
        <button className="view-btn">View All Products</button>
      </div>
    </section>
  );
}
