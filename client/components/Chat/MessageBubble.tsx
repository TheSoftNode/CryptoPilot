"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { User, Bot, Copy, CheckCheck } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";
import { AddressRecognition } from "./AddressRecognition";

export interface Message {
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: Date;
}

interface MessageBubbleProps {
    message: Message;
    isLastMessage: boolean;
}

export function MessageBubble({ message, isLastMessage }: MessageBubbleProps) {
    const [copied, setCopied] = useState(false);

    const isUser = message.role === "user";

    const copyToClipboard = useCallback(() => {
        navigator.clipboard.writeText(message.content);
        setCopied(true);

        // Reset copied state after 2 seconds
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }, [message.content]);

    return (
        <motion.div
            className={cn(
                "flex w-full px-2 sm:px-4",
                isUser ? "justify-end" : "justify-start"
            )}
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: 20 }}
        >
            <div
                className={cn(
                    "group relative mb-4 flex max-w-[85%] flex-col rounded-xl px-3 py-3 text-sm shadow-sm sm:max-w-[80%] sm:px-4 sm:py-4",
                    isUser
                        ? "bg-blue-600 text-white dark:bg-blue-500"
                        : "bg-white border border-gray-200 text-gray-900 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                )}
            >
                <div className="flex items-center gap-2 sm:gap-3">
                    <div
                        className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full sm:h-7 sm:w-7",
                            isUser
                                ? "bg-white/20 text-white"
                                : "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
                        )}
                    >
                        {isUser ? (
                            <User className="h-3 w-3 sm:h-4 sm:w-4" />
                        ) : (
                            <Bot className="h-3 w-3 sm:h-4 sm:w-4" />
                        )}
                    </div>
                    <span className={cn(
                        "font-medium text-xs sm:text-sm",
                        isUser 
                            ? "text-white" 
                            : "text-gray-900 dark:text-white"
                    )}>
                        {isUser ? "You" : "AI Wallet Assistant"}
                    </span>

                    <button
                        onClick={copyToClipboard}
                        className={cn(
                            "ml-auto opacity-0 transition-opacity duration-200 group-hover:opacity-100 p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10",
                            copied ? "text-emerald-400" : isUser ? "text-white/70 hover:text-white" : "text-gray-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                        )}
                        aria-label="Copy message"
                    >
                        {copied ? (
                            <CheckCheck className="h-4 w-4" />
                        ) : (
                            <Copy className="h-4 w-4" />
                        )}
                    </button>
                </div>

                <div className={cn(
                    "mt-2 leading-relaxed text-sm sm:text-base",
                    isUser ? "text-white" : "text-gray-900 dark:text-white"
                )}>
                    {isUser ? (
                        <div className="space-y-2">
                            <div className="break-words">
                                {message.content}
                            </div>
                            <AddressRecognition text={message.content} />
                        </div>
                    ) : (
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                            <ReactMarkdown
                                components={{
                                    a: ({ node, ...props }) => (
                                        <a
                                            {...props}
                                            className="text-blue-600 underline underline-offset-2 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        />
                                    ),
                                    ul: ({ node, ...props }) => (
                                        <ul {...props} className="ml-4 list-disc space-y-1" />
                                    ),
                                    ol: ({ node, ...props }) => (
                                        <ol {...props} className="ml-4 list-decimal space-y-1" />
                                    ),
                                    li: ({ node, ...props }) => (
                                        <li {...props} className="ml-2" />
                                    ),
                                    pre: ({ node, ...props }) => (
                                        <pre
                                            {...props}
                                            className="mt-2 overflow-auto rounded-md bg-gray-100 p-2 text-xs dark:bg-slate-900/50 sm:text-sm"
                                        />
                                    ),
                                    code: ({ node, inline, ...props }: any) =>
                                        inline ? (
                                            <code
                                                {...props}
                                                className="rounded-md bg-gray-100 px-1 py-0.5 text-xs font-mono dark:bg-slate-900/50 sm:text-sm"
                                            />
                                        ) : (
                                            <code {...props} className="text-xs font-mono sm:text-sm" />
                                        ),
                                    h3: ({ node, ...props }) => (
                                        <h3 {...props} className="mb-2 mt-4 text-base font-bold sm:text-lg" />
                                    ),
                                    p: ({ node, ...props }) => (
                                        <p {...props} className="mb-2 last:mb-0" />
                                    ),
                                    strong: ({ node, ...props }) => (
                                        <strong {...props} className="font-bold" />
                                    ),
                                    blockquote: ({ node, ...props }) => (
                                        <blockquote
                                            {...props}
                                            className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-slate-300"
                                        />
                                    ),
                                    hr: ({ node, ...props }) => (
                                        <hr {...props} className="my-4 border-gray-200 dark:border-slate-700" />
                                    ),
                                }}
                            >
                                {message.content}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>

                <time className={cn(
                    "mt-2 text-right text-xs",
                    isUser 
                        ? "text-white/70" 
                        : "text-gray-500 dark:text-slate-400"
                )}>
                    {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </time>
            </div>
        </motion.div>
    );
}