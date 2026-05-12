"use client";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import EmptyState from "./EmptyState";
import LoadMore from "./LoadMore";
import InlineCTA from "./InlineCTA";

// ─── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="card overflow-hidden" style={{ padding: 0 }}>
      <div className="skeleton" style={{ height: 230 }} />
      <div style={{ padding: "var(--space-5)" }} className="stack-sm">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-text" style={{ width: "60%" }} />
        <div className="skeleton skeleton-text" style={{ width: "80%" }} />
        <div
          className="skeleton skeleton-text"
          style={{ width: "40%", marginTop: "var(--space-2)" }}
        />
      </div>
    </div>
  );
}

// ─── ProjectGrid ───────────────────────────────────────────────────────────────
export default function ProjectGrid({
  projects,
  loading,
  onClear,
  onLoadMore,
  hasMore,
  loadingMore = false,
  ctaEvery = 6, // inject InlineCTA after every N cards
}) {
  // Loading skeleton
  if (loading) {
    return (
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "var(--space-6)",
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  // Empty state
  if (!projects.length) {
    return (
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "var(--space-6)",
        }}
      >
        <EmptyState onClear={onClear} />
      </div>
    );
  }

  // Build items array with CTA injected at intervals
  const items = [];
  projects.forEach((project, i) => {
    items.push({ type: "card", project, index: i });
    if ((i + 1) % ctaEvery === 0 && i < projects.length - 1) {
      items.push({ type: "cta", id: `cta-${i}` });
    }
  });

  return (
    <>
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "var(--space-6)",
        }}
      >
        <AnimatePresence mode="popLayout">
          {items.map((item) =>
            item.type === "cta" ? (
              <InlineCTA key={item.id} />
            ) : (
              <ProjectCard
                key={item.project.id}
                project={item.project}
                index={item.index % 6}
              />
            ),
          )}
        </AnimatePresence>
      </div>

      {/* Load more */}
      <LoadMore onLoad={onLoadMore} hasMore={hasMore} loading={loadingMore} />
    </>
  );
}
