"use client";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

export default function PriceTable({ rows = [], showDisclaimer = true }) {
  if (!rows.length) return null;

  return (
    <div>
      {showDisclaimer && (
        <div
          className="flex items-start gap-2"
          style={{
            marginBottom: "var(--space-4)",
            padding: "var(--space-3) var(--space-4)",
            borderRadius: "var(--radius-md)",
            background: "rgba(201,168,76,0.06)",
            border: "1px solid var(--border-gold)",
          }}
        >
          <Info
            size={14}
            color="var(--color-gold)"
            style={{ flexShrink: 0, marginTop: 2 }}
          />
          <span
            className="small"
            style={{ color: "var(--text-muted)", lineHeight: 1.5 }}
          >
            Prices shown are indicative. Additional charges such as PLC, car
            parking, club membership, and registration may apply. Please contact
            our team for a detailed cost sheet.
          </span>
        </div>
      )}

      <div
        style={{
          overflowX: "auto",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                background: "var(--surface-elevated)",
                borderBottom: "1px solid var(--border-default)",
              }}
            >
              {[
                "Configuration",
                "Area (sq.ft)",
                "Floor Range",
                "Price (₹)",
                "Status",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "var(--space-3) var(--space-4)",
                    textAlign: "left",
                    fontSize: "var(--text-xs)",
                    letterSpacing: "var(--tracking-wider)",
                    textTransform: "uppercase",
                    color: "var(--color-gold)",
                    fontWeight: "var(--weight-medium)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <motion.tr
                key={`${row.config}-${i}`}
                style={{
                  borderBottom: "1px solid var(--border-subtle)",
                  transition: "background var(--transition-fast)",
                }}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--surface-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <td
                  style={{
                    padding: "var(--space-4)",
                    fontWeight: "var(--weight-medium)",
                    color: "var(--text-primary)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.config}
                </td>
                <td
                  style={{
                    padding: "var(--space-4)",
                    color: "var(--text-secondary)",
                    fontSize: "var(--text-sm)",
                  }}
                >
                  {row.area}
                </td>
                <td
                  style={{
                    padding: "var(--space-4)",
                    color: "var(--text-secondary)",
                    fontSize: "var(--text-sm)",
                  }}
                >
                  {row.floor}
                </td>
                <td
                  style={{
                    padding: "var(--space-4)",
                    color: "var(--color-gold)",
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--text-lg)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.price}
                </td>
                <td style={{ padding: "var(--space-4)" }}>
                  <span
                    className={`badge ${
                      row.status === "Available"
                        ? "badge-green"
                        : row.status === "Limited"
                          ? "badge-gold"
                          : "badge-red"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
