"use client";

import React, { useState } from "react";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowUp, ArrowRight, ArrowUpRight } from "lucide-react";
import footerStyles from "./footer.module.css";
import newsletterStyles from "./newsletter.module.css";

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
    { label: "Our Business", href: "/business", target: "_self" },
    { label: "Product", href: "/product", target: "_self" },
    { label: "Newsroom", href: "/newsroom", target: "_self" },
    { label: "Career", href: "/career", target: "_self" },
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
    const [isFamilySiteOpen, setIsFamilySiteOpen] = useState(false);
    const scrollToTop = useScrollToTop();

    return (
        <>
            {/* Newsletter Section */}
            <section className={newsletterStyles.newsletterSection} aria-labelledby="newsletter-heading">
                <div className={newsletterStyles.folioWrapper}>
                    {/* Left Panel: Typography */}
                    <div className={newsletterStyles.leftPanel}>
                        <p className={newsletterStyles.eyebrow}>Newsletter</p>
                        <h2 id="newsletter-heading" className={newsletterStyles.headline}>Global Insights.<br />Delivered.</h2>
                        <p className={newsletterStyles.description}>
                            Stay at the forefront of medical aesthetics. Subscribe for exclusive updates on R&D milestones and corporate announcements.
                        </p>
                    </div>

                    {/* Right Panel: Interactive Zone & Form */}
                    <div className={newsletterStyles.rightPanel}>
                        <p className={newsletterStyles.disclaimer}>Join the network of industry leaders.</p>
                        <form className={newsletterStyles.formContainer} onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                className={newsletterStyles.input}
                                placeholder="name@company.com"
                                aria-label="Email address for newsletter"
                                required
                            />
                            <button type="submit" className={newsletterStyles.submitButton} aria-label="Subscribe">
                                <ArrowUpRight size={32} strokeWidth={1.5} />
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Existing Footer */}
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

                        {/* Col 4: Family Site (Custom Dropdown) */}
                        <div>
                            <h3 className={footerStyles.colHeader}>Family Site</h3>
                            <div className={`${footerStyles.dropdownWrapper} ${isFamilySiteOpen ? footerStyles.dropdownOpen : ""}`}>
                                <button
                                    type="button"
                                    className={footerStyles.dropdownButton}
                                    onClick={() => setIsFamilySiteOpen(!isFamilySiteOpen)}
                                    aria-haspopup="listbox"
                                    aria-expanded={isFamilySiteOpen}
                                >
                                    <span>Select Family Site</span>
                                    <ChevronDown size={16} className={footerStyles.chevron} />
                                </button>
                                <ul
                                    className={footerStyles.dropdownList}
                                    role="listbox"
                                >
                                    {familySiteData.map((site, idx) => (
                                        <li key={idx} className={footerStyles.dropdownItem} role="option">
                                            <a
                                                href={site.href}
                                                target={site.target}
                                                rel="noopener noreferrer"
                                                className={footerStyles.dropdownLink}
                                            >
                                                {site.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
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
        </>
    );
};
