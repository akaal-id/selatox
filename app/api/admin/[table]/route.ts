import { NextResponse } from "next/server";
import { getCmsTable } from "@/lib/admin/cms-tables";
import {
  collectionUsesGeneratedId,
  getCollectionCreateDefaults,
} from "@/lib/cms/collection-defaults";
import {
  getSingletonRow,
  insertCollectionRow,
  updateSingletonRow,
} from "@/lib/cms/repository";

type RouteProps = { params: Promise<{ table: string }> };

export async function GET(_request: Request, { params }: RouteProps) {
  const { table } = await params;
  const config = getCmsTable(table);
  if (!config || config.kind !== "singleton" || table === "home") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const result = await getSingletonRow(config.table);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ data: result.data });
}

export async function POST(_request: Request, { params }: RouteProps) {
  const { table } = await params;
  const config = getCmsTable(table);
  if (!config || config.kind !== "collection") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = getCollectionCreateDefaults(config.table);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unsupported collection." },
      { status: 400 }
    );
  }

  if (collectionUsesGeneratedId(config.table)) {
    delete payload.id;
  }

  const result = await insertCollectionRow(config.table, payload);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ data: result.data }, { status: 201 });
}

export async function PUT(request: Request, { params }: RouteProps) {
  const { table } = await params;
  const config = getCmsTable(table);
  if (!config || config.kind !== "singleton" || table === "home") {
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

  const result = await updateSingletonRow(config.table, body as Record<string, unknown>);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ data: result.data });
}
