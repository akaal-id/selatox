"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { JobCard } from "@/components/jobcard/jobcard";
import { Button } from "@/components/ui/Button";
import { SelectForm } from "@/components/ui/selectform/selectform";
import {
  jobListings,
  OPPORTUNITIES_PAGE_SIZE,
  opportunitiesPage,
  type JobStatus,
} from "@/constants/opportunities";
import styles from "./opportunities.module.css";

const ALL = "All";

type FilterState = {
  query: string;
  status: JobStatus | typeof ALL;
  location: string;
  category: string;
  experienceLevel: string;
};

const INITIAL_FILTERS: FilterState = {
  query: "",
  status: ALL,
  location: ALL,
  category: ALL,
  experienceLevel: ALL,
};

function uniqueValues(values: string[]) {
  return [ALL, ...Array.from(new Set(values)).sort()];
}

function getPaginationItems(
  current: number,
  total: number
): Array<number | "ellipsis"> {
  if (total <= 5) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const items: Array<number | "ellipsis"> = [1];

  if (current > 3) {
    items.push("ellipsis");
  }

  const rangeStart = Math.max(2, current - 1);
  const rangeEnd = Math.min(total - 1, current + 1);

  for (let pageNumber = rangeStart; pageNumber <= rangeEnd; pageNumber += 1) {
    items.push(pageNumber);
  }

  if (current < total - 2) {
    items.push("ellipsis");
  }

  if (total > 1) {
    items.push(total);
  }

  return items;
}

const statusOptions = uniqueValues(
  jobListings.map((job) => job.status) as string[]
) as (JobStatus | typeof ALL)[];

const locationOptions = uniqueValues(jobListings.map((job) => job.location));
const categoryOptions = uniqueValues(jobListings.map((job) => job.category));
const experienceOptions = uniqueValues(
  jobListings.map((job) => job.experienceLevel)
);

