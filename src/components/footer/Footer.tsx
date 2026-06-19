"use client";

import { useScrollToTop } from "@/hooks/useScrollToTop";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp } from "lucide-react";
import footerStyles from "./footer.module.css";

// 1. Corporate Data Object
const corporateData = {
    tradeName: "PT. Selatox Bio Pharma",
    representative: "Dr. Jonathan Doe",
    address: "Jl. Sudirman Kav 50, Jakarta Selatan 12190, Indonesia",
    contact: "contact@selatox.com | +62 21 1234 5678",
};

const sitemapData = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "News", href: "/news" },
];

const aboutData = [
    { label: "About Selatox", href: "/about" },
    { label: "Our Business", href: "/our-business" },
    { label: "Ethics", href: "/ethics" },
];

const careerData = [
    { label: "Journey", href: "/journey" },
    { label: "Openings", href: "/openings" },
];

const legalData = [
    { label: "Privacy Policy", href: "/privacy", target: "_self" as const },
    { label: "Terms of Service", href: "/terms", target: "_self" as const },
    { label: "LinkedIn", href: "https://linkedin.com", target: "_blank" as const },
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
                                src="/assets/Selatox Logo.svg"
                                alt="Selatox Logo"
                                width={602}
                                height={101}
                                className={footerStyles.logo}
                            />
                        </div>
                    </div>
                </div>

                {/* Middle Layer: The Grid */}
                <div className={footerStyles.container}>
                    <div className={footerStyles.middleLayer}>
                        <div className={footerStyles.corporateColumn}>
                            <h3 className={footerStyles.eyebrow}>PT SELATOX BIO PHARMA</h3>
                            <div className={`${footerStyles.colContent} ${footerStyles.corporateText}`}>
                                <p>Representative: {corporateData.representative}</p>
                                <p>{corporateData.address}</p>
                                <p>{corporateData.contact}</p>
                            </div>
                        </div>

                        <div className={footerStyles.menuColumns}>
                            <div className={footerStyles.menuColumn}>
                                <h3 className={footerStyles.eyebrow}>Sitemap</h3>
                                <nav className={footerStyles.colContent} aria-label="Sitemap">
                                    {sitemapData.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={footerStyles.link}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            <div className={footerStyles.menuColumn}>
                                <h3 className={footerStyles.eyebrow}>About</h3>
                                <nav className={footerStyles.colContent} aria-label="About">
                                    {aboutData.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={footerStyles.link}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            <div className={footerStyles.menuColumn}>
                                <h3 className={footerStyles.eyebrow}>Career</h3>
                                <nav className={footerStyles.colContent} aria-label="Career">
                                    {careerData.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={footerStyles.link}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            <div className={footerStyles.menuColumn}>
                                <h3 className={footerStyles.eyebrow}>Legal & Social</h3>
                                <nav className={footerStyles.colContent} aria-label="Legal and social links">
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
                                </nav>
                            </div>
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
