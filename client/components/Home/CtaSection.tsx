"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function CtaSection() {
    return (
        <section className="relative py-16 md:py-20 bg-gradient-to-b from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/20 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl"></div>
                <div className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full bg-pink-500/5 dark:bg-pink-500/10 blur-3xl"></div>

                {/* Orbital accent */}
                <motion.div
                    className="absolute -bottom-32 left-1/3 w-96 h-96 border border-blue-200/20 dark:border-blue-700/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <motion.div
                className="container max-w-7xl mx-auto relative z-10 px-4 md:px-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                <div className="relative mx-auto max-w-5xl">
                    {/* Glow effect behind card */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-teal-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-70"></div>

                    <div className="relative rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 md:p-12 shadow-xl border border-gray-200/60 dark:border-gray-700/40 overflow-hidden">
                        {/* Subtle particle animation overlay */}
                        <div className="absolute inset-0 opacity-20">
                            <svg width="100%" height="100%" className="absolute inset-0">
                                <defs>
                                    <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-500/20" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#smallGrid)" />
                            </svg>
                        </div>

                        <div className="relative z-10 text-center">
                            <motion.div
                                variants={fadeInUp}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-teal-500/10 dark:from-blue-500/20 dark:to-teal-500/20 border border-blue-200/50 dark:border-blue-700/50 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6 shadow-sm"
                            >
                                <Sparkles className="h-4 w-4" />
                                <span>Take the next step</span>
                            </motion.div>

                            <motion.h2
                                variants={fadeInUp}
                                className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-pink-500 dark:from-blue-400 dark:via-teal-400 dark:to-pink-400"
                            >
                                Ready to simplify your crypto experience?
                            </motion.h2>

                            <motion.p
                                variants={fadeInUp}
                                className="mx-auto mt-4 max-w-[42rem] text-gray-600 dark:text-gray-300 sm:text-lg"
                            >
                                Start managing your crypto wallet with natural language commands today.
                                No more complex interfaces or technical jargon.
                            </motion.p>

                            <motion.div
                                variants={fadeInUp}
                                className="mt-8 flex flex-wrap items-center justify-center gap-4"
                            >
                                <Link href="/chat">
                                    <div className="relative group">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-teal-500 to-blue-400 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                                        <Button
                                            size="lg"
                                            className="relative bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 flex items-center gap-2"
                                        >
                                            Get Started
                                            <ArrowRight className="h-4 w-4 ml-1" />
                                        </Button>
                                    </div>
                                </Link>
                                <Link href="/tutorial">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="border-blue-400/50 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10"
                                    >
                                        View Tutorial
                                    </Button>
                                </Link>
                            </motion.div>

                            <motion.div
                                variants={fadeInUp}
                                className="mt-8 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center"
                            >
                                <svg className="h-4 w-4 mr-1.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                No account required. Just connect your MetaMask wallet and start using it.
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}