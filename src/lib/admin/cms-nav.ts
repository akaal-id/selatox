import {
  HOME_CMS_SECTIONS,
  getHomeCmsSection,
  HOME_ADMIN_HREF,
  getHomeSectionAdminHref,
} from "@/lib/cms/home";
import { CMS_TABLES, getCmsTable, type CmsTableConfig } from "@/lib/admin/cms-tables";
import {
  getPageDefaultAdminHref,
  getPageNavSections,
  getPageSection,
  getPageSectionsConfig,
  isStandaloneCollectionSlug,
} from "@/lib/cms/page-sections";

export const CMS_EDITOR_SLUGS = new Set([
  "home",
  "about",
  "contact",
  "our_business",
  "manufacturing",
  "journey",
  "ethics",
  "newsroom",
  "openings",
  "products",
  "news",
  "careers",
  "rnd",
  "roadmap",
]);

export function getAdminHref(slug: string): string {
  if (slug === "home") return HOME_ADMIN_HREF;
  if (slug === "roadmap") return "/admin/about/roadmap";
  const pageSections = getPageSectionsConfig(slug);
  if (pageSections) return getPageDefaultAdminHref(slug);
  return `/admin/${slug}`;
}

export function isCmsEditor(slug: string): boolean {
  return CMS_EDITOR_SLUGS.has(slug);
}

export function getHomeNavSections() {
  return HOME_CMS_SECTIONS.map((section) => ({
    id: section.id,
    title: section.title,
    href: getHomeSectionAdminHref(section.id),
  }));
}

const OTHER_SINGLETON_SLUGS = new Set(["contact"]);

export function getCmsNavGroups(): {
  pages: CmsTableConfig[];
  other: CmsTableConfig[];
} {
  const singletons = CMS_TABLES.filter(
    (table) => table.kind === "singleton" && table.slug !== "home"
  );
  const collections = CMS_TABLES.filter(
    (table) => table.kind === "collection" && isStandaloneCollectionSlug(table.slug)
  );

  return {
    pages: singletons.filter((table) => !OTHER_SINGLETON_SLUGS.has(table.slug)),
    other: [
      ...singletons.filter((table) => OTHER_SINGLETON_SLUGS.has(table.slug)),
      ...collections,
    ],
  };
}

export function getAdminPageMeta(pathname: string): {
  title: string;
  description?: string;
  slug?: string;
  sectionId?: string;
  parentSlug?: string;
  parentTitle?: string;
} {
  if (pathname === "/admin" || pathname === "/admin/") {
    return {
      title: "Dashboard",
      description: "Manage page copy and collections.",
    };
  }

  const homeSectionMatch = pathname.match(/^\/admin\/home\/([^/]+)/);
  if (homeSectionMatch) {
    const section = getHomeCmsSection(homeSectionMatch[1]);
    return {
      title: section?.title ?? "Home section",
      description: section?.description,
      slug: "home",
      sectionId: homeSectionMatch[1],
      parentSlug: "home",
      parentTitle: "Home",
    };
  }

  if (pathname === "/admin/home" || pathname === "/admin/home/") {
    return {
      title: "Home",
      description: "Landing page sections",
      slug: "home",
    };
  }

  const nestedItemMatch = pathname.match(/^\/admin\/([^/]+)\/([^/]+)\/([^/]+)/);
  if (nestedItemMatch) {
    const [, pageSlug, sectionId] = nestedItemMatch;
    const pageConfig = getPageSectionsConfig(pageSlug);
    const section = getPageSection(pageSlug, sectionId);
    const collectionConfig = section?.collectionSlug
      ? getCmsTable(section.collectionSlug)
      : undefined;

    if (pageConfig && section?.collectionSlug) {
      return {
        title: "Edit entry",
        slug: section.collectionSlug,
        sectionId,
        parentSlug: pageSlug,
        parentTitle: pageConfig.label,
      };
    }

    if (collectionConfig) {
      return {
        title: collectionConfig.label,
        slug: collectionConfig.slug,
      };
    }
  }

  const pageSectionMatch = pathname.match(/^\/admin\/([^/]+)\/([^/]+)/);
  if (pageSectionMatch) {
    const [, pageSlug, sectionId] = pageSectionMatch;
    const pageConfig = getPageSectionsConfig(pageSlug);
    const section = getPageSection(pageSlug, sectionId);

    if (pageConfig && section) {
      return {
        title: section.title,
        description: section.description,
        slug: pageSlug,
        sectionId,
        parentSlug: pageSlug,
        parentTitle: pageConfig.label,
      };
    }

    const collectionConfig = getCmsTable(pageSlug);
    if (collectionConfig?.kind === "collection") {
      return {
        title: "Edit entry",
        slug: pageSlug,
        parentSlug: pageSlug,
        parentTitle: collectionConfig.label,
      };
    }
  }

  const match = pathname.match(/^\/admin\/([^/]+)/);
  if (!match) {
    return { title: "Content" };
  }

  const config = getCmsTable(match[1]);
  if (!config) {
    return { title: "Content" };
  }

  return {
    title: config.label,
    description: config.description,
    slug: config.slug,
  };
}
