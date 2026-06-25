import type { Metadata } from "next";
import { getContactPageContent } from "@/lib/cms/public-content";
import { ContactPageContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact | Selatox",
  description:
    "Get in touch with PT. Selatox Bio Pharma — business inquiries, careers, and press, plus our R&D Center and Manufacturing sites across West Java, Indonesia.",
};

export const revalidate = 30;

export default async function ContactPage() {
  const content = await getContactPageContent();

  return (
    <main>
      <ContactPageContent content={content} />
    </main>
  );
}
