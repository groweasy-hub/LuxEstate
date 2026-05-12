import { Suspense } from "react";
import ProjectsClient from "./ProjectsClient";
import { getAllProjects } from "@/lib/data/projects";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Explore Premium Properties | Real Estate",
  description:
    "Discover luxury apartments, villas, and plots across India. Filter by location, budget, and configuration to find your dream home.",
};

// Fetch all projects server-side
async function getProjects() {
  // Replace with your actual data source (DB, API, CMS)
  return getAllProjects();
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <Suspense fallback={<ProjectsPageSkeleton />}>
      <ProjectsClient initialProjects={projects} />
    </Suspense>
  );
}

function ProjectsPageSkeleton() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="skeleton" style={{ height: 200, borderRadius: 0 }} />
      <div
        style={{ height: 68, borderBottom: "1px solid var(--border-subtle)" }}
        className="skeleton"
      />
      <div
        className="container"
        style={{
          paddingTop: "var(--space-10)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "var(--space-6)",
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card overflow-hidden" style={{ padding: 0 }}>
            <div className="skeleton" style={{ height: 230 }} />
            <div style={{ padding: "var(--space-5)" }} className="stack-sm">
              <div className="skeleton skeleton-title" />
              <div
                className="skeleton skeleton-text"
                style={{ width: "60%" }}
              />
              <div
                className="skeleton skeleton-text"
                style={{ width: "80%" }}
              />
              <div
                className="skeleton skeleton-text"
                style={{ width: "40%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