export function OpportunitiesBrowser() {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [page, setPage] = useState(1);

  const filteredJobs = useMemo(() => {
    const normalized = filters.query.trim().toLowerCase();

    return jobListings.filter((job) => {
      const matchesStatus =
        filters.status === ALL || job.status === filters.status;
      const matchesLocation =
        filters.location === ALL || job.location === filters.location;
      const matchesCategory =
        filters.category === ALL || job.category === filters.category;
      const matchesExperience =
        filters.experienceLevel === ALL ||
        job.experienceLevel === filters.experienceLevel;

      const searchable = [
        job.title,
        job.location,
        job.category,
        job.experienceLevel,
        job.status,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = !normalized || searchable.includes(normalized);

      return (
        matchesStatus &&
        matchesLocation &&
        matchesCategory &&
        matchesExperience &&
        matchesQuery
      );
    });
  }, [filters]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredJobs.length / OPPORTUNITIES_PAGE_SIZE)
  );

  const paginatedJobs = useMemo(() => {
    const start = (page - 1) * OPPORTUNITIES_PAGE_SIZE;
    return filteredJobs.slice(start, start + OPPORTUNITIES_PAGE_SIZE);
  }, [filteredJobs, page]);

  const rangeStart =
    filteredJobs.length === 0 ? 0 : (page - 1) * OPPORTUNITIES_PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * OPPORTUNITIES_PAGE_SIZE, filteredJobs.length);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => setFilters(INITIAL_FILTERS);

  const goToPage = (next: number) => {
    setPage(Math.min(Math.max(1, next), totalPages));
  };

  const paginationItems = useMemo(() => {
    return getPaginationItems(page, totalPages);
  }, [page, totalPages]);

  return (
    <section
      className={styles.section}
      aria-labelledby="opportunities-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        <h1 id="opportunities-heading" className={styles.title}>
          {opportunitiesPage.title}
        </h1>

        <div className={styles.toolbar} role="search">
          <label className={styles.field}>
            <span className={styles.label}>Search</span>
            <input
              type="search"
              value={filters.query}
              onChange={(event) => updateFilter("query", event.target.value)}
              placeholder="Search by role, location, or department"
              className={styles.searchInput}
            />
          </label>

          <SelectForm
            className={styles.field}
            label="Status"
            value={filters.status}
            onChange={(next) =>
              updateFilter("status", next as FilterState["status"])
            }
            options={statusOptions.map((option) => ({
              label: option,
              value: option,
            }))}
            variant="pill"
          />

          <SelectForm
            className={styles.field}
            label="Location"
            value={filters.location}
            onChange={(next) => updateFilter("location", next)}
            options={locationOptions.map((option) => ({
              label: option,
              value: option,
            }))}
            variant="pill"
          />

          <SelectForm
            className={styles.field}
            label="Job Category"
            value={filters.category}
            onChange={(next) => updateFilter("category", next)}
            options={categoryOptions.map((option) => ({
              label: option,
              value: option,
            }))}
            variant="pill"
          />

          <SelectForm
            className={styles.field}
            label="Experience Level"
            value={filters.experienceLevel}
            onChange={(next) => updateFilter("experienceLevel", next)}
            options={experienceOptions.map((option) => ({
              label: option,
              value: option,
            }))}
            variant="pill"
          />

          <div className={styles.resetWrap}>
            <Button
              type="button"
              variant="border"
              className={styles.resetButton}
              size="sm"
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
          </div>
        </div>

        <p className={styles.resultCount} aria-live="polite">
          {filteredJobs.length === 0 ? (
            "0 roles found"
          ) : (
            <>
              Showing {rangeStart}&ndash;{rangeEnd} of {filteredJobs.length}{" "}
              {filteredJobs.length === 1 ? "role" : "roles"}
            </>
          )}
        </p>

        {filteredJobs.length > 0 ? (
          <>
            <ul className={styles.jobGrid}>
              {paginatedJobs.map((job) => (
                <li key={job.id} className={styles.jobGridItem}>
                  <JobCard
                    job={job}
                    onViewDetails={() =>
                      router.push(`/opportunities/${job.slug}`)
                    }
                    onApply={() =>
                      router.push(`/opportunities/${job.slug}#apply`)
                    }
                  />
                </li>
              ))}
            </ul>

            {totalPages > 1 ? (
              <nav
                className={styles.pagination}
                aria-label="Opportunities pagination"
              >
                <p className={styles.paginationMeta}>
                  Page {page} of {totalPages}
                </p>

                <div className={styles.paginationBar}>
                  <button
                    type="button"
                    className={styles.paginationNav}
                    onClick={() => goToPage(page - 1)}
                    disabled={page <= 1}
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={18} strokeWidth={1.5} aria-hidden />
                    <span>Prev</span>
                  </button>

                  <div
                    className={styles.paginationPages}
                    role="group"
                    aria-label="Page numbers"
                  >
                    {paginationItems.map((item, index) =>
                      item === "ellipsis" ? (
                        <span
                          key={`ellipsis-${index}`}
                          className={styles.paginationEllipsis}
                          aria-hidden
                        >
                          …
                        </span>
                      ) : (
                        <button
                          key={item}
                          type="button"
                          className={`${styles.paginationPage} ${
                            item === page ? styles.paginationPageActive : ""
                          }`.trim()}
                          onClick={() => goToPage(item)}
                          aria-current={item === page ? "page" : undefined}
                          aria-label={`Page ${item}`}
                        >
                          {item}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    type="button"
                    className={styles.paginationNav}
                    onClick={() => goToPage(page + 1)}
                    disabled={page >= totalPages}
                    aria-label="Next page"
                  >
                    <span>Next</span>
                    <ChevronRight size={18} strokeWidth={1.5} aria-hidden />
                  </button>
                </div>
              </nav>
            ) : null}
          </>
        ) : (
          <p className={styles.emptyState}>
            No roles matched your current search and filter selection.
          </p>
        )}
      </div>
    </section>
  );
}
