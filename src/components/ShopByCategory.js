import "./ShopByCategory.css";

export default function ShopByCategory() {
  const categories = [
    {
      title: "Metallic Glass Case",
      desc: "Premium metal finish",
      icon: "bi-layers",
    },
    {
      title: "Soft Case",
      desc: "Silky smooth texture",
      icon: "bi-feather",
    },
    {
      title: "Transparent Case",
      desc: "Show off your phone",
      icon: "bi-eye",
    },
    {
      title: "Custom Case",
      desc: "Design your own",
      icon: "bi-palette",
    },
    {
      title: "Combo Deals",
      desc: "Best value bundles",
      icon: "bi-box-seam",
    },
  ];

  return (
    <section className="category-section">
      <h2 className="category-title">Shop by Category</h2>
      <p className="category-subtitle">
        Find the perfect case for your style and protection needs
      </p>

      <div className="category-grid">
        {categories.map((item, index) => (
          <div className="category-card" key={index}>
            <div className="category-icon">
              <i className={`bi ${item.icon}`}></i>
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
