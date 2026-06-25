import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  buildStoragePath,
  CMS_MEDIA_BUCKET,
  getPublicMediaUrl,
  sanitizeStorageFolder,
  validateMediaFile,
} from "@/lib/cms/storage";

export async function POST(request: Request) {
  const client = createAdminClient();
  if (!client) {
    return NextResponse.json(
      { error: "Supabase is not configured. Add URL and secret key to .env.local." },
      { status: 500 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload payload." }, { status: 400 });
  }

  const file = formData.get("file");
  const folderRaw = formData.get("folder");
  const kindRaw = formData.get("kind");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  if (typeof folderRaw !== "string" || !folderRaw.trim()) {
    return NextResponse.json({ error: "Upload folder is required." }, { status: 400 });
  }

  const expectedKind =
    kindRaw === "image" || kindRaw === "video" ? kindRaw : undefined;

  const validation = validateMediaFile(file, expectedKind);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const folder = sanitizeStorageFolder(folderRaw);
  const path = buildStoragePath(folder, file.name);
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await client.storage
    .from(CMS_MEDIA_BUCKET)
    .upload(path, buffer, {
      contentType: file.type || undefined,
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    const message = uploadError.message.toLowerCase();

    if (message.includes("bucket") && message.includes("not found")) {
      return NextResponse.json(
        {
          error:
            "Storage bucket not found. Create the uploads bucket in Supabase (see sql/storage.sql).",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: uploadError.message || "Upload failed." },
      { status: 500 }
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_SUPABASE_URL is not configured." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    path,
    url: getPublicMediaUrl(supabaseUrl, path),
    kind: validation.kind,
  });
}
