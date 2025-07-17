"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { ChatInterface } from "@/components/Chat/ChatInterface";

export default function ChatPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex min-h-screen flex-col">

            <motion.main
                className="flex-1"
                variants={fadeInUp}
                initial="hidden"
                animate="show"
            >
                <ChatInterface />
            </motion.main>

        </div>
    );
}