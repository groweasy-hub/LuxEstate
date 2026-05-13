"use client";

import { motion } from "framer-motion";
import FilterBar from "@/components/projects/FilterBar";
import ProjectGrid from "@/components/projects/ProjectGrid";
import {
  LOCATIONS,
  SORT_OPTIONS,
  TYPES,
  useProjectFilters,
} from "@/components/projects/ProjectFilters";
import SortDropdown from "@/components/projects/SortDropdown";

export default function ProjectsClient({ initialProjects = [] }) {
  const {
    clearFilters,
    filters,
    hasMore,
    isFiltered,
    loadMore,
    projects,
    setSort,
    sort,
    total,
    updateFilter,
  } = useProjectFilters(initialProjects);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          paddingTop: "calc(var(--nav-height) + var(--space-16))",
          paddingBottom: "var(--space-16)",
          overflow: "hidden",
          background:
            "linear-gradient(180deg, rgba(201,168,76,0.04) 0%, var(--surface-page) 100%)",
        }}
      >
        {/* Background glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 400,
            background:
              "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="container" style={{ position: "relative" }}>
          <motion.div
            className="text-center"
            style={{ maxWidth: 720, margin: "0 auto" }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="section-label"
              style={{ justifyContent: "center", marginBottom: "var(--space-5)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <span>Premium Properties</span>
            </motion.div>

            <motion.h1
              style={{ marginBottom: "var(--space-5)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Explore{" "}
              <span className="text-gradient-gold">Luxury Homes</span>
              <br />
              Across India
            </motion.h1>

            <motion.p
              className="lead"
              style={{
                color: "var(--text-secondary)",
                maxWidth: 560,
                margin: "0 auto var(--space-8)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              Browse curated apartments, villas, plots, and penthouses with
              transparent pricing and detailed project insights.
            </motion.p>

            <motion.div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-3)",
                padding: "var(--space-3) var(--space-6)",
                borderRadius: "var(--radius-full)",
                background: "rgba(201,168,76,0.08)",
                border: "1px solid var(--border-gold)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--color-gold)",
                  display: "block",
                  boxShadow: "0 0 8px rgba(201,168,76,0.6)",
                }}
              />
              <span
                style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--text-secondary)",
                  fontFamily: "var(--font-ui)",
                }}
              >
                Showing{" "}
                <strong style={{ color: "var(--color-gold)" }}>
                  {projects.length}
                </strong>{" "}
                of{" "}
                <strong style={{ color: "var(--text-primary)" }}>{total}</strong>{" "}
                properties
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Filter Bar ───────────────────────────────────────── */}
      <FilterBar
        filters={filters}
        updateFilter={updateFilter}
        clearFilters={clearFilters}
        isFiltered={isFiltered}
        LOCATIONS={LOCATIONS}
        TYPES={TYPES}
      />

      {/* ── Grid Section ─────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: "var(--space-10)" }}>
        <div className="container">
          <motion.div
            className="flex-between flex-wrap gap-4"
            data-project-toolbar
            style={{ marginBottom: "var(--space-8)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <p className="overline" style={{ marginBottom: "var(--space-1)" }}>
                Curated Collection
              </p>
              <h2 style={{ marginBottom: 0 }}>Available Properties</h2>
            </div>
            <div data-project-sort>
              <SortDropdown sort={sort} setSort={setSort} options={SORT_OPTIONS} />
            </div>
          </motion.div>

          <ProjectGrid
            projects={projects}
            total={total}
            loading={false}
            onClear={clearFilters}
            onLoadMore={loadMore}
            hasMore={hasMore}
          />
        </div>
      </section>
    </>
  );
}
