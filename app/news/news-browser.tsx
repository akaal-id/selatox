"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NewsCard } from "@/components/newscard/newscard";
import { Button } from "@/components/ui/Button";
import { SelectForm } from "@/components/ui/selectform/selectform";
import {
  NEWS_PAGE_SIZE,
  getNewsHref,
  newsArticles,
  newsPage,
  type NewsCategory,
} from "@/constants/news";
import styles from "./news.module.css";

const ALL = "All";

type FilterState = {
  query: string;
  category: NewsCategory | typeof ALL;
  year: string;
};

const INITIAL_FILTERS: FilterState = {
  query: "",
  category: ALL,
  year: ALL,
};

function uniqueValues(values: string[]) {
  return [ALL, ...Array.from(new Set(values)).sort((a, b) => {
    if (a === ALL || b === ALL) return 0;
    return Number(b) - Number(a);
  })];
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

const categoryOptions = uniqueValues(
  newsArticles.map((article) => article.category) as string[]
) as (NewsCategory | typeof ALL)[];

const yearOptions = uniqueValues(
  newsArticles.map((article) => String(article.publishedYear))
);

export function NewsBrowser() {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [page, setPage] = useState(1);

  const filteredArticles = useMemo(() => {
    const normalized = filters.query.trim().toLowerCase();

    return newsArticles.filter((article) => {
      const matchesCategory =
        filters.category === ALL || article.category === filters.category;
      const matchesYear =
        filters.year === ALL ||
        String(article.publishedYear) === filters.year;

      const searchable = [
        article.title,
        article.category,
        article.date,
        String(article.publishedYear),
        article.bodyHtml.replace(/<[^>]*>/g, " "),
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = !normalized || searchable.includes(normalized);

      return matchesCategory && matchesYear && matchesQuery;
    });
  }, [filters]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredArticles.length / NEWS_PAGE_SIZE)
  );

  const paginatedArticles = useMemo(() => {
    const start = (page - 1) * NEWS_PAGE_SIZE;
    return filteredArticles.slice(start, start + NEWS_PAGE_SIZE);
  }, [filteredArticles, page]);

  const rangeStart =
    filteredArticles.length === 0
      ? 0
      : (page - 1) * NEWS_PAGE_SIZE + 1;
  const rangeEnd = Math.min(
    page * NEWS_PAGE_SIZE,
    filteredArticles.length
  );

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
      aria-labelledby="news-heading"
      data-navbar="default"
    >
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1 id="news-heading" className={styles.title}>
            {newsPage.title}
          </h1>
          <p className={styles.subtitle}>{newsPage.subtitle}</p>
        </header>

        <div className={styles.toolbar} role="search">
          <label className={styles.field}>
            <span className={styles.label}>Search</span>
            <input
              type="search"
              value={filters.query}
              onChange={(event) => updateFilter("query", event.target.value)}
              placeholder="Search by headline, topic, or keyword"
              className={styles.searchInput}
            />
          </label>

          <SelectForm
            className={styles.field}
            label="Category"
            value={filters.category}
            onChange={(next) =>
              updateFilter("category", next as FilterState["category"])
            }
            options={categoryOptions.map((option) => ({
              label: option,
              value: option,
            }))}
            variant="pill"
          />

          <SelectForm
            className={styles.field}
            label="Year"
            value={filters.year}
            onChange={(next) => updateFilter("year", next)}
            options={yearOptions.map((option) => ({
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
          {filteredArticles.length === 0 ? (
            "0 articles found"
          ) : (
            <>
              Showing {rangeStart}&ndash;{rangeEnd} of {filteredArticles.length}{" "}
              {filteredArticles.length === 1 ? "article" : "articles"}
            </>
          )}
        </p>

        {filteredArticles.length > 0 ? (
          <>
            <ul className={styles.newsGrid}>
              {paginatedArticles.map((article) => (
                <li key={article.id} className={styles.newsGridItem}>
                  <NewsCard
                    article={article}
                    onReadArticle={() => router.push(getNewsHref(article.slug))}
                  />
                </li>
              ))}
            </ul>

            {totalPages > 1 ? (
              <nav
                className={styles.pagination}
                aria-label="News pagination"
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
            No articles matched your current search and filter selection.
          </p>
        )}
      </div>
    </section>
  );
}
