import "./ProductComparison.css";

export default function ProductComparison() {
  return (
    <section className="comparison-section">
      <h2 className="comparison-title">Compare Our Cases</h2>
      <p className="comparison-subtitle">
        Find the perfect case that matches your needs
      </p>

      <div className="comparison-table">
        {/* Header */}
        <div className="comparison-row header">
          <div className="cell feature">Feature</div>

          <div className="cell highlight">
            <span className="recommended">★ Recommended</span>
            Metal Case
          </div>

          <div className="cell">Soft Case</div>
        </div>

        {/* Rows */}
        <div className="comparison-row">
          <div className="cell feature">Printing Type</div>
          <div className="cell highlight-text" data-label="Metal Case">UV HD Print</div>
          <div className="cell muted" data-label="Soft Case">Sublimation Print</div>
        </div>

        <div className="comparison-row">
          <div className="cell feature">Protection Level</div>
          <div className="cell highlight-text">Maximum</div>
          <div className="cell muted">Medium</div>
        </div>

        <div className="comparison-row">
          <div className="cell feature">Drop Test</div>
          <div className="cell highlight-text">6ft tested</div>
          <div className="cell muted">4ft tested</div>
        </div>

        <div className="comparison-row">
          <div className="cell feature">Wireless Charging</div>
          <div className="cell">
            <span className="check">✔</span>
          </div>
          <div className="cell">
            <span className="check">✔</span>
          </div>
        </div>

        <div className="comparison-row">
          <div className="cell feature">Material</div>
          <div className="cell highlight-text">Aluminum + Glass</div>
          <div className="cell muted">Silicone TPU</div>
        </div>

        <div className="comparison-row">
          <div className="cell feature">Weight</div>
          <div className="cell highlight-text">35g</div>
          <div className="cell muted">20g</div>
        </div>

        <div className="comparison-row">
          <div className="cell feature">Grip</div>
          <div className="cell highlight-text">Good</div>
          <div className="cell muted">Excellent</div>
        </div>

        <div className="comparison-row">
          <div className="cell feature">Scratch Resistant</div>
          <div className="cell">
            <span className="check">✔</span>
          </div>
          <div className="cell">
            <span className="cross">✕</span>
          </div>
        </div>
      </div>
    </section>
  );
}
