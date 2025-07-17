"use client";

import { fadeInUp, staggerContainer } from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowDown, CheckCircle2 } from "lucide-react";

// Brand colors matching the previous sections
const BRAND_COLORS = {
    blue: "#3b82f6",
    teal: "#14b8a6",
    pink: "#ec4899",
    purple: "#8b5cf6",
    orange: "#f97316",
    metamask: "#F6851B"
};

const workflowSteps = [
    {
        number: "01",
        title: "Connect Your Wallet",
        description: "Securely connect your MetaMask wallet with a single click.",
        icon: <svg className="h-5 w-5" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.9582 1L19.8241 10.7183L22.2845 5.12254L32.9582 1Z" fill="#E2761B" stroke="#E2761B" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.04178 1L15.0487 10.8232L12.7155 5.12254L2.04178 1Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28.177 23.5133L24.6416 28.8755L32.2448 30.9316L34.3982 23.6567L28.177 23.5133Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M0.619873 23.6567L2.7553 30.9316L10.3584 28.8755L6.82302 23.5133L0.619873 23.6567Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.91563 14.8181L7.82739 17.9895L15.368 18.3147L15.1008 10.2612L9.91563 14.8181Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M25.0845 14.8181L19.8426 10.1564L19.8242 18.3147L27.3467 17.9895L25.0845 14.8181Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.3583 28.8755L14.8962 26.7245L10.9879 23.712L10.3583 28.8755Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.1036 26.7245L24.6415 28.8755L24.012 23.712L20.1036 26.7245Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" />
        </svg>,
        color: BRAND_COLORS.metamask
    },
    {
        number: "02",
        title: "Ask In Plain English",
        description: "Type commands like 'Send 0.1 ETH to alice.eth' in natural language.",
        icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" fill="#3B82F6" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>,
        color: BRAND_COLORS.blue
    },
    {
        number: "03",
        title: "Review & Confirm",
        description: "Check the transaction details in a clean, unambiguous summary.",
        icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11L12 14L22 4" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>,
        color: BRAND_COLORS.teal
    },
    {
        number: "04",
        title: "Sign With MetaMask",
        description: "Approve the transaction in your MetaMask extension and you're done.",
        icon: <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>,
        color: BRAND_COLORS.pink
    }
];

