"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { STORAGE_KEYS } from "@/lib/constants";

interface WelcomeBannerProps {
    onDismiss?: () => void;
    onTutorialClick?: () => void;
}

export function WelcomeBanner({ onDismiss, onTutorialClick }: WelcomeBannerProps) {
    const [showBanner, setShowBanner] = useLocalStorage(STORAGE_KEYS.IS_FIRST_VISIT, true);

    const handleDismiss = () => {
        setShowBanner(false);
        if (onDismiss) onDismiss();
    };

    const handleTutorialClick = () => {
        if (onTutorialClick) onTutorialClick();
        handleDismiss();
    };

    if (!showBanner) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="relative mb-4 rounded-lg border border-[#2081cb]/30 bg-[#2081cb]/5 p-4 pr-10 text-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                <button
                    onClick={handleDismiss}
                    className="absolute right-2 top-2 text-muted-foreground hover:text-[#2081cb]"
                    aria-label="Dismiss welcome banner"
                >
                    <X className="h-4 w-4" />
                </button>

                <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2081cb]/20 text-[#2081cb]">
                        <Info className="h-5 w-5" />
                    </div>

                    <div className="space-y-2">
                        <div>
                            <h3 className="font-medium">Welcome to the AI Wallet Assistant!</h3>
                            <p className="text-muted-foreground">
                                This assistant helps you manage your crypto with simple natural language commands.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                className="rounded-full border-[#2081cb]/50 text-[#2081cb] hover:bg-[#2081cb]/10"
                                onClick={handleTutorialClick}
                            >
                                View Tutorial
                            </Button>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="rounded-full hover:text-[#2081cb] hover:bg-[#2081cb]/10"
                                onClick={handleDismiss}
                            >
                                Dismiss
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}