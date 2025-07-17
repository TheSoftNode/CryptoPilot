"use client";

import { useState, useRef, useEffect, KeyboardEvent, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Info, ChevronUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { buttonAnimation } from "@/lib/animations";
import { useCommandHistory } from "@/hooks/use-command-history";
import { EXAMPLE_COMMANDS } from "@/lib/constants";

interface CommandInputProps {
    onSendMessage: (message: string) => void;
    isWalletConnected: boolean;
    className?: string;
    disabled?: boolean;
}

export function CommandInput({ onSendMessage, isWalletConnected, className, disabled }: CommandInputProps) {
    const [message, setMessage] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const historyRef = useRef<HTMLDivElement>(null);

    const { commandHistory, addToHistory, navigateHistory, clearHistory } = useCommandHistory();

    // Memoize handlers to prevent unnecessary re-renders
    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();

        if (!message.trim() || disabled) return;

        onSendMessage(message);
        addToHistory(message);
        setMessage("");
        setShowSuggestions(false);
        setShowHistory(false);
    }, [message, disabled, onSendMessage, addToHistory]);

    const handleExampleClick = useCallback((exampleText: string) => {
        setMessage(exampleText);
        setShowSuggestions(false);
        setShowHistory(false);
        inputRef.current?.focus();
    }, []);

    const handleHistoryClick = useCallback((historyItem: string) => {
        setMessage(historyItem);
        setShowHistory(false);
        inputRef.current?.focus();
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        // Handle up/down for history navigation
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault();
            const direction = e.key === "ArrowUp" ? "up" : "down";
            const historyCommand = navigateHistory(direction);
            if (historyCommand !== null) {
                setMessage(historyCommand);
            }
        }
    }, [navigateHistory]);

    // Close panels when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Handle suggestions panel
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }

            // Handle history panel
            if (
                historyRef.current &&
                !historyRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setShowHistory(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <motion.div
            className={cn("relative z-10", className)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative rounded-lg border border-gray-300 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800/50">
                <form onSubmit={handleSubmit} className="flex items-center">
                    <Input
                        ref={inputRef}
                        placeholder={isWalletConnected
                            ? "What would you like to do? Try 'Send 0.1 ETH to...'"
                            : "Connect your wallet to start..."
                        }
                        className="border-0 bg-transparent py-4 text-gray-900 placeholder:text-gray-500 
                                 focus-visible:ring-0 focus-visible:ring-transparent 
                                 dark:text-white dark:placeholder:text-slate-400 
                                 sm:py-6"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onClick={() => setShowSuggestions(true)}
                        onKeyDown={handleKeyDown}
                        disabled={disabled || !isWalletConnected}
                    />

                    <div className="flex items-center gap-1 pr-2 sm:gap-2 sm:pr-3">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        type="button"
                                        onClick={() => {
                                            setShowHistory(!showHistory);
                                            setShowSuggestions(false);
                                        }}
                                        className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 sm:h-10 sm:w-10"
                                        disabled={disabled || !isWalletConnected || commandHistory.length === 0}
                                    >
                                        <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                                        <span className="sr-only">Command history</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                    <p>View command history</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        type="button"
                                        onClick={() => {
                                            setShowSuggestions(!showSuggestions);
                                            setShowHistory(false);
                                        }}
                                        className="h-8 w-8 p-0 text-gray-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 sm:h-10 sm:w-10"
                                        disabled={disabled || !isWalletConnected}
                                    >
                                        <Info className="h-4 w-4 sm:h-5 sm:w-5" />
                                        <span className="sr-only">Show examples</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                    <p>Show example commands</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <Button
                            type="submit"
                            size="sm"
                            className="h-8 w-8 rounded-full bg-blue-600 p-0 text-white hover:bg-blue-700 
                                     disabled:opacity-50 sm:h-10 sm:w-10
                                     dark:bg-blue-500 dark:hover:bg-blue-600"
                            disabled={!message.trim() || disabled || !isWalletConnected}
                            {...buttonAnimation}
                        >
                            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="sr-only">Send message</span>
                        </Button>
                    </div>
                </form>
            </div>

            {/* Command history panel */}
            <AnimatePresence>
                {showHistory && (
                    <motion.div
                        ref={historyRef}
                        className="absolute bottom-full mb-2 w-full rounded-lg border border-gray-300 bg-white shadow-lg 
                                 dark:border-slate-700 dark:bg-slate-800/95 dark:backdrop-blur-md"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex items-center justify-between border-b border-gray-200 p-3 dark:border-slate-700">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">Command History</span>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 text-xs text-gray-600 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400"
                                    onClick={clearHistory}
                                >
                                    Clear All
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-gray-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                                    onClick={() => setShowHistory(false)}
                                >
                                    <ChevronUp className="h-4 w-4" />
                                    <span className="sr-only">Close history</span>
                                </Button>
                            </div>
                        </div>
                        <div className="max-h-48 overflow-y-auto p-2 sm:max-h-60">
                            {commandHistory.length > 0 ? (
                                <div className="space-y-1">
                                    {commandHistory.map((command, index) => (
                                        <motion.button
                                            key={index}
                                            type="button"
                                            className="flex w-full items-center gap-3 rounded-md p-2 text-left text-sm 
                                                     text-gray-900 hover:bg-blue-50 dark:text-white dark:hover:bg-blue-500/10"
                                            onClick={() => handleHistoryClick(command)}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                        >
                                            <Clock className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                                            <span className="flex-1 truncate">{command}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-4 text-center text-sm text-gray-500 dark:text-slate-400">
                                    No command history yet
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Example commands suggestions */}
            <AnimatePresence>
                {showSuggestions && (
                    <motion.div
                        ref={suggestionsRef}
                        className="absolute bottom-full mb-2 w-full rounded-lg border border-gray-300 bg-white shadow-lg 
                                 dark:border-slate-700 dark:bg-slate-800/95 dark:backdrop-blur-md"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex items-center justify-between border-b border-gray-200 p-3 dark:border-slate-700">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">Example Commands</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-gray-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                                onClick={() => setShowSuggestions(false)}
                            >
                                <ChevronUp className="h-4 w-4" />
                                <span className="sr-only">Close suggestions</span>
                            </Button>
                        </div>
                        <div className="max-h-64 overflow-y-auto p-2 sm:max-h-80">
                            {EXAMPLE_COMMANDS.map((command) => (
                                <motion.button
                                    key={command.text}
                                    type="button"
                                    className="flex w-full items-start gap-3 rounded-md p-3 text-left 
                                             hover:bg-blue-50 dark:hover:bg-blue-500/10 sm:p-2"
                                    onClick={() => handleExampleClick(command.text)}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    {/* <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full 
                                                  bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                                        {command.icon}
                                    </div> */}
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                                            {command.text}
                                        </div>
                                        <div className="text-xs text-gray-600 dark:text-slate-400 mt-1">
                                            {command.description}
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}