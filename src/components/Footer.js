import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Brand */}
        <div className="footer-col brand">
          <div className="brand-logo">
            <span>C</span>
            <h3>Curly Case</h3>
          </div>

          <p className="brand-text">
            Premium phone cases crafted with love in India. We combine style
            with protection to give your phone the care it deserves.
          </p>

          {/* Social Icons */}
          <div className="socials">
            <span><i className="bi bi-instagram"></i></span>
            <span><i className="bi bi-twitter-x"></i></span>
            <span><i className="bi bi-facebook"></i></span>
            <span><i className="bi bi-youtube"></i></span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>All Products</li>
            <li>Custom Case</li>
            <li>Track Order</li>
          </ul>
        </div>

        {/* Policies */}
        <div className="footer-col">
          <h4>Policies</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Return & Refund</li>
            <li>Shipping Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        {/* Payments & Contact */}
        <div className="footer-col">
          <h4>We Accept</h4>

          <div className="payments">
            <span><i className="bi bi-credit-card"></i> Cards</span>
            <span><i className="bi bi-phone"></i> UPI</span>
            <span><i className="bi bi-shield-lock"></i> Razorpay</span>
          </div>

          <h4 className="contact-title">Contact</h4>
          <p className="contact-text">
            <i className="bi bi-envelope"></i> support@curlycase.in <br />
            <i className="bi bi-telephone"></i> +91 98765 43210
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2025 Curly Case. All rights reserved.</p>
        <p>
          Made with <span className="heart">❤</span> in India
        </p>
      </div>
    </footer>
  );
}
