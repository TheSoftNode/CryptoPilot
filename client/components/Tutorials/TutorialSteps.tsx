"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Wallet, MessageSquare, ShieldCheck, CheckCircle } from "lucide-react";

// Brand colors matching other sections
const BRAND_COLORS = {
    blue: "#3b82f6",
    teal: "#14b8a6",
    pink: "#ec4899",
    purple: "#8b5cf6",
    orange: "#f97316",
    metamask: "#F6851B"
};

const steps = [
    {
        title: "Connect Your Wallet",
        description:
            "Start by connecting your MetaMask wallet with a single click. This allows the assistant to interact with the Ethereum blockchain on your behalf when authorized.",
        icon: <Wallet className="h-10 w-10" />,
        color: BRAND_COLORS.metamask,
        bgColor: `${BRAND_COLORS.metamask}15`
    },
    {
        title: "Use Natural Language",
        description:
            "Simply type commands like 'Send 0.1 ETH to alice.eth' or 'Swap 50 DAI for ETH' in plain English. No need to learn complex interfaces or commands.",
        icon: <MessageSquare className="h-10 w-10" />,
        color: BRAND_COLORS.blue,
        bgColor: `${BRAND_COLORS.blue}15`
    },
    {
        title: "Review Transaction Details",
        description:
            "Before any transaction is processed, you'll see a clear summary showing exactly what will happen, including fees and total values in USD.",
        icon: <ShieldCheck className="h-10 w-10" />,
        color: BRAND_COLORS.teal,
        bgColor: `${BRAND_COLORS.teal}15`
    },
    {
        title: "Confirm in MetaMask",
        description:
            "After reviewing, simply confirm the transaction in your MetaMask extension. The AI Wallet Assistant will handle all the technical details.",
        icon: <CheckCircle className="h-10 w-10" />,
        color: BRAND_COLORS.pink,
        bgColor: `${BRAND_COLORS.pink}15`
    },
];

export function TutorialSteps() {
    return (
        <motion.section
            className="py-16 md:py-24 relative"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
        >
            {/* Decorative line connecting steps */}
            <div className="absolute left-1/2 top-32 bottom-32 w-0.5 bg-gradient-to-b from-blue-400/30 via-teal-400/30 to-pink-400/30 hidden lg:block"></div>

            <div className="container max-w-7xl mx-auto px-4 md:px-6 relative">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
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
                            className="relative"
                        >
                            {/* Glow effect behind card */}
                            <div className="absolute -inset-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
                                style={{ background: `radial-gradient(circle at center, ${step.color}20, transparent 70%)` }}
                            ></div>

                            <div className="relative rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md border border-gray-200/60 dark:border-gray-700/40 h-full backdrop-blur-sm group hover:shadow-lg transition-all duration-300">
                                {/* Step number indicator */}
                                <div className="absolute -top-3 -right-3 h-7 w-7 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-sm font-medium shadow-sm">
                                    {index + 1}
                                </div>

                                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full shadow-inner"
                                    style={{
                                        backgroundColor: step.bgColor,
                                        color: step.color,
                                        boxShadow: `inset 0 2px 4px 0 ${step.color}15`
                                    }}
                                >
                                    {step.icon}
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                                    style={{
                                        backgroundImage: `linear-gradient(135deg, ${step.color}, ${BRAND_COLORS.teal})`
                                    }}
                                >
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>

                                {/* Connection line to next step - only visible on mobile/tablet */}
                                {index < steps.length - 1 && (
                                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-8 w-0.5 bg-gradient-to-b from-gray-200 to-transparent dark:from-gray-700 sm:block lg:hidden"></div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}