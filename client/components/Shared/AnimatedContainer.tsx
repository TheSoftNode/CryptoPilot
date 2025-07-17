"use client";

import { ReactNode } from "react";
import { motion, MotionProps, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedContainerProps extends MotionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    animation?: "fadeIn" | "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight" | "zoomIn" | "slideInBottom";
    viewport?: {
        once?: boolean;
        amount?: number;
    };
}

export function AnimatedContainer({
    children,
    className,
    delay = 0,
    duration = 0.5,
    animation = "fadeIn",
    viewport,
    ...props
}: AnimatedContainerProps) {
    const getAnimation = (): Variants => {
        switch (animation) {
            case "fadeInUp":
                return {
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            delay,
                            duration,
                            ease: "easeOut",
                        },
                    },
                };
            case "fadeInDown":
                return {
                    hidden: { opacity: 0, y: -30 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            delay,
                            duration,
                            ease: "easeOut",
                        },
                    },
                };
            case "fadeInLeft":
                return {
                    hidden: { opacity: 0, x: -30 },
                    visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                            delay,
                            duration,
                            ease: "easeOut",
                        },
                    },
                };
            case "fadeInRight":
                return {
                    hidden: { opacity: 0, x: 30 },
                    visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                            delay,
                            duration,
                            ease: "easeOut",
                        },
                    },
                };
            case "zoomIn":
                return {
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                            delay,
                            duration,
                            ease: "easeOut",
                        },
                    },
                };
            case "slideInBottom":
                return {
                    hidden: { opacity: 0, y: 100 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            delay,
                            duration,
                            type: "spring",
                            stiffness: 100,
                            damping: 15,
                        },
                    },
                };
            default: // fadeIn
                return {
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            delay,
                            duration,
                            ease: "easeOut",
                        },
                    },
                };
        }
    };

    return (
        <motion.div
            className={cn(className)}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={getAnimation()}
            viewport={viewport ? { once: viewport.once, amount: viewport.amount } : undefined}
            {...props}
        >
            {children}
        </motion.div>
    );
}