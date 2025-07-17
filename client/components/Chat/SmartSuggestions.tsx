"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccount, useBalance } from "wagmi";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";
import { getChains } from '@wagmi/core'
import { config } from "../Provider/wallet-provider";


interface SmartSuggestionsProps {
    onSuggestionClick: (suggestion: string) => void;
    className?: string;
}

export function SmartSuggestions({ onSuggestionClick, className }: SmartSuggestionsProps) {
    const [visible, setVisible] = useState(true);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const { isConnected, address } = useAccount();
    const { data: balanceData } = useBalance({ address });
    const chains = getChains(config)


    const balance = balanceData ? balanceData.formatted : "0";
    const network = chains ? chains[0] : "ethereum";

    // Generate contextual suggestions based on wallet state
    useEffect(() => {
        if (!isConnected) {
            setSuggestions([]);
            return;
        }

        const newSuggestions: string[] = [];

        // Suggest checking balance
        newSuggestions.push("Show my balance");

        // If there's a balance, suggest sending a small amount
        if (balance && parseFloat(balance) > 0.01) {
            newSuggestions.push(`Send 0.01 ETH to vitalik.eth`);
        }
        // Suggest swapping if they have some balance
        if (balance && parseFloat(balance) > 0.01) {
            newSuggestions.push(`Swap 0.01 ETH for DAI`);
        }

        // Suggest transaction history 
        newSuggestions.push("Show my recent transactions");

        // Network-specific suggestions
        if (network && network !== "ethereum") {
            newSuggestions.push("Switch to Ethereum mainnet");
        } else {
            // If they're on mainnet, suggest viewing gas prices
            newSuggestions.push("What are the current gas prices?");
        }

        setSuggestions(newSuggestions);
    }, [isConnected, balance, network]);

    if (!isConnected || !visible || suggestions.length === 0) {
        return null;
    }

    return (
        <motion.div
            className={cn(
                "mb-4 rounded-lg border border-[#2081cb]/20 bg-[#2081cb]/5 p-3",
                className
            )}
            variants={fadeInUp}
            initial="hidden"
            animate="show"
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                    <Lightbulb className="h-4 w-4 text-[#2081cb]" />
                    <span>Suggested Commands</span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 -mr-1 text-muted-foreground hover:text-[#2081cb]"
                    onClick={() => setVisible(false)}
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Dismiss suggestions</span>
                </Button>
            </div>

            <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                    {suggestions.map((suggestion, index) => (
                        <motion.button
                            key={suggestion}
                            className="flex items-center gap-1 rounded-full border border-[#2081cb]/30 bg-[#2081cb]/10 px-3 py-1 text-xs font-medium text-[#2081cb] hover:bg-[#2081cb]/20"
                            onClick={() => onSuggestionClick(suggestion)}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            {suggestion}
                            <ChevronRight className="h-3 w-3" />
                        </motion.button>
                    ))}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}