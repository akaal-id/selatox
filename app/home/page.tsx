import { redirect } from "next/navigation";

/** /home redirects to canonical home at / */
export default function HomeRedirect() {
  redirect("/");
}
