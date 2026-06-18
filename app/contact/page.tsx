import type { Metadata } from "next";
import { ContactPageContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact | Selatox",
  description:
    "Get in touch with PT. Selatox Bio Pharma — business inquiries, careers, and press, plus our R&D Center and Manufacturing sites across West Java, Indonesia.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactPageContent />
    </main>
  );
}
