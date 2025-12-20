import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { parsePrice } from '../context/CartContext';
import "./Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (querySnapshot) => {
        const allProducts = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.name,
            image: data.cardImage,
            price: data.newPrice,
            oldPrice: data.oldPrice || '',
            tag: data.tag || null,
            onSale: data.onSale || false
          };
        });

        setProducts(allProducts);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching products: ", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <section className="products-section">
      <h2 className="products-title">All Products</h2>
      <p className="products-subtitle">
        Explore our full collection of premium cases
      </p>

      <div className="products-grid">
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
    </section>
  );
}
