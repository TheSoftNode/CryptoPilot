"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { CheckCircle, ShieldCheck, Lock, Shield } from "lucide-react";

export function SecurityFeatures() {
    const securityPoints = [
        {
            title: "MetaMask Integration",
            description: "We never have access to your private keys. All transactions require explicit approval in your MetaMask wallet.",
            icon: <Lock className="h-4 w-4" />,
            color: "#3b82f6" // blue
        },
        {
            title: "Clear Transaction Details",
            description: "Every transaction shows exactly what will happen, including amounts, addresses, and fees before you confirm.",
            icon: <CheckCircle className="h-4 w-4" />,
            color: "#14b8a6" // teal
        },
        {
            title: "ENS Resolution",
            description: "We resolve human-readable ENS names to addresses to reduce the risk of errors when sending funds.",
            icon: <Shield className="h-4 w-4" />,
            color: "#ec4899" // pink
        }
    ];

    return (
        <motion.section
            className="py-16 md:py-12 relative"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
        >
            {/* Subtle background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/30 to-transparent dark:from-blue-950/20 dark:to-transparent"></div>

                {/* Subtle orbital accent */}
                <motion.div
                    className="absolute -bottom-32 right-1/3 w-96 h-96 border border-blue-200/10 dark:border-blue-700/10 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <div className="container max-w-7xl mx-auto px-4 md:px-6 relative">
                <div className="grid gap-12 md:grid-cols-2 md:items-center">
                    <motion.div variants={fadeInUp}>
                        <span className="rounded-full bg-gradient-to-r from-blue-500/15 to-teal-500/15 dark:from-blue-500/25 dark:to-teal-500/25 border border-blue-200 dark:border-teal-800/50 px-5 py-2 text-sm font-semibold text-blue-700 dark:text-teal-300 shadow-sm">
                            Security First
                        </span>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-blue-500 dark:from-blue-400 dark:via-teal-400 dark:to-blue-400">
                            Your Security Is Our Priority
                        </h2>
                        <ul className="mt-8 space-y-6">
                            {securityPoints.map((point, index) => (
                                <motion.li
                                    key={point.title}
                                    className="flex items-start gap-4"
                                    variants={fadeInUp}
                                    transition={{ delay: 0.1 + (index * 0.1) }}
                                >
                                    <div
                                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full shadow-sm mt-0.5"
                                        style={{
                                            backgroundColor: `${point.color}15`,
                                            color: point.color
                                        }}
                                    >
                                        {point.icon}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{point.title}</p>
                                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                                            {point.description}
                                        </p>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        variants={fadeInUp}
                        className="relative rounded-xl overflow-hidden"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-teal-500/20 to-blue-500/20 rounded-xl blur-xl opacity-70"></div>
                        <div className="relative rounded-xl border border-gray-200/60 dark:border-gray-700/40 bg-white/80 dark:bg-gray-800/80 p-6 shadow-lg backdrop-blur-sm">
                            <div className="aspect-video relative">
                                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
                                    <ShieldCheck className="h-20 w-20 text-blue-500 dark:text-blue-400 mb-6" />
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Multi-layer Protection</h3>
                                    <p className="text-center text-gray-600 dark:text-gray-300 max-w-md">
                                        Our security architecture ensures your assets remain safe while providing a seamless user experience.
                                    </p>

                                    <div className="grid grid-cols-3 gap-6 mt-10 w-full max-w-md">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-500/10 text-blue-500 mb-2">
                                                <Lock className="h-5 w-5" />
                                            </div>
                                            <p className="text-xs font-medium text-gray-900 dark:text-white">Non-custodial</p>
                                        </div>
                                        <div className="flex flex-col items-center text-center">
                                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-teal-500/10 text-teal-500 mb-2">
                                                <Shield className="h-5 w-5" />
                                            </div>
                                            <p className="text-xs font-medium text-gray-900 dark:text-white">Transaction Verification</p>
                                        </div>
                                        <div className="flex flex-col items-center text-center">
                                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-pink-500/10 text-pink-500 mb-2">
                                                <CheckCircle className="h-5 w-5" />
                                            </div>
                                            <p className="text-xs font-medium text-gray-900 dark:text-white">Confirmation Required</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}