"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, Info } from "lucide-react";
import AmenitiesGrid from "./AmenitiesGrid";
import { FloorPlansSection, PriceTable } from "./FloorPlans";

// ─── Accordion ────────────────────────────────────────────────────────────────
function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      style={{
        borderBottom: "1px solid var(--border-subtle)",
        paddingBlock: "var(--space-5)",
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex-between"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          padding: 0,
        }}
      >
        <h5 style={{ color: "var(--text-primary)" }}>{title}</h5>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} color="var(--text-muted)" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingTop: "var(--space-5)" }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Overview Section ─────────────────────────────────────────────────────────
export function OverviewSection({ project }) {
  const highlights = project.highlights?.length ? project.highlights : [
    "Premium residences with panoramic city views",
    "RERA approved and legally clear title",
    "World-class amenities across multiple towers",
    "Strategic location with excellent connectivity",
    "Smart home automation features in every unit",
    "Green certified building with sustainability features",
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <p
        style={{
          color: "var(--text-secondary)",
          lineHeight: 1.8,
          fontSize: "var(--text-base)",
          marginBottom: "var(--space-6)",
        }}
      >
        {project.description ||
          `${project.title} is a landmark residential development that redefines luxury living. 
          Nestled in the heart of ${project.location}, this project offers an unparalleled lifestyle 
          experience with thoughtfully designed residences that blend contemporary architecture with timeless elegance.`}
      </p>

      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "var(--space-3)",
        }}
      >
        {highlights.map((h, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <CheckCircle2
              size={16}
              color="var(--color-gold)"
              style={{ flexShrink: 0, marginTop: 2 }}
            />
            <span
              className="small"
              style={{ color: "var(--text-secondary)", lineHeight: 1.5 }}
            >
              {h}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ─── Specifications Section ───────────────────────────────────────────────────
export function SpecificationsSection({ specs }) {
  const defaultSpecs = {
    Structure: [
      { label: "Structure", value: "RCC framed structure" },
      { label: "No. of Floors", value: "B+G+40 Floors" },
      { label: "Total Units", value: "480 Apartments" },
    ],
    Flooring: [
      { label: "Living & Dining", value: "Italian Marble / Vitrified Tiles" },
      { label: "Bedrooms", value: "Engineered Wood Flooring" },
      { label: "Kitchen", value: "Anti-skid Ceramic Tiles" },
      { label: "Bathrooms", value: "Premium Imported Tiles" },
    ],
    Kitchen: [
      { label: "Counter Top", value: "Black Granite with SS sink" },
      { label: "Cabinets", value: "Modular kitchen with laminate finish" },
      { label: "Appliances", value: "Provision for chimney and hob" },
    ],
    Doors: [
      { label: "Main Door", value: "8 ft height — solid core flush door" },
      {
        label: "Internal Doors",
        value: "Hollow core flush door with laminate",
      },
      { label: "Windows", value: "UPVC double-glazed with MS grills" },
    ],
    Electrical: [
      { label: "Wiring", value: "Concealed copper wiring with MCB" },
      { label: "Power Backup", value: "100% DG backup for common areas" },
      { label: "Smart Home", value: "Home automation provisions" },
    ],
  };

  const specData = Object.keys(specs || {}).length ? specs : defaultSpecs;

  return (
    <section>
      {Object.entries(specData).map(([category, items], i) => (
        <Accordion key={category} title={category} defaultOpen={i === 0}>
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "var(--space-3)",
            }}
          >
            {items.map((item) => (
              <div
                key={item.label}
                style={{
                  padding: "var(--space-3) var(--space-4)",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--surface-elevated)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <p
                  className="small"
                  style={{
                    color: "var(--text-muted)",
                    marginBottom: "var(--space-1)",
                    fontSize: "var(--text-xs)",
                    textTransform: "uppercase",
                    letterSpacing: "var(--tracking-wide)",
                  }}
                >
                  {item.label}
                </p>
                <p className="small" style={{ color: "var(--text-primary)" }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </Accordion>
      ))}
    </section>
  );
}

// ─── Amenities Detail Section ─────────────────────────────────────────────────
export function AmenitiesDetailSection({ amenities }) {
  return <AmenitiesGrid amenities={amenities} />;
}

// ─── Floor Plans Detail ───────────────────────────────────────────────────────
export function FloorPlansDetail({ plans }) {
  return <FloorPlansSection plans={plans} />;
}

// ─── Pricing Detail ───────────────────────────────────────────────────────────
export function PricingDetail({ rows, note }) {
  return (
    <div>
      <div
        className="flex items-center gap-2"
        style={{
          marginBottom: "var(--space-4)",
          padding: "var(--space-3) var(--space-4)",
          borderRadius: "var(--radius-md)",
          background: "rgba(201,168,76,0.06)",
          border: "1px solid var(--border-gold)",
        }}
      >
        <Info size={14} color="var(--color-gold)" />
        <span className="small" style={{ color: "var(--text-muted)" }}>
          {note ||
            `Prices are inclusive of basic price. Additional charges like PLC, car
          parking, and registration are extra. Contact our sales team for a
          detailed cost sheet.`}
        </span>
      </div>
      <PriceTable rows={rows} />
    </div>
  );
}

// ─── Default export: combines all sections with tabs ─────────────────────────
const TABS = [
  { id: "overview", label: "Overview" },
  { id: "specs", label: "Specifications" },
  { id: "amenities", label: "Amenities" },
  { id: "floorplans", label: "Floor Plans" },
  { id: "pricing", label: "Pricing" },
];

export default function DetailSections({ project }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <section>
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          gap: "var(--space-1)",
          borderBottom: "1px solid var(--border-subtle)",
          marginBottom: "var(--space-8)",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "var(--space-3) var(--space-5)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "var(--text-sm)",
              fontFamily: "var(--font-ui)",
              letterSpacing: "var(--tracking-wide)",
              textTransform: "uppercase",
              color:
                activeTab === tab.id
                  ? "var(--color-gold)"
                  : "var(--text-muted)",
              borderBottom: `2px solid ${activeTab === tab.id ? "var(--color-gold)" : "transparent"}`,
              whiteSpace: "nowrap",
              transition:
                "color var(--transition-fast), border-color var(--transition-fast)",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeTab === "overview" && <OverviewSection project={project} />}
          {activeTab === "specs" && (
            <SpecificationsSection specs={project.specs} />
          )}
          {activeTab === "amenities" && (
            <AmenitiesDetailSection amenities={project.amenities || []} />
          )}
          {activeTab === "floorplans" && (
            <FloorPlansDetail plans={project.floorPlans || []} />
          )}
          {activeTab === "pricing" && (
            <PricingDetail
              rows={project.priceRows || []}
              note={project.pricingNote}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
