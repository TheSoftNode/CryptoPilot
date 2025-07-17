"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

// Brand colors matching previous sections
const BRAND_COLORS = {
    blue: "#3b82f6",
    teal: "#14b8a6",
    pink: "#ec4899",
    purple: "#8b5cf6",
    orange: "#f97316"
};

const testimonials = [
    {
        quote: "This AI wallet assistant completely changed how I interact with crypto. No more complicated UIs or technical knowledge needed.",
        author: "Sarah J.",
        role: "Software Developer",
        avatarUrl: "/api/placeholder/40/40",
        color: BRAND_COLORS.blue
    },
    {
        quote: "I've tried many crypto wallets, but none come close to the simplicity of this. I can just type what I want to do in plain English.",
        author: "Michael T.",
        role: "Crypto Investor",
        avatarUrl: "/api/placeholder/40/40",
        color: BRAND_COLORS.teal
    },
    {
        quote: "As someone new to crypto, the natural language interface makes everything so much easier to understand and use.",
        author: "Elena K.",
        role: "Marketing Specialist",
        avatarUrl: "/api/placeholder/40/40",
        color: BRAND_COLORS.pink
    },
];

export function TestimonialsSection() {
    return (
        <section className="relative py-16 md:py-24 bg-white dark:bg-gray-900 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/30 dark:to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-teal-50/50 to-transparent dark:from-teal-950/30 dark:to-transparent"></div>

                {/* Orbital accent matching workflow section */}
                <motion.div
                    className="absolute -top-40 -right-40 w-80 h-80 border border-blue-200/20 dark:border-blue-700/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                />

                {/* Subtle blobs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-teal-500/5 dark:bg-teal-500/10 blur-3xl"></div>
            </div>

            <motion.div
                className="container max-w-7xl mx-auto relative z-10 px-4 md:px-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                <motion.div
                    variants={fadeInUp}
                    className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center mb-12"
                >
                    <span className="rounded-full bg-gradient-to-r from-blue-500/15 to-teal-500/15 dark:from-blue-500/25 dark:to-teal-500/25 border border-blue-200 dark:border-blue-800/50 px-5 py-2 text-sm font-semibold text-blue-700 dark:text-blue-300 shadow-sm">
                        Testimonials
                    </span>
                    <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-pink-500 dark:from-blue-400 dark:via-teal-400 dark:to-pink-400">
                        What Our Users Say
                    </h2>
                    <p className="max-w-[85%] leading-normal text-gray-600 dark:text-gray-300 sm:text-lg">
                        Hear from people who have simplified their crypto experience with AI Wallet Assistant
                    </p>
                </motion.div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            transition={{
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                            whileHover={{
                                y: -5,
                                transition: { duration: 0.2 }
                            }}
                            className="group relative"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-300"
                                style={{
                                    backgroundImage: `linear-gradient(to right, ${testimonial.color}, ${BRAND_COLORS.teal})`
                                }}
                            ></div>

                            <div className="relative rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md backdrop-blur-sm">
                                <div
                                    className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full shadow-md text-white"
                                    style={{
                                        background: `linear-gradient(135deg, ${testimonial.color}, ${testimonial.color}dd)`,
                                        boxShadow: `0 0 15px ${testimonial.color}40`
                                    }}
                                >
                                    <Quote className="h-5 w-5" />
                                </div>

                                <div className="pt-4">
                                    <p className="text-gray-600 dark:text-gray-300">"{testimonial.quote}"</p>

                                    <div className="mt-6 flex items-center gap-3 border-t border-gray-200 dark:border-gray-700 pt-4">
                                        <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-gray-200 dark:ring-gray-700">
                                            <Image
                                                src={testimonial.avatarUrl}
                                                alt={testimonial.author}
                                                width={40}
                                                height={40}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">{testimonial.author}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative accent */}
                                <div
                                    className="absolute bottom-3 right-3 w-6 h-6 opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                                    style={{ color: testimonial.color }}
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional subtle element for consistency */}
                <motion.div
                    className="mt-12 flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-flex px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/30 dark:to-teal-900/30
                                border border-blue-200/50 dark:border-blue-700/50 text-gray-600 dark:text-gray-300 text-sm font-medium backdrop-blur-sm shadow-sm"
                        whileHover={{
                            scale: 1.02,
                            boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)",
                            transition: { duration: 0.2 }
                        }}
                    >
                        Join thousands of satisfied users
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}