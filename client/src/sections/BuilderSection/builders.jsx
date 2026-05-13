"use client";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const builders = [
  { name: "Lodha Group", logo: "/images/lodha.png" },
  { name: "Godrej Properties", logo: "/images/godrej.png" },
  { name: "Oberoi Realty", logo: "/images/oberoi.png" },
  { name: "Hiranandani", logo: "/images/hiranandani.png" },
  { name: "Piramal Realty", logo: "/images/piramal.png" },
  { name: "Rustomjee", logo: "/images/rustomjee.png" },
];

export default function BuilderSection() {
  const headingRef = useInViewAnimation();
  const gridRef = useInViewAnimation();

  return (
    <section
      className="section-sm"
      style={{
        background: "var(--surface-base)",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      <div className="container">
        <div ref={headingRef} data-reveal className="text-center mb-10">
          <div className="section-label" style={{ justifyContent: "center" }}>
            <span>Our Partners</span>
          </div>
          <h3 style={{ marginBottom: "var(--space-10)" }}>
            Trusted Builder Network
          </h3>
        </div>

        <div
          ref={gridRef}
          data-stagger
          className="grid builder-grid"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "var(--space-4)",
          }}
        >
          {builders.map(({ name, logo }) => (
            <div
              key={name}
              className="card builder-card"
              style={{
                padding: "var(--space-5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 90,
                filter: "grayscale(1) brightness(0.7)",
                transition:
                  "filter var(--transition-slow), transform var(--transition-normal), box-shadow var(--transition-normal)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = "grayscale(0) brightness(1)";
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "var(--shadow-card-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = "grayscale(1) brightness(0.7)";
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <img
                src={logo}
                alt={name}
                className="builder-logo"
                style={{
                  maxHeight: 48,
                  maxWidth: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 767px) {
          .builder-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: var(--space-3) !important;
          }

          .builder-card {
            min-height: 78px !important;
            padding: var(--space-4) !important;
            filter: none !important;
            background: var(--surface-card);
          }

          .builder-logo {
            max-height: 36px !important;
          }
        }
      `}</style>
    </section>
  );
}
