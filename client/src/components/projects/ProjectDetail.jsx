"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ProjectSummary from "./ProjectSummary";
import ProjectGallery from "./ProjectGallery";
import DetailSections from "./DetailSections";
import StickyLeadForm from "./StickyLeadForm";
import LocationMap from "./LocationMap";
import BuilderInfo from "./BuilderInfo";
import UrgencyCTA from "./UrgencyCTA";
import RelatedProjects from "./RelatedProjects";

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ProjectDetail({ project, allProjects = [] }) {
  const router = useRouter();
  const galleryImages =
    project?.images?.filter(Boolean)?.length > 0
      ? project.images.filter(Boolean)
      : project?.img
        ? [project.img]
        : [];

  if (!project) return null;

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      style={{
        paddingTop: "var(--space-6)",
        paddingBottom: "var(--space-24)",
      }}
    >
      <div className="container" style={{ paddingTop: "var(--space-12)" }}>
        <motion.button
          type="button"
          onClick={() => {
            if (window.history.length > 1) router.back();
            else router.push("/projects");
          }}
          className="btn btn-sm"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-2)",
            marginBottom: "var(--space-8)",
            color: "var(--color-gold)",
            border: "1px solid var(--border-gold-strong)",
            background: "rgba(201,168,76,0.06)",
          }}
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowLeft size={14} />
          Back
        </motion.button>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          style={{ marginBottom: "var(--space-10)" }}
        >
          <ProjectSummary project={project} />
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 380px",
            gap: "var(--space-10)",
            alignItems: "stretch",
          }}
          className="detail-layout"
        >
          <div
            className="stack"
            style={{ gap: "var(--space-16)", alignSelf: "start" }}
          >
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <ProjectGallery images={galleryImages} title={project.title} />
            </motion.div>

            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div style={{ marginBottom: "var(--space-6)" }}>
                <div
                  className="section-label"
                  style={{ marginBottom: "var(--space-3)" }}
                >
                  <span>Full Details</span>
                </div>
                <h2>About {project.title}</h2>
              </div>
              <DetailSections project={project} />
            </motion.div>

            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div style={{ marginBottom: "var(--space-6)" }}>
                <div
                  className="section-label"
                  style={{ marginBottom: "var(--space-3)" }}
                >
                  <span>Connectivity</span>
                </div>
                <h2>Location &amp; Landmarks</h2>
              </div>
              <LocationMap project={project} />
            </motion.div>

            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div style={{ marginBottom: "var(--space-6)" }}>
                <div
                  className="section-label"
                  style={{ marginBottom: "var(--space-3)" }}
                >
                  <span>Developer</span>
                </div>
                <h2>About the Builder</h2>
              </div>
              <BuilderInfo builder={project.builderInfo} />
            </motion.div>
          </div>

          <div
            className="detail-sidebar"
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-6)",
              alignSelf: "stretch",
            }}
          >
            <StickyLeadForm project={project} />
            <div
              className="urgency-sticky"
              style={{
                position: "sticky",
                top: "calc(var(--nav-height) + var(--space-4))",
              }}
            >
              <UrgencyCTA
                unitsLeft={project.unitsLeft || 7}
                project={project}
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: "var(--space-20)" }}>
          <RelatedProjects projects={allProjects} currentId={project.id} />
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .detail-layout {
            grid-template-columns: 1fr !important;
          }

          .detail-sidebar {
            position: static !important;
            align-self: auto !important;
          }

          .urgency-sticky {
            position: static !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
