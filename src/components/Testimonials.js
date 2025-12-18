import "./Testimonials.css";

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">What Our Customers Say</h2>
      <p className="testimonials-subtitle">
        Join thousands of happy customers who trust Curly Case
      </p>

      <div className="testimonial-card">
        {/* Quote icon */}
        <div className="quote-icon">“</div>

        {/* Stars */}
        <div className="stars">
          ★★★★★
        </div>

        {/* Review */}
        <p className="testimonial-text">
          "The custom case feature is amazing! I designed my own case with my
          pet's photo and it turned out beautifully. Fast delivery too!"
        </p>

        {/* Avatar */}
        <div className="avatar">SP</div>

        {/* Name */}
        <h4 className="user-name">Sneha Patel</h4>
        <span className="user-location">Bangalore</span>
      </div>

      {/* Pagination */}
      <div className="testimonial-pagination">
        <button className="arrow">‹</button>

        <div className="dots">
          <span></span>
          <span></span>
          <span className="active"></span>
          <span></span>
        </div>

        <button className="arrow">›</button>
      </div>
    </section>
  );
}
