"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

interface LoadingIndicatorProps {
    className?: string;
}

export function LoadingIndicator({ className }: LoadingIndicatorProps) {
    // Define animations for the loading dots
    const loadingContainerVariants = {
        initial: {
            transition: {
                staggerChildren: 0.2,
            },
        },
        animate: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    // Dots Animation
    const loadingDotVariants = {
        initial: {
            y: "0%",
        },
        animate: {
            y: ["0%", "-50%", "0%"],
            transition: {
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    return (
        <div className={`flex items-center gap-2 px-4 py-3 ${className}`}>
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2081cb]/20 text-[#2081cb]">
                <Bot className="h-3 w-3" />
            </div>

            <motion.div
                className="flex items-center gap-1"
                variants={loadingContainerVariants}
                initial="initial"
                animate="animate"
            >
                <span className="text-sm text-muted-foreground">AI is thinking</span>
                <div className="flex space-x-1">
                    {[0, 1, 2].map((dot) => (
                        <motion.span
                            key={dot}
                            className="h-1 w-1 rounded-full bg-[#2081cb]/60"
                            variants={loadingDotVariants}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}