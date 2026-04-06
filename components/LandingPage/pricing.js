"use client";

export default function PricingComparison() {
  return (
    <section className="pricing-section">
      <h2 className="title reg-font">
        Lowest prices in the <span>UK.</span>
      </h2>
      <p className="subtitle reg-font">
        Same UK regulation. Same clinical standards. Better prices.
      </p>

      {/* Scroll hint visible on mobile only */}
      <p className="scroll-hint reg-font">← Swipe to compare →</p>

      {/* Scrollable wrapper — active on mobile, plain on desktop */}
      <div className="pricing-scroll-wrapper">
        <div className="pricing-card">
          <div className="center-bg" />

          {/* HEADER */}
          <div className="row header">
            <div className="cell left header-text med-font">Service</div>
            <div className="cell center center-header med-font">
              <p className="center-para">Online Weight Loss Clinic</p>
            </div>
            <div className="cell right header-text med-font">Other Clinics</div>
          </div>

          {/* Row 1 — glass */}
          <div className="row glass-row reg-font">
            <div className="glass-overlay" />
            <div className="cell left">Medical Consultation</div>
            <div className="cell center">Included (£0)</div>
            <div className="cell right">£0–£50</div>
          </div>

          {/* Row 2 — solid */}
          <div className="row reg-font">
            <div className="cell left">Monthly Treatment</div>
            <div className="cell center">From £149</div>
            <div className="cell right">£249–£450</div>
          </div>

          {/* Row 3 — glass */}
          <div className="row glass-row reg-font">
            <div className="glass-overlay" />
            <div className="cell left">Delivery</div>
            <div className="cell center">Free</div>
            <div className="cell right">Free–£9.99</div>
          </div>

          {/* Row 4 — solid */}
          <div className="row reg-font">
            <div className="cell left">Lifestyle Support</div>
            <div className="cell center">Optional (£0)</div>
            <div className="cell right">Bundled £30–£80</div>
          </div>

          {/* Row 5 — glass */}
          <div className="row glass-row reg-font">
            <div className="glass-overlay" />
            <div className="cell left">Total Monthly</div>
            <div className="cell center">From £149</div>
            <div className="cell right">£279–£530</div>
          </div>

          {/* Save row */}
          <div className="row save-row-custom">
            <div className="cell left" />
            <div className="cell center save-cell">
              <p className="save-title med-font">
                Save up to <strong className="semibold-font">£4,572</strong>
              </p>
              <span className="save-sub reg-font">Annually</span>
            </div>
            <div className="cell right" />
          </div>
        </div>
      </div>

      {/* BOTTOM BANNER */}
      <div className="bottom-banner">
        <div className="banner-half reg-font">
          💰 Save <strong className="semibold-font">£130–£381</strong> every
          month
        </div>
        <div className="banner-half right reg-font">
          💰 Save <strong className="semibold-font">£1,560–£4,572</strong> every
          year
        </div>
      </div>

      <div className="lowest-bottom-text reg-font">
        <p className="text-center text-[#585858] mt-12 px-4">
          All UK clinics follow identical GPhC and MHRA standards. The
          medication is the same. The clinical oversight is the same. The
          difference? We operate efficiently without premium markup.
        </p>
        <p className="text-center text-[#585858] mt-8 px-4 lowest-bottom-gphc">
          <span>GPhC Registration: 1039469</span>
        </p>
      </div>
    </section>
  );
}
