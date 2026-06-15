import { NextResponse } from "next/server";
import {
  ethicsHotline,
  ethicsReportTypes,
  type EthicsReportType,
} from "@/constants/ethics";
import { submitEthicsReportToAppsScript } from "@/lib/ethics-apps-script";

function isReportType(value: string): value is EthicsReportType {
  return (ethicsReportTypes as readonly string[]).includes(value);
}

function validateDocument(file: File): string | null {
  const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  const validType =
    (ethicsHotline.acceptedDocumentTypes as readonly string[]).includes(
      file.type
    ) ||
    (ethicsHotline.acceptedDocumentExtensions as readonly string[]).includes(
      extension
    );

  if (!validType) {
    return "Upload a PDF, Word, Excel, or image file.";
  }

  if (file.size > ethicsHotline.maxDocumentBytes) {
    return "File must be 20MB or smaller.";
  }

  return null;
}

export async function POST(request: Request) {
  const appsScriptUrl = process.env.ETHICS_APPS_SCRIPT_URL;
  const secret = process.env.ETHICS_FORM_SECRET;

  if (!appsScriptUrl || !secret) {
    return NextResponse.json(
      { ok: false, error: "Ethics report service is not configured." },
      { status: 500 }
    );
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid form submission." },
      { status: 400 }
    );
  }

  const reportType = String(formData.get("reportType") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const incidentDate = String(formData.get("incidentDate") ?? "").trim();
  const departmentOrIndividual = String(
    formData.get("departmentOrIndividual") ?? ""
  ).trim();
  const anonymous = String(formData.get("anonymous") ?? "false") === "true";
  const rawReporterName = String(formData.get("reporterName") ?? "").trim();
  const rawReporterEmail = String(formData.get("reporterEmail") ?? "").trim();
  const reporterName = anonymous
    ? ethicsHotline.anonymousSubmissionValue
    : rawReporterName;
  const reporterEmail = anonymous
    ? ethicsHotline.anonymousSubmissionValue
    : rawReporterEmail;
  const file = formData.get("supportingDocument");

  if (!reportType || !isReportType(reportType)) {
    return NextResponse.json(
      { ok: false, error: "Report type is required." },
      { status: 400 }
    );
  }

  if (!subject) {
    return NextResponse.json(
      { ok: false, error: "Subject is required." },
      { status: 400 }
    );
  }

  if (!description) {
    return NextResponse.json(
      { ok: false, error: "Description is required." },
      { status: 400 }
    );
  }

  if (description.length > ethicsHotline.maxDescriptionChars) {
    return NextResponse.json(
      {
        ok: false,
        error: `Description must be ${ethicsHotline.maxDescriptionChars} characters or fewer.`,
      },
      { status: 400 }
    );
  }

  if (
    !anonymous &&
    reporterEmail &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reporterEmail)
  ) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  let fileName: string | undefined;
  let mimeType: string | undefined;
  let fileBase64: string | undefined;

  if (file instanceof File && file.size > 0) {
    const fileError = validateDocument(file);
    if (fileError) {
      return NextResponse.json({ ok: false, error: fileError }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    fileName = file.name;
    mimeType = file.type || "application/pdf";
    fileBase64 = buffer.toString("base64");
  }

  const result = await submitEthicsReportToAppsScript(
    {
      reportType,
      subject,
      description,
      incidentDate,
      departmentOrIndividual,
      reporterName,
      reporterEmail,
      anonymous: false,
      fileName,
      mimeType,
      fileBase64,
    },
    { url: appsScriptUrl, secret }
  );

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error ?? "Submission failed." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, documentUrl: result.documentUrl });
}
