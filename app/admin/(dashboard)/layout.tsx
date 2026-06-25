import { DashboardShell } from "@/components/admin/dashboard/dashboard-shell";
import { getAdminClientMode } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientMode = getAdminClientMode();
  let userEmail: string | undefined;

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();
    userEmail = typeof data?.claims?.email === "string" ? data.claims.email : undefined;
  } catch {
    userEmail = undefined;
  }

  return (
    <DashboardShell clientMode={clientMode} userEmail={userEmail}>
      {children}
    </DashboardShell>
  );
}
