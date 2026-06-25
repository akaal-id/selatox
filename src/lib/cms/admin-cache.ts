import { cache } from "react";
import { fetchCmsTable } from "@/lib/admin/fetch-table";
import type { CmsTableConfig } from "@/lib/admin/cms-tables";
import { getHomePage } from "@/lib/cms/home-repository";
import { getCollectionRow, getSingletonRow } from "@/lib/cms/repository";

export const getCachedSingletonRow = cache(getSingletonRow);
export const getCachedHomePage = cache(getHomePage);
export const getCachedCollectionRow = cache(getCollectionRow);

export const getCachedCmsTable = cache((config: CmsTableConfig) => fetchCmsTable(config));
