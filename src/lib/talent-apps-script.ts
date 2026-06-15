import type { AppsScriptResponse } from "@/lib/ethics-apps-script";

export type TalentAppsScriptPayload = {
  formType: "talent";
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  areaOfInterest: string;
  yearsOfExperience: string;
  linkedIn: string;
  message: string;
  fileName?: string;
  mimeType?: string;
  fileBase64?: string;
};

export async function submitTalentNetworkToAppsScript(
  payload: Omit<TalentAppsScriptPayload, "formType">,
  config: { url: string; secret: string }
): Promise<AppsScriptResponse> {
  const response = await fetch(config.url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: config.secret,
      formType: "talent",
      ...payload,
    }),
    cache: "no-store",
  });

  const data = (await response.json().catch(() => null)) as AppsScriptResponse | null;

  if (!response.ok || !data?.ok) {
    return {
      ok: false,
      error: data?.error ?? `Apps Script request failed (${response.status})`,
    };
  }

  return data;
}
