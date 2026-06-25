import { redirect } from "next/navigation";
import { HOME_ADMIN_HREF } from "@/lib/cms/home";

export default function AdminHomeIndexPage() {
  redirect(HOME_ADMIN_HREF);
}
