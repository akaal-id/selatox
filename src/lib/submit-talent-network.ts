import type { TalentNetworkFormData } from "@/constants/career-journey";

export async function submitTalentNetwork(
  data: TalentNetworkFormData
): Promise<void> {
  const body = new FormData();

  body.append("fullName", data.fullName);
  body.append("email", data.email);
  body.append("phone", data.phone);
  body.append("nationality", data.nationality);
  body.append("areaOfInterest", data.areaOfInterest);
  body.append("yearsOfExperience", data.yearsOfExperience);
  body.append("linkedIn", data.linkedIn);
  body.append("message", data.message);

  if (data.resume) {
    body.append("resume", data.resume);
  }

  const response = await fetch("/api/talent-network", {
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
