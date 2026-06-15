import { NextResponse } from "next/server";
import {
  talentNetwork,
  talentNetworkAreas,
  talentNetworkExperienceOptions,
  type TalentNetworkArea,
  type TalentNetworkExperience,
} from "@/constants/career-journey";
import { submitTalentNetworkToAppsScript } from "@/lib/talent-apps-script";

function isAreaOfInterest(value: string): value is TalentNetworkArea {
  return (talentNetworkAreas as readonly string[]).includes(value);
}

function isYearsOfExperience(value: string): value is TalentNetworkExperience {
  return (talentNetworkExperienceOptions as readonly string[]).includes(value);
}

function validateResume(file: File): string | null {
  const extension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  const validType =
    (talentNetwork.acceptedResumeTypes as readonly string[]).includes(
      file.type
    ) ||
    (talentNetwork.acceptedResumeExtensions as readonly string[]).includes(
      extension
    );

  if (!validType) {
    return "Upload a PDF or Word document (.pdf, .doc, .docx).";
  }

  if (file.size > talentNetwork.maxResumeBytes) {
    return "File must be 5MB or smaller.";
  }

  return null;
}

export async function POST(request: Request) {
  const appsScriptUrl = process.env.ETHICS_APPS_SCRIPT_URL;
  const secret = process.env.ETHICS_FORM_SECRET;

  if (!appsScriptUrl || !secret) {
    return NextResponse.json(
      { ok: false, error: "Talent network service is not configured." },
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

  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const nationality = String(formData.get("nationality") ?? "").trim();
  const areaOfInterest = String(formData.get("areaOfInterest") ?? "").trim();
  const yearsOfExperience = String(formData.get("yearsOfExperience") ?? "").trim();
  const linkedIn = String(formData.get("linkedIn") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const file = formData.get("resume");

  if (!fullName) {
    return NextResponse.json(
      { ok: false, error: "Full name is required." },
      { status: 400 }
    );
  }

  if (!email) {
    return NextResponse.json(
      { ok: false, error: "Email address is required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  if (!nationality) {
    return NextResponse.json(
      { ok: false, error: "Nationality is required." },
      { status: 400 }
    );
  }

  if (!areaOfInterest || !isAreaOfInterest(areaOfInterest)) {
    return NextResponse.json(
      { ok: false, error: "Select an area of interest." },
      { status: 400 }
    );
  }

  if (!yearsOfExperience || !isYearsOfExperience(yearsOfExperience)) {
    return NextResponse.json(
      { ok: false, error: "Years of experience is required." },
      { status: 400 }
    );
  }

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json(
      { ok: false, error: "Resume / CV is required." },
      { status: 400 }
    );
  }

  const resumeError = validateResume(file);
  if (resumeError) {
    return NextResponse.json({ ok: false, error: resumeError }, { status: 400 });
  }

  if (linkedIn && !/^https?:\/\/.+/i.test(linkedIn)) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid URL starting with http:// or https://." },
      { status: 400 }
    );
  }

  if (message.length > talentNetwork.maxNoteChars) {
    return NextResponse.json(
      {
        ok: false,
        error: `Message must be ${talentNetwork.maxNoteChars} characters or fewer.`,
      },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const result = await submitTalentNetworkToAppsScript(
    {
      fullName,
      email,
      phone,
      nationality,
      areaOfInterest,
      yearsOfExperience,
      linkedIn,
      message,
      fileName: file.name,
      mimeType: file.type || "application/pdf",
      fileBase64: buffer.toString("base64"),
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
