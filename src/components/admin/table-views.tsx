import Link from "next/link";
import {
  AdminBadge,
  AdminCard,
  formatCellValue,
  isRichTextField,
} from "@/components/admin/admin-ui";
import { groupSingletonFields } from "@/lib/admin/cms-tables";

function ValueCell({ fieldKey, value }: { fieldKey: string; value: unknown }) {
  const text = formatCellValue(value);
  const rich = isRichTextField(fieldKey) && text.length > 80;

  if (rich) {
    return (
      <div className="space-y-2">
        <pre className="max-h-40 overflow-auto rounded-lg bg-neutral-50 p-3 text-xs leading-relaxed text-neutral-700 whitespace-pre-wrap break-words">
          {text}
        </pre>
        <details className="text-xs text-neutral-500">
          <summary className="cursor-pointer hover:text-neutral-800">Preview HTML</summary>
          <div
            className="prose prose-sm mt-2 max-w-none rounded-lg border border-neutral-200 bg-white p-3"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </details>
      </div>
    );
  }

  if (text.length > 120) {
    return (
      <pre className="max-h-32 overflow-auto whitespace-pre-wrap break-words text-sm text-neutral-800">
        {text}
      </pre>
    );
  }

  return <span className="text-sm text-neutral-800">{text}</span>;
}

export function SingletonTableView({ row }: { row: Record<string, unknown> }) {
  const groups = groupSingletonFields(row);
  const meta = {
    id: row.id,
    is_published: row.is_published,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };

  return (
    <div className="space-y-6">
      <AdminCard className="p-4">
        <div className="flex flex-wrap gap-3 text-sm">
          <div>
            <span className="text-neutral-500">ID </span>
            <span className="font-mono text-neutral-900">{String(meta.id)}</span>
          </div>
          <AdminBadge tone={meta.is_published ? "success" : "warning"}>
            {meta.is_published ? "Published" : "Draft"}
          </AdminBadge>
          {meta.updated_at ? (
            <span className="text-neutral-500">
              Updated {String(meta.updated_at)}
            </span>
          ) : null}
        </div>
      </AdminCard>

      {groups.map(({ group, fields }) => (
        <AdminCard key={group} className="overflow-hidden">
          <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700">
              {group}
            </h2>
          </div>
          <div className="divide-y divide-neutral-100">
            {fields.map((field) => (
              <div
                key={field.key}
                className="grid gap-2 px-4 py-3 md:grid-cols-[220px_1fr]"
              >
                <div>
                  <p className="text-sm font-medium text-neutral-900">{field.label}</p>
                  <p className="mt-0.5 font-mono text-xs text-neutral-400">{field.key}</p>
                </div>
                <ValueCell fieldKey={field.key} value={field.value} />
              </div>
            ))}
          </div>
        </AdminCard>
      ))}
    </div>
  );
}

export function CollectionTableView({
  rows,
  editableSlug,
}: {
  rows: Record<string, unknown>[];
  editableSlug?: string;
}) {
  if (!rows.length) {
    return (
      <AdminCard className="p-8 text-center text-sm text-neutral-500">
        No rows in this table yet.
      </AdminCard>
    );
  }

  const columns = Array.from(
    rows.reduce((set, row) => {
      Object.keys(row).forEach((key) => set.add(key));
      return set;
    }, new Set<string>())
  );

  const priority = [
    "slug",
    "title",
    "status",
    "category",
    "name",
    "year",
    "phase",
    "sort_order",
    "is_published",
  ];
  columns.sort((a, b) => {
    const ai = priority.indexOf(a);
    const bi = priority.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  return (
    <AdminCard className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50">
            <tr>
              {editableSlug ? (
                <th className="whitespace-nowrap px-4 py-3 font-medium text-neutral-600">
                  Edit
                </th>
              ) : null}
              {columns.map((col) => (
                <th
                  key={col}
                  className="whitespace-nowrap px-4 py-3 font-medium text-neutral-600"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {rows.map((row, index) => {
              const rowId = String(row.id ?? row.slug ?? index);
              const title = String(row.title ?? row.slug ?? rowId);

              return (
              <tr key={rowId} className="align-top hover:bg-neutral-50/80">
                {editableSlug ? (
                  <td className="whitespace-nowrap px-4 py-3">
                    <Link
                      href={`/admin/${editableSlug}/${encodeURIComponent(rowId)}`}
                      className="text-sm font-medium text-blue-700 hover:text-blue-900"
                    >
                      Edit
                    </Link>
                  </td>
                ) : null}
                {columns.map((col) => {
                  const value = row[col];
                  const text = formatCellValue(value);
                  const truncated =
                    text.length > 100 ? `${text.slice(0, 100)}…` : text;

                  return (
                    <td key={col} className="max-w-xs px-4 py-3 text-neutral-800">
                      {typeof value === "object" && value !== null ? (
                        <pre className="max-h-24 overflow-auto whitespace-pre-wrap break-words text-xs">
                          {text}
                        </pre>
                      ) : (
                        <span className="break-words" title={text.length > 100 ? text : undefined}>
                          {truncated}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
            })}
          </tbody>
        </table>
      </div>
    </AdminCard>
  );
}
