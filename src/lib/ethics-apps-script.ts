export type EthicsAppsScriptPayload = {
  reportType: string;
  subject: string;
  description: string;
  incidentDate: string;
  departmentOrIndividual: string;
  reporterName: string;
  reporterEmail: string;
  anonymous: boolean;
  fileName?: string;
  mimeType?: string;
  fileBase64?: string;
};

export type EthicsAppsScriptResponse = {
  ok: boolean;
  documentUrl?: string;
  formStatus?: number;
  error?: string;
};

export type AppsScriptResponse = EthicsAppsScriptResponse;

export async function submitEthicsReportToAppsScript(
  payload: EthicsAppsScriptPayload,
  config: { url: string; secret: string }
): Promise<EthicsAppsScriptResponse> {
  const response = await fetch(config.url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: config.secret,
      formType: "ethics",
      ...payload,
    }),
    cache: "no-store",
  });

  const data = (await response.json().catch(() => null)) as EthicsAppsScriptResponse | null;

  if (!response.ok || !data?.ok) {
    return {
      ok: false,
      error: data?.error ?? `Apps Script request failed (${response.status})`,
    };
  }

  return data;
}
