"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const examples = [
    {
        command: "Send 0.1 ETH to alice.eth",
        description: "Transfer ETH to an address or ENS name",
        color: "#3b82f6" // blue
    },
    {
        command: "Swap 50 DAI for ETH",
        description: "Exchange one token for another",
        color: "#14b8a6" // teal
    },
    {
        command: "Show my balance",
        description: "Check your current wallet balance",
        color: "#ec4899" // pink
    },
    {
        command: "What is the gas fee for sending ETH right now?",
        description: "Check current network conditions",
        color: "#8b5cf6" // purple
    },
    {
        command: "Track my pending transactions",
        description: "See status of in-progress transactions",
        color: "#f97316" // orange
    },
    {
        command: "Optimize gas for my pending transaction",
        description: "Speed up slow transactions",
        color: "#f6851b" // metamask orange
    },
];

export function ExampleCommands() {
    return (
        <motion.section
            className="relative py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-gray-900 dark:via-blue-950/20 dark:to-gray-900 overflow-hidden"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
        >
            {/* Decorative background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/30 dark:to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-teal-50/50 to-transparent dark:from-teal-950/30 dark:to-transparent"></div>

                {/* Orbital accent */}
                <motion.div
                    className="absolute -bottom-40 -left-40 w-80 h-80 border border-blue-200/20 dark:border-blue-700/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    variants={fadeInUp}
                    className="mx-auto flex max-w-[58rem] flex-col items-center text-center mb-12"
                >
                    <span className="rounded-full bg-gradient-to-r from-pink-500/15 to-purple-500/15 dark:from-pink-500/25 dark:to-purple-500/25 border border-pink-200 dark:border-purple-800/50 px-5 py-2 text-sm font-semibold text-pink-700 dark:text-purple-300 shadow-sm">
                        Example Commands
                    </span>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400">
                        What You Can Ask
                    </h2>
                    <p className="mt-4 max-w-[42rem] leading-normal text-gray-600 dark:text-gray-300 sm:text-lg">
                        Here are some examples of what you can ask your AI Wallet Assistant to do.
                    </p>
                </motion.div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {examples.map((example, index) => (
                        <motion.div
                            key={example.command}
                            variants={fadeInUp}
                            transition={{
                                delay: index * 0.05,
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                            whileHover={{
                                y: -4,
                                transition: { duration: 0.2 }
                            }}
                            className="group"
                        >
                            <div className="h-full rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-5 shadow-md border border-gray-200/60 dark:border-gray-700/40 transition-all duration-300 group-hover:shadow-lg">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <div
                                            className="flex h-10 w-10 items-center justify-center rounded-full"
                                            style={{
                                                backgroundColor: `${example.color}15`,
                                                color: example.color
                                            }}
                                        >
                                            <Send className="h-4 w-4" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                                            style={{
                                                backgroundImage: `linear-gradient(135deg, ${example.color}, #14b8a6)`
                                            }}
                                        >
                                            "{example.command}"
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{example.description}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    variants={fadeInUp}
                    className="mt-12 flex justify-center"
                >
                    <Link href="/chat">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-teal-500 to-blue-400 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                            <Button
                                size="lg"
                                className="relative bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 flex items-center gap-2"
                            >
                                Try It Yourself
                                <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                    </Link>
                </motion.div>
            </div>
        </motion.section>
    );
}