export function WorkflowSection() {
    return (
        <section className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-b from-white via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950/20">
            {/* Connection element from features to workflow */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-white dark:from-gray-900 dark:to-gray-900"></div>

            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -right-10 top-60 w-72 h-72 rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl"></div>
                <div className="absolute -left-10 top-40 w-72 h-72 rounded-full bg-teal-500/5 dark:bg-teal-500/10 blur-3xl"></div>

                <motion.div
                    className="absolute -bottom-32 right-1/3 w-96 h-96 border border-pink-200/20 dark:border-pink-500/10 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                ></motion.div>
            </div>

            <motion.div
                className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
            >
                <motion.div
                    variants={fadeInUp}
                    className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center mb-14"
                >
                    <span className="rounded-full bg-gradient-to-r from-blue-500/15 to-pink-500/15 dark:from-blue-500/25 dark:to-pink-500/25 border border-blue-200 dark:border-pink-800/30 px-5 py-2 text-sm font-semibold text-blue-700 dark:text-pink-300 shadow-sm">
                        How It Works
                    </span>
                    <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-pink-500 dark:from-blue-400 dark:via-teal-400 dark:to-pink-400">
                        Simple, Intuitive Workflow
                    </h2>
                    <p className="max-w-[85%] leading-normal text-gray-600 dark:text-gray-300 sm:text-lg">
                        Experience the most user-friendly crypto interaction ever created
                    </p>
                </motion.div>

                {/* Workflow Steps Timeline */}
                <div className="relative my-20">
                    {/* Connection line */}
                    <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-400 via-teal-400 to-pink-400 opacity-30 dark:opacity-40 md:translate-x-0"></div>

                    <div className="grid gap-12 md:grid-cols-2">
                        {workflowSteps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                variants={fadeInUp}
                                transition={{ delay: index * 0.1 }}
                                className={`relative ${index % 2 !== 0 ? "md:translate-y-24" : ""}`}
                            >
                                <div className="absolute -left-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-teal-500 dark:from-blue-400 dark:to-teal-400 text-white shadow-md shadow-blue-200/50 dark:shadow-blue-900/30 md:left-1/2 md:-ml-3 z-10">
                                    <span className="h-3 w-3 rounded-full bg-white"></span>
                                </div>

                                <div className="ml-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/80 p-6 shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow duration-300 md:ml-0 md:mr-12 group">
                                    <div className="flex items-start">
                                        <div className="mr-4 p-2.5 rounded-lg" style={{ backgroundColor: `${step.color}15` }}>
                                            {step.icon}
                                        </div>
                                        <div>
                                            <span className="mb-1.5 block font-mono text-sm font-medium" style={{ color: step.color }}>
                                                {step.number}
                                            </span>
                                            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                                        </div>
                                    </div>

                                    {/* Connection arrow to next step */}
                                    {index < workflowSteps.length - 1 && (
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 md:left-auto md:right-0 md:translate-x-6 md:translate-y-0 md:top-1/2 md:-translate-y-1/2 z-20">
                                            <motion.div
                                                animate={{ y: [0, 3, 0] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                                className="md:rotate-[-90deg]"
                                            >
                                                <ArrowDown className="h-5 w-5 text-teal-500 dark:text-teal-400" />
                                            </motion.div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mockup image */}
                <motion.div
                    variants={fadeInUp}
                    className="mx-auto mt-16 max-w-5xl rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/80 shadow-xl backdrop-blur-sm overflow-hidden"
                >
                    <div className="bg-gray-100/70 dark:bg-gray-900/70 px-6 py-3 flex items-center justify-between backdrop-blur-sm">
                        <div className="flex items-center space-x-2">
                            <div className="h-3 w-3 rounded-full bg-red-400"></div>
                            <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                            <div className="h-3 w-3 rounded-full bg-green-400"></div>
                        </div>
                        <div>
                            <span className="rounded-full bg-gray-200/70 dark:bg-gray-800/70 backdrop-blur-sm px-3 py-1 text-xs text-gray-600 dark:text-gray-400 font-medium">
                                wallet-assistant.app
                            </span>
                        </div>
                    </div>
                    <div className="bg-white p-6 dark:bg-gray-900/80 backdrop-blur-sm">
                        <div className="flex flex-col gap-6 md:flex-row">
                            <div className="flex-1 rounded-lg bg-gray-50/70 dark:bg-gray-800/40 p-6 border border-gray-200/60 dark:border-gray-700/40 backdrop-blur-sm">
                                <div className="mb-5 flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">AI Wallet Assistant</h3>
                                    </div>
                                    <div className="mt-3 rounded-full bg-gradient-to-r from-blue-500/10 to-teal-500/10 dark:from-blue-500/20 dark:to-teal-500/20 border border-blue-200/50 dark:border-blue-700/30 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 md:mt-0">
                                        Connected to Ethereum Mainnet
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-4">
                                    {/* User message */}
                                    <div className="ml-auto max-w-[80%] rounded-lg bg-gradient-to-r from-blue-500/10 to-teal-500/10 dark:from-blue-500/20 dark:to-teal-500/20 p-3.5 text-sm shadow-sm">
                                        Send 0.1 ETH to alice.eth
                                    </div>

                                    {/* AI Response */}
                                    <div className="max-w-[80%] rounded-lg bg-gray-100/70 dark:bg-gray-800/70 p-4 text-sm shadow-sm backdrop-blur-sm">
                                        <div className="mb-2 flex items-center text-blue-700 dark:text-blue-300 font-medium">
                                            <CheckCircle2 className="h-4 w-4 mr-1" /> Parsed Command
                                        </div>
                                        <ul className="space-y-1.5 text-gray-700 dark:text-gray-300">
                                            <li className="flex items-start">
                                                <span className="mr-2 text-blue-500 dark:text-blue-400">•</span>
                                                <span><strong>Action</strong>: Send ETH</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="mr-2 text-blue-500 dark:text-blue-400">•</span>
                                                <span><strong>Amount</strong>: 0.1 ETH (~$180)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="mr-2 text-blue-500 dark:text-blue-400">•</span>
                                                <span><strong>Recipient</strong>: 0x123...789 (ENS: <strong>alice.eth</strong>)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="mr-2 text-blue-500 dark:text-blue-400">•</span>
                                                <span><strong>Gas Fee</strong>: $1.20</span>
                                            </li>
                                        </ul>
                                        <div className="mt-4 flex gap-2">
                                            <button className="rounded-md bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 px-4 py-1.5 text-xs font-medium text-white shadow-sm transition-all duration-200">
                                                Confirm in MetaMask
                                            </button>
                                            <button className="rounded-md border border-blue-400/30 dark:border-blue-500/30 hover:border-blue-400/60 dark:hover:border-blue-500/60 px-4 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 transition-all duration-200">
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 rounded-lg border border-gray-200/60 dark:border-gray-700/40 p-6 md:w-1/3 bg-gray-50/70 dark:bg-gray-800/40 backdrop-blur-sm">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                                        <svg className="h-5 w-5 mr-1.5" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M32.9582 1L19.8241 10.7183L22.2845 5.12254L32.9582 1Z" fill="#E2761B" stroke="#E2761B" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M2.04178 1L15.0487 10.8232L12.7155 5.12254L2.04178 1Z" fill="#E4761B" stroke="#E4761B" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        MetaMask
                                    </h3>
                                    <div className="rounded-full bg-gradient-to-r from-orange-500/10 to-yellow-500/10 dark:from-orange-500/20 dark:to-yellow-500/20 border border-orange-200/50 dark:border-orange-700/30 px-3 py-1 text-xs font-medium text-orange-600 dark:text-orange-400">
                                        Confirm Transaction
                                    </div>
                                </div>

                                <div className="space-y-4 rounded-lg border border-gray-200/60 dark:border-gray-700/40 p-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm shadow-sm">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">From:</span>
                                        <span className="text-sm font-mono text-gray-800 dark:text-gray-200">0xYou...F4E2</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">To:</span>
                                        <span className="text-sm font-mono text-gray-800 dark:text-gray-200">alice.eth</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Amount:</span>
                                        <span className="text-sm text-gray-800 dark:text-gray-200">0.1 ETH</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Gas:</span>
                                        <span className="text-sm text-gray-800 dark:text-gray-200">$1.20</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Total:</span>
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">$181.20</span>
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <button className="w-full rounded-md bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200">
                                            Confirm
                                        </button>
                                        <button className="w-full rounded-md border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}