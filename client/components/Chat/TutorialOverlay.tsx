"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, ArrowRight, Wallet, MessageSquare, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp } from "@/lib/animations";

interface TutorialOverlayProps {
    onClose: () => void;
}

export function TutorialOverlay({ onClose }: TutorialOverlayProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            title: "Welcome to AI Wallet Assistant",
            description: "Your intelligent companion for managing cryptocurrency transactions with natural language commands.",
            icon: <MessageSquare className="h-10 w-10 text-[#2081cb]" />,
        },
        {
            title: "Connect Your Wallet",
            description: "First, connect your MetaMask wallet by clicking the 'Connect Wallet' button in the top right corner.",
            icon: <Wallet className="h-10 w-10 text-[#2081cb]" />,
        },
        {
            title: "Send Commands Naturally",
            description: "Type commands like 'Send 0.1 ETH to alice.eth' or 'Show my balance' in the input box below.",
            icon: <Send className="h-10 w-10 text-[#2081cb]" />,
        },
        {
            title: "Review Transactions",
            description: "Before any transaction is sent, you'll see a clear summary and can confirm in MetaMask.",
            icon: <ShieldCheck className="h-10 w-10 text-[#2081cb]" />,
        },
    ];

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onClose();
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="relative mx-auto max-w-lg rounded-xl border bg-background p-6 shadow-lg"
                variants={fadeInUp}
                initial="hidden"
                animate="show"
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-muted-foreground hover:text-[#2081cb]"
                >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </button>

                <div className="mb-6 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#2081cb]/10">
                        {steps[currentStep].icon}
                    </div>
                    <h2 className="mb-2 text-2xl font-bold">{steps[currentStep].title}</h2>
                    <p className="text-muted-foreground">{steps[currentStep].description}</p>
                </div>

                <div className="mb-6 flex justify-center">
                    {steps.map((_, index) => (
                        <div
                            key={index}
                            className={`mx-1 h-2 w-2 rounded-full ${index === currentStep ? "bg-[#2081cb]" : "bg-muted"
                                }`}
                        />
                    ))}
                </div>

                <div className="flex justify-between">
                    <Button
                        variant="ghost"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="text-muted-foreground hover:text-[#2081cb] rounded-full"
                    >
                        Back
                    </Button>
                    <Button
                        onClick={nextStep}
                        className="bg-[#2081cb] hover:bg-[#296ea3] text-white rounded-full"
                    >
                        {currentStep === steps.length - 1 ? "Get Started" : "Next"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
}