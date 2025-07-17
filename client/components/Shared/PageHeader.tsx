"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";

interface PageHeaderProps {
    title: string;
    description?: string;
    badge?: string;
    children?: ReactNode;
    centered?: boolean;
    className?: string;
}

export function PageHeader({
    title,
    description,
    badge,
    children,
    centered = false,
    className,
}: PageHeaderProps) {
    return (
        <motion.div
            className={cn(
                "container py-8 md:py-12",
                centered && "text-center",
                className
            )}
            variants={fadeInUp}
            initial="hidden"
            animate="show"
        >
            <div
                className={cn(
                    "mx-auto flex max-w-[58rem] flex-col gap-4",
                    centered && "items-center"
                )}
            >
                {badge && (
                    <span className="rounded-full bg-[#2081cb]/10 px-3 py-1 text-sm font-medium text-[#2081cb]">
                        {badge}
                    </span>
                )}

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                    {title}
                </h1>

                {description && (
                    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                        {description}
                    </p>
                )}

                {children}
            </div>
        </motion.div>
    );
}