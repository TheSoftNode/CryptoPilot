"use client";

import { motion } from "framer-motion";
import { Wallet } from "lucide-react";

interface LogoProps {
    size?: number;
    className?: string;
}

export function Logo({ size = 32, className }: LogoProps) {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150 }}
            className={className}
        >
            <Wallet size={size} className="text-[#F6851B]" />
        </motion.div>
    );
}