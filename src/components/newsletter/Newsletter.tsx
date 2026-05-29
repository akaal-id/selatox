"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "./newsletter.module.css";

export const Newsletter = () => {
    return (
        <section className={styles.newsletterSection} aria-labelledby="newsletter-heading">
            <div className={styles.folioWrapper}>
                {/* Left Panel: Typography */}
                <div className={styles.leftPanel}>
                    <p className={styles.eyebrow}>Newsletter</p>
                    <h2 id="newsletter-heading" className={styles.headline}>Global Insights.<br />Delivered.</h2>
                    <p className={styles.description}>
                        Stay at the forefront of medical aesthetics. Subscribe for exclusive updates on R&D milestones and corporate announcements.
                    </p>
                </div>

                {/* Right Panel: Interactive Zone & Form */}
                <div className={styles.rightPanel}>
                    <p className={styles.disclaimer}>Join the network of industry leaders.</p>
                    <form className={styles.formContainer} onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            className={styles.input}
                            placeholder="name@company.com"
                            aria-label="Email address for newsletter"
                            required
                        />
                        <button type="submit" className={styles.submitButton} aria-label="Subscribe">
                            <ArrowUpRight size={32} strokeWidth={1.5} />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};
