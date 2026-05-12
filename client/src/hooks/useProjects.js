"use client";

import { useProjectFilters } from "@/components/projects/ProjectFilters";

export function useProjects(allProjects = []) {
  return useProjectFilters(allProjects);
}
