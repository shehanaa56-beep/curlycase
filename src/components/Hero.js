import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* LEFT CONTENT */}
        <div className="hero-left">
          <span className="hero-badge">
  <i className="bi bi-stars"></i> New Collection 2025
</span>
          <h1 className="hero-title">
            Crafted to <span>Protect.</span>
            <br />
            Styled to <span>Impress.</span>
          </h1>

          <p className="hero-desc">
            Premium phone cases designed for everyday protection and standout
            style. Made in India, loved worldwide.
          </p>

          <div className="hero-buttons">
            <button className="btn-primary">
              Shop Now <span>→</span>
            </button>
            <button className="btn-outline">Create Custom Case</button>
          </div>

          <div className="hero-stats">
            <div>
              <strong>50K+</strong>
              <span>Happy Customers</span>
            </div>
            <div>
              <strong>4.9★</strong>
              <span>Average Rating</span>
            </div>
            <div>
              <strong>100+</strong>
              <span>Phone Models</span>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGES */}
        <div className="hero-right">
          <div className="hero-image small">
            <img src="/images/cr5.png" alt="Phone Case" />
          </div>

          <div className="hero-image large">
            <img src="/images/cr6.png" alt="Phone Case" />
          </div>
        </div>
      </div>
    </section>
  );
}
