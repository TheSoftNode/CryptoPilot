"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function TutorialHero() {
    return (
        <motion.section
            className="relative pt-16 md:pt-24 overflow-hidden"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
        >
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl"></div>
                <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-teal-500/5 dark:bg-teal-500/10 blur-3xl"></div>

                {/* Subtle orbital accent */}
                <motion.div
                    className="absolute -top-32 -right-32 w-96 h-96 border border-blue-200/20 dark:border-blue-700/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <div className="container max-w-7xl mx-auto px-4 md:px-6">
                <motion.div
                    variants={fadeInUp}
                    className="mx-auto flex max-w-[58rem] flex-col items-center text-center"
                >
                    <span className="rounded-full bg-gradient-to-r from-blue-500/15 to-teal-500/15 dark:from-blue-500/25 dark:to-teal-500/25 border border-blue-200 dark:border-blue-800/50 px-5 py-2 text-sm font-semibold text-blue-700 dark:text-blue-300 shadow-sm">
                        Getting Started
                    </span>
                    <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-pink-500 dark:from-blue-400 dark:via-teal-400 dark:to-pink-400">
                        How to Use Your AI Wallet Assistant
                    </h1>
                    <p className="mt-6 max-w-[42rem] leading-normal text-gray-600 dark:text-gray-300 sm:text-xl sm:leading-8">
                        Our AI Wallet Assistant makes interacting with your crypto simple and intuitive. Follow these steps to get started.
                    </p>
                </motion.div>
            </div>
        </motion.section>
    );
}