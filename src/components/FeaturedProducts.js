import { Link } from 'react-router-dom';
import "./FeaturedProducts.css";

export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      title: "Forest Green Elite",
      price: 1099,
      oldPrice: 1499,
      tag: "New",
      image: "/images/cr5.png",
    },
    {
      id: 2,
      title: "Aqua Transparent",
      price: 449,
      oldPrice: 599,
      image: "/images/cr6.png",
    },
    {
      id: 3,
      title: "Mint Fresh Soft",
      price: 549,
      oldPrice: 699,
      tag: "Sale",
      image: "/images/cr.jpeg",
    },
    {
      id: 4,
      title: "Classic Black Matte",
      price: 649,
      oldPrice: 899,
      image: "/images/cr7.png",
    },
  ];

  return (
    <section className="featured-section">
      <h2 className="featured-title">Featured Products</h2>
      <p className="featured-subtitle">
        Our most popular cases, crafted with premium materials
      </p>

      <div className="featured-grid">
        {products.map((item, index) => (
          <Link key={index} to={`/product/${item.id}`} className="product-card-link">
            <div className="product-card">
              {item.tag && <span className="product-tag">{item.tag}</span>}

              <div className="product-image">
                <img src={item.image} alt={item.title} />
              </div>

              <h3 className="product-name">{item.title}</h3>

              <div className="product-price">
                <span className="price">₹{item.price}</span>
                <span className="old-price">₹{item.oldPrice}</span>
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
