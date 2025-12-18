import "./TrustBenefits.css";

export default function TrustBenefits() {
  const benefits = [
    {
      icon: "bi-truck",
      title: "Free Shipping",
      text: "Pan-India delivery on all orders",
    },
    {
      icon: "bi-arrow-counterclockwise",
      title: "Easy Returns",
      text: "7-day hassle-free returns",
    },
    {
      icon: "bi-shield-check",
      title: "Quality Guarantee",
      text: "Premium materials only",
    },
    {
      icon: "bi-headset",
      title: "24/7 Support",
      text: "We're here to help anytime",
    },
  ];

  return (
    <section className="trust-section">
      <div className="trust-grid">
        {benefits.map((item, index) => (
          <div className="trust-card" key={index}>
            <div className="trust-icon">
              <i className={`bi ${item.icon}`}></i>
            </div>
            <h4 className="trust-title">{item.title}</h4>
            <p className="trust-text">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
