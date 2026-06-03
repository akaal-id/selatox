"use client";

import { useScrollToTop } from "@/hooks/useScrollToTop";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { SelectForm } from "@/components/ui/selectform/selectform";
import footerStyles from "./footer.module.css";

// 1. Corporate Data Object
const corporateData = {
    tradeName: "PT. Selatox Bio Pharma",
    representative: "Dr. Jonathan Doe",
    address: "Jl. Sudirman Kav 50, Jakarta Selatan 12190, Indonesia",
    contact: "contact@selatox.com | +62 21 1234 5678",
};

// 2. Sitemap Array
const sitemapData = [
    { label: "About Us", href: "/about", target: "_self" },
    { label: "Our Business", href: "/our-business", target: "_self" },
    { label: "Product", href: "/products", target: "_self" },
    { label: "Newsroom", href: "/news", target: "_self" },
    { label: "Career", href: "/opportunities", target: "_self" },
];

const legalData = [
    { label: "Privacy Policy", href: "/privacy", target: "_self" },
    { label: "Terms of Service", href: "/terms", target: "_self" },
    { label: "LinkedIn", href: "https://linkedin.com", target: "_blank" },
    { label: "Instagram", href: "https://instagram.com", target: "_blank" },
];

// 3. Family Site Array
const familySiteData = [
    { label: "Selatox Global", href: "https://selatox.com", target: "_blank" },
    { label: "Selatox R&D Center", href: "https://rd.selatox.com", target: "_blank" },
];

export const Footer = () => {
    const scrollToTop = useScrollToTop();

    return (
        <footer className={footerStyles.footerWrapper}>
                {/* Top Layer: Massive Brand Element */}
                <div className={footerStyles.topLayer}>
                    <div className={footerStyles.container}>
                        <div className={footerStyles.logoWrapper}>
                            <Image
                                src="/assets/icon.svg"
                                alt="Selatox Logo"
                                width={100}
                                height={100}
                                className={footerStyles.logoIcon}
                            />
                            <h1 className={footerStyles.brandText}>SELATOX</h1>
                        </div>
                    </div>
                </div>

                {/* Middle Layer: The Grid */}
                <div className={footerStyles.container}>
                    <div className={footerStyles.middleLayer}>

                        {/* Col 1: Corporate Info */}
                        <div>
                            <h3 className={footerStyles.colHeader}>Corporate Data</h3>
                            <div className={`${footerStyles.colContent} ${footerStyles.corporateText}`}>
                                <p>
                                    <strong>{corporateData.tradeName}</strong>
                                </p>
                                <p>Representative: {corporateData.representative}</p>
                                <p>{corporateData.address}</p>
                                <p>{corporateData.contact}</p>
                            </div>
                        </div>

                        {/* Col 2: Sitemap */}
                        <div>
                            <h3 className={footerStyles.colHeader}>Sitemap</h3>
                            <div className={footerStyles.colContent}>
                                {sitemapData.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        href={item.href}
                                        target={item.target}
                                        className={footerStyles.link}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Col 3: Legal & Social */}
                        <div>
                            <h3 className={footerStyles.colHeader}>Legal & Social</h3>
                            <div className={footerStyles.colContent}>
                                {legalData.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        href={item.href}
                                        target={item.target}
                                        className={footerStyles.link}
                                        rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Col 4: Family Site */}
                        <div>
                            <h3 className={footerStyles.colHeader}>Family Site</h3>
                            <SelectForm
                                placeholder="Select Family Site"
                                value=""
                                onChange={() => {}}
                                options={familySiteData.map((site) => ({
                                    label: site.label,
                                    value: site.label,
                                    href: site.href,
                                    target: site.target as "_blank" | "_self",
                                }))}
                                variant="footer"
                            />
                        </div>

                    </div>
                </div>

                {/* Bottom Layer */}
                <div className={footerStyles.container}>
                    <div className={footerStyles.bottomLayer}>
                        <div>
                            © {new Date().getFullYear()} {corporateData.tradeName}. All Rights Reserved.
                        </div>
                        <button onClick={scrollToTop} className={footerStyles.backToTop} aria-label="Back to top">
                            Back to Top
                            <ArrowUp size={16} />
                        </button>
                    </div>
                </div>
            </footer>
    );
};
