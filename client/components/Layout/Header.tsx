"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import ThemeToggle from "../Shared/Theme-Toggle";
import { fadeIn } from "@/lib/animations";
import WalletConnectButton from "../Wallet/WalletConnectButton";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

interface HeaderProps {
    className?: string;
    variant?: "default" | "minimal";
}

export function Header({ className, variant = "default" }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    const navItems = [
        { name: "Assistant", href: "/chat" },
        { name: "Dashboard", href: "/dashboard" },
        { name: "Address Book", href: "/address-book" },
        { name: "Tutorial", href: "/tutorials" },
        { name: "Transactions", href: "/transactions" },
    ];

    return (
        <header
            className={cn(
                "sticky top-0 z-40 w-full border-b border-gray-800 transition-all duration-200 bg-gradient-mesh",
                scrolled
                    ? "bg-white/95 dark:bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-black/80"
                    : "bg-white/90 dark:bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-black/70",
                className
            )}
        >
            <div className="container px-2 mx-auto sm:px-4 lg:px-6">
                <div className="flex h-14 md:h-16 lg:h-20 items-center justify-between">
                    <motion.div
                        className="flex items-center gap-1 sm:gap-2"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
                            <CryptoPilotLogo />
                            {variant === "default" && (
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.15 }}
                                    className="flex"
                                >
                                    <span className="text-base font-bold bg-gradient-to-r from-blue-500 to-purple-600 dark:from-cyan-400 dark:to-pink-500 bg-clip-text text-transparent sm:text-lg lg:text-xl">
                                        CryptoPilot AI
                                    </span>
                                </motion.div>
                            )}
                        </Link>
                    </motion.div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden">
                        <div className="mt-1">
                            <ThemeToggle />
                        </div>

                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-foreground"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {mobileMenuOpen ? (
                                <X className="block h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>

                    {/* Desktop navigation */}
                    <div className="hidden md:flex items-center gap-2 lg:gap-4">
                        {variant === "default" && (
                            <nav className="flex items-center space-x-1 lg:space-x-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "px-2 py-2 text-xs font-medium transition-all duration-200 lg:px-3 lg:text-sm",
                                            pathname === item.href
                                                ? "text-foreground border-b-2 border-blue-500 dark:border-blue-400"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        )}
                        <div className="flex items-center space-x-2 border-l pl-2 ml-2 border-border lg:space-x-3 lg:pl-4 lg:ml-4">
                            <ThemeToggle />
                            <WalletConnectButton />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                    height: mobileMenuOpen ? "auto" : 0,
                    opacity: mobileMenuOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden bg-white/95 dark:bg-black/95 backdrop-blur border-b border-gray-200 dark:border-gray-800 z-40 absolute w-full"
            >
                {variant === "default" && (
                    <div className="px-3 pt-2 pb-4 space-y-1 sm:px-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "block px-3 py-2 text-sm font-medium border-l-2 sm:text-base",
                                    pathname === item.href
                                        ? "border-blue-500 text-foreground"
                                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-blue-300"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="pt-4 mt-4 border-t border-border">
                            <div className="mt-2 justify-center flex items-center">
                                <WalletConnectButton />
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </header>
    );
}

// Custom CryptoPilot Logo component
const CryptoPilotLogo = () => {
    return (
        <div className="relative w-8 h-8 sm:w-10 sm:h-10">
            <motion.svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.1
                }}
                className="w-full h-full"
            >
                {/* Hexagonal base */}
                <path
                    d="M20 0L37.3205 10V30L20 40L2.67949 30V10L20 0Z"
                    fill="url(#hexGradient)"
                />

                {/* Fox-like mask inspired triangular shapes */}
                <path
                    d="M20 8L28 15L25 22L20 26L15 22L12 15L20 8Z"
                    fill="#ffffff"
                    fillOpacity="0.7"
                    stroke="url(#accentGradient)"
                    strokeWidth="1.5"
                />

                {/* Central circular element */}
                <circle
                    cx="20"
                    cy="19"
                    r="4"
                    fill="url(#accentGradient)"
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
                    <linearGradient id="hexGradient" x1="2.67949" y1="10" x2="37.3205" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FF5733" className="dark:stop-color-[#E2761B]" />
                        <stop offset="1" stopColor="#3498DB" className="dark:stop-color-[#BD59FF]" />
                    </linearGradient>
                    <linearGradient id="accentGradient" x1="12" y1="15" x2="28" y2="22" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F43F5E" className="dark:stop-color-[#F43F5E]" />
                        <stop offset="1" stopColor="#8B5CF6" className="dark:stop-color-[#06B6D4]" />
                    </linearGradient>
                    </defs>
            </motion.svg>
        </div>
    );
};