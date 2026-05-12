"use client";
import { useState, useMemo, useCallback } from "react";

// ─── Constants ─────────────────────────────────────────────────────────────────
export const LOCATIONS = [
  "All",
  "Hyderabad",
  "Bangalore",
  "Mumbai",
  "Pune",
  "Chennai",
  "Delhi",
];
export const TYPES = [
  "All",
  "Apartment",
  "Villa",
  "Plot",
  "Penthouse",
  "Studio",
];
export const SORT_OPTIONS = [
  { value: "relevance", label: "Most Relevant" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "area-asc", label: "Area: Small to Large" },
  { value: "area-desc", label: "Area: Large to Small" },
];

const DEFAULT_FILTERS = {
  location: "All",
  type: "All",
  status: "All",
  budget: [0, 150000000],
};

// ─── useProjectFilters hook ────────────────────────────────────────────────────
export function useProjectFilters(allProjects = []) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 9;

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }, []);

  const isFiltered =
    filters.location !== "All" ||
    filters.type !== "All" ||
    filters.status !== "All" ||
    filters.budget[1] < 150000000;

  // Filter logic
  const filtered = useMemo(() => {
    return allProjects.filter((p) => {
      if (filters.location !== "All" && p.city !== filters.location)
        return false;
      if (filters.type !== "All" && p.type !== filters.type) return false;
      if (filters.status !== "All" && p.status !== filters.status) return false;
      if (p.priceValue > filters.budget[1]) return false;
      return true;
    });
  }, [allProjects, filters]);

  // Sort logic
  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sort) {
      case "price-asc":
        return arr.sort((a, b) => (a.priceValue || 0) - (b.priceValue || 0));
      case "price-desc":
        return arr.sort((a, b) => (b.priceValue || 0) - (a.priceValue || 0));
      case "newest":
        return arr.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      case "area-asc":
        return arr.sort((a, b) => (a.areaValue || 0) - (b.areaValue || 0));
      case "area-desc":
        return arr.sort((a, b) => (b.areaValue || 0) - (a.areaValue || 0));
      default:
        return arr.sort(
          (a, b) =>
            (b.badge === "Featured" ? 1 : 0) - (a.badge === "Featured" ? 1 : 0),
        );
    }
  }, [filtered, sort]);

  // Pagination
  const paginated = useMemo(
    () => sorted.slice(0, page * PAGE_SIZE),
    [sorted, page],
  );
  const hasMore = paginated.length < sorted.length;

  const loadMore = useCallback(() => setPage((p) => p + 1), []);

  return {
    filters,
    sort,
    setSort,
    updateFilter,
    clearFilters,
    isFiltered,
    projects: paginated,
    total: sorted.length,
    hasMore,
    loadMore,
  };
}

// ─── Default export: a thin wrapper used in the page ─────────────────────────
export default function ProjectFilters({ children, allProjects }) {
  const filterState = useProjectFilters(allProjects);
  return children(filterState);
}
