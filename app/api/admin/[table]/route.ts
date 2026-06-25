import { NextResponse } from "next/server";
import { getCmsTable } from "@/lib/admin/cms-tables";
import { getSingletonRow, updateSingletonRow } from "@/lib/cms/repository";

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
