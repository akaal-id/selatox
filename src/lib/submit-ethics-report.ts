import type { EthicsReportFormData } from "@/constants/ethics";

export async function submitEthicsReport(
  data: EthicsReportFormData
): Promise<void> {
  const body = new FormData();

  body.append("reportType", data.reportType);
  body.append("subject", data.subject);
  body.append("description", data.description);
  body.append("incidentDate", data.incidentDate);
  body.append("departmentOrIndividual", data.departmentOrIndividual);
  body.append("anonymous", String(data.anonymous));
  body.append("reporterName", data.reporterName);
  body.append("reporterEmail", data.reporterEmail);

  if (data.supportingDocument) {
    body.append("supportingDocument", data.supportingDocument);
  }

  const response = await fetch("/api/ethics-report", {
    method: "POST",
    body,
  });

  const result = (await response.json().catch(() => null)) as {
    ok?: boolean;
    error?: string;
  } | null;

  if (!response.ok || !result?.ok) {
    throw new Error(result?.error ?? "Submit failed");
  }
}
