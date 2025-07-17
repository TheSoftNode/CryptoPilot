"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Github, Twitter, Linkedin, ChevronRight, Book, MessageSquare, Shield } from "lucide-react";
import { fadeIn } from "@/lib/animations";

interface FooterProps {
    className?: string;
}

export function Footer({ className }: FooterProps) {
    return (
        <motion.footer
            className={cn(
                "relative border-t border-gray-800 bg-white dark:bg-black transition-all duration-200",
                className
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
        >
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/30 dark:to-blue-950/20 pointer-events-none"></div>

            <div className="container px-4 mx-auto relative">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10 md:py-14">
                    {/* Brand Column */}
                    <motion.div
                        className="md:col-span-1"
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <CryptoPilotLogoSmall />
                            <span className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-400 dark:to-pink-500 bg-clip-text text-transparent">
                                CryptoPilot AI
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                            Simplifying crypto management with natural language commands and MetaMask integration.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link
                                href="https://github.com"
                                className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Github className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link
                                href="https://twitter.com"
                                className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Twitter className="h-4 w-4" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link
                                href="https://linkedin.com"
                                className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Linkedin className="h-4 w-4" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Nav Links Columns */}
                    <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/chat" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center group">
                                        <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        Assistant
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/dashboard" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center group">
                                        <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/address-book" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center group">
                                        <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        Address Book
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/transactions" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center group">
                                        <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        Transactions
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/tutorials" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center group">
                                        <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        Tutorials
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/faq" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center group">
                                        <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/blog" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center group">
                                        <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/docs" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center group">
                                        <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        Documentation
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center group">
                                        <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center group">
                                        <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center group">
                                        <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center group">
                                        <ChevronRight className="h-3 w-3 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        Terms of Service
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter Column */}
                    <div className="md:col-span-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Stay Connected</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Subscribe to our newsletter for updates on new features and crypto insights.
                        </p>
                        <div className="flex mb-4">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <button className="px-3 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-r-md transition-colors">
                                Subscribe
                            </button>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                            <Shield className="h-3 w-3" />
                            <span>We respect your privacy</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Border */}
                <div className="border-t border-gray-200 dark:border-gray-800 mt-2"></div>

                {/* Copyright Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between py-6 text-sm text-gray-500 dark:text-gray-400">
                    <p>© {new Date().getFullYear()} CryptoPilot AI. All rights reserved.</p>
                    <div className="flex items-center mt-4 md:mt-0">
                        <span className="flex items-center">
                            <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                            <span>Need help? <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact us</a></span>
                        </span>
                        <span className="mx-4">•</span>
                        <span className="flex items-center">
                            <Book className="h-3.5 w-3.5 mr-1.5" />
                            <span>Read our <a href="/docs" className="text-blue-600 dark:text-blue-400 hover:underline">documentation</a></span>
                        </span>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
}

// Smaller version of the logo for the footer
const CryptoPilotLogoSmall = () => {
    return (
        <div className="relative w-8 h-8">
            <svg
                width="32"
                height="32"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Hexagonal base */}
                <path
                    d="M20 0L37.3205 10V30L20 40L2.67949 30V10L20 0Z"
                    fill="url(#hexGradientFooter)"
                />

                {/* Fox-like mask inspired triangular shapes */}
                <path
                    d="M20 8L28 15L25 22L20 26L15 22L12 15L20 8Z"
                    fill="#ffffff"
                    fillOpacity="0.7"
                    stroke="url(#accentGradientFooter)"
                    strokeWidth="1.5"
                />

                {/* Central circular element */}
                <circle
                    cx="20"
                    cy="19"
                    r="4"
                    fill="url(#accentGradientFooter)"
                />

                {/* Digital circuit lines */}
                <path
                    d="M20 23L20 28M16 19H10M24 19H30M15 24L10 30M25 24L30 30"
                    stroke="#ffffff"
                    strokeOpacity="0.8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />

                {/* Gradients */}
                <defs>
                    <linearGradient id="hexGradientFooter" x1="2.67949" y1="10" x2="37.3205" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF5733" />
                        <stop offset="1" stopColor="#3498DB" />
                    </linearGradient>
                    <linearGradient id="accentGradientFooter" x1="12" y1="15" x2="28" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F43F5E" />
                        <stop offset="1" stopColor="#8B5CF6" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};