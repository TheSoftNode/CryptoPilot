"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ReactNode } from "react";

interface CtaSectionProps {
    title: string;
    description: string;
    buttonText: string;
    buttonIcon?: ReactNode;
    buttonHref: string;
    secondaryButtonText?: string;
    secondaryButtonHref?: string;
    backgroundStyle?: "gradient" | "solid" | "subtle";
}

export function TutorialCtaSection({
    title,
    description,
    buttonText,
    buttonIcon,
    buttonHref,
    secondaryButtonText,
    secondaryButtonHref,
    backgroundStyle = "gradient"
}: CtaSectionProps) {
    const backgroundClasses = {
        gradient: "bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-900",
        solid: "bg-gray-50 dark:bg-gray-800",
        subtle: "bg-white dark:bg-gray-900"
    };

    return (
        <motion.section
            className={`relative py-16 md:py-20 overflow-hidden ${backgroundClasses[backgroundStyle]}`}
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
        >
            {/* Decorative background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-t from-blue-50/20 to-transparent dark:from-blue-950/10 dark:to-transparent rounded-full blur-3xl"></div>

                {/* Orbital accent */}
                <motion.div
                    className="absolute -top-40 left-1/4 w-80 h-80 border border-blue-200/10 dark:border-blue-700/10 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                <div className="relative mx-auto max-w-5xl">
                    {/* Glow effect behind card */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-teal-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-70"></div>

                    <div className="relative rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 md:p-12 shadow-xl border border-gray-200/60 dark:border-gray-700/40 overflow-hidden">
                        {/* Subtle background pattern */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <svg width="100%" height="100%" className="absolute inset-0">
                                <defs>
                                    <pattern id="ctaGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                                        <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-500/20" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#ctaGrid)" />
                            </svg>
                        </div>

                        <div className="relative z-10 text-center">
                            <motion.h2
                                variants={fadeInUp}
                                className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-pink-500 dark:from-blue-400 dark:via-teal-400 dark:to-pink-400"
                            >
                                {title}
                            </motion.h2>

                            <motion.p
                                variants={fadeInUp}
                                className="mx-auto mt-4 max-w-[42rem] text-gray-600 dark:text-gray-300 sm:text-lg"
                            >
                                {description}
                            </motion.p>

                            <motion.div
                                variants={fadeInUp}
                                className="mt-8 flex flex-wrap items-center justify-center gap-4"
                            >
                                <Link href={buttonHref}>
                                    <div className="relative group">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-teal-500 to-blue-400 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                                        <Button
                                            size="lg"
                                            className="relative bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 flex items-center gap-2"
                                        >
                                            {buttonText}
                                            {buttonIcon}
                                        </Button>
                                    </div>
                                </Link>

                                {secondaryButtonText && secondaryButtonHref && (
                                    <Link href={secondaryButtonHref}>
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className="border-blue-400/50 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10"
                                        >
                                            {secondaryButtonText}
                                        </Button>
                                    </Link>
                                )}
                            </motion.div>

                            {/* Decorative floating elements */}
                            <motion.div
                                className="absolute -top-10 -right-10 w-32 h-32 opacity-20 pointer-events-none"
                                animate={{
                                    rotate: 360,
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{
                                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                }}
                            >
                                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" className="text-blue-500" />
                                </svg>
                            </motion.div>

                            <motion.div
                                className="absolute -bottom-8 -left-8 w-24 h-24 opacity-20 pointer-events-none"
                                animate={{
                                    rotate: -360,
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{
                                    rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                                    scale: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                                }}
                            >
                                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <polygon points="50,10 90,50 50,90 10,50" stroke="currentColor" strokeWidth="2" className="text-teal-500" />
                                </svg>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}