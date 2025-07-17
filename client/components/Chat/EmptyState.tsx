"use client";

import { motion } from "framer-motion";
import { Wallet, MessageSquare, Lightbulb } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { EXAMPLE_COMMANDS } from "@/lib/constants";
import WalletConnectButton from "@/components/Wallet/WalletConnectButton";

interface EmptyStateProps {
    isWalletConnected: boolean;
    onConnect: () => void;
    onExampleClick: (example: string) => void;
}

export function EmptyState({ isWalletConnected, onConnect, onExampleClick }: EmptyStateProps) {
    return (
        <motion.div
            className="flex h-full flex-col items-center justify-center p-6 text-center"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
        >
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#2081cb]/10">
                <MessageSquare className="h-10 w-10 text-[#2081cb]" />
            </div>

            <h2 className="mb-2 text-2xl font-bold">AI Wallet Assistant</h2>

            <p className="mb-8 max-w-md text-muted-foreground">
                {isWalletConnected
                    ? "Start the conversation by typing a command in the input box below."
                    : "Connect your wallet to start managing your crypto with simple, natural language commands."}
            </p>

            {!isWalletConnected ? (
                <WalletConnectButton
                    variant="large"
                    className="bg-[#2081cb] text-white hover:bg-[#296ea3]"
                />
            ) : (
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-[#2081cb]" />
                        <span className="font-medium">Try these example commands:</span>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {EXAMPLE_COMMANDS.slice(0, 4).map((command, index) => (
                            <motion.button
                                key={index}
                                className="flex items-start gap-3 rounded-md border p-3 text-left transition-colors hover:bg-[#2081cb]/10 hover:border-[#2081cb]/30"
                                onClick={() => onExampleClick(command.text)}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex-1">
                                    <p className="font-medium">"{command.text}"</p>
                                    <p className="text-sm text-muted-foreground">{command.description}</p>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
}