import React from "react";
import "./ContactUs.css";

export default function ContactUs() {
  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We’re here to help. Reach out to us anytime.</p>
      </section>

      {/* Content */}
      <section className="contact-content">
        {/* Contact Info */}
        <div className="contact-info">
          <h2>Get in Touch</h2>

          <p>
            Have questions about your order, products, or customization?
            Our team is happy to help.
          </p>

          <div className="info-item">
            <strong>Email</strong>
            <span>support@curlycase.in</span>
          </div>

          <div className="info-item">
            <strong>Phone</strong>
            <span>+91 98765 43210</span>
          </div>

          <div className="info-item">
            <strong>Working Hours</strong>
            <span>Mon – Sat, 10 AM – 6 PM</span>
          </div>
        </div>

        {/* Contact Form */}
        <form className="contact-form">
          <h2>Send a Message</h2>

          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <input type="text" placeholder="Phone Number" />
          <textarea placeholder="Your Message" rows="5" required />

          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
}
