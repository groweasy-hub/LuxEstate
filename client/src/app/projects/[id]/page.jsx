import { notFound } from "next/navigation";
import ProjectDetail from "@/components/projects/ProjectDetail";
import { getProjectById, getAllProjects } from "@/lib/data/projects";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";

export const dynamic = "force-dynamic";

// ─── Dynamic metadata ──────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | ${project.location}, ${project.city} | Real Estate`,
    description:
      project.description?.slice(0, 160) ||
      `Explore ${project.title} — ${project.beds} BHK luxury residences in ${project.location}, ${project.city}. Starting from ${project.priceLabel}.`,
    openGraph: {
      images: project.images?.[0] ? [{ url: project.images[0] }] : [],
    },
  };
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function ProjectDetailPage({ params }) {
  const { id } = await params;
  const [project, allProjects] = await Promise.all([
    getProjectById(id),
    getAllProjects(),
  ]);

  if (!project) notFound();

  return (
    <>
      <ProjectDetail project={project} allProjects={allProjects} />
      <FloatingWhatsApp
        message={`Hi, I'm interested in ${project.title}. Please share more details.`}
      />
    </>
  );
}
