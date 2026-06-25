import { NextResponse } from "next/server";
import { getCmsTable } from "@/lib/admin/cms-tables";
import {
  deleteCollectionRow,
  getCollectionRow,
  updateCollectionRow,
} from "@/lib/cms/repository";

type RouteProps = { params: Promise<{ table: string; id: string }> };

export async function GET(_request: Request, { params }: RouteProps) {
  const { table, id } = await params;
  const config = getCmsTable(table);
  if (!config || config.kind !== "collection") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const result = await getCollectionRow(config.table, decodeURIComponent(id));
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ data: result.data });
}

export async function PUT(request: Request, { params }: RouteProps) {
  const { table, id } = await params;
  const config = getCmsTable(table);
  if (!config || config.kind !== "collection") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const result = await updateCollectionRow(
    config.table,
    decodeURIComponent(id),
    body as Record<string, unknown>
  );
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ data: result.data });
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  const { table, id } = await params;
  const config = getCmsTable(table);
  if (!config || config.kind !== "collection") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const result = await deleteCollectionRow(config.table, decodeURIComponent(id));
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
