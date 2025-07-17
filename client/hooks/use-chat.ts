"use client";

import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Message } from "@/components/Chat/MessageBubble";

// Initial welcome message
const DEFAULT_MESSAGES: Message[] = [
    {
        id: uuidv4(),
        role: "assistant",
        content: "👋 Hello! I'm your AI Wallet Assistant. Connect your wallet and tell me what you'd like to do. You can send transactions, check balances, or swap tokens using simple commands.\n\n**Example:** Try typing 'Send 0.1 ETH to alice.eth' or 'Show my balance'.",
        timestamp: new Date(),
    },
];

interface ChatState {
    messages: Message[];
    loading: boolean;
    error: string | null;
}

export function useChat() {
    // Store chat history in local storage
    const [storedMessages, setStoredMessages] = useLocalStorage<Message[]>(
        "ai-wallet-chat-history",
        DEFAULT_MESSAGES
    );

    const [state, setState] = useState<ChatState>({
        messages: storedMessages || DEFAULT_MESSAGES,
        loading: false,
        error: null,
    });

    // Update local storage when messages change
    useEffect(() => {
        if (state.messages !== storedMessages) {
            setStoredMessages(state.messages);
        }
    }, [state.messages, storedMessages, setStoredMessages]);

    // Send a message
    const sendMessage = useCallback(
        async (content: string) => {
            if (!content.trim()) return;

            // Add user message to the chat
            const userMessage: Message = {
                id: uuidv4(),
                role: "user",
                content: content.trim(),
                timestamp: new Date(),
            };

            setState((prev) => ({
                ...prev,
                messages: [...prev.messages, userMessage],
                loading: true,
            }));

            try {
                // In a real app, this would be an API call to process the message
                // For demo, we'll simulate a delay and return a mock response
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // Create a simple AI response based on the user's message
                const aiResponse = createMockResponse(content.trim());

                // Add AI response to the chat
                const assistantMessage: Message = {
                    id: uuidv4(),
                    role: "assistant",
                    content: aiResponse,
                    timestamp: new Date(),
                };

                setState((prev) => ({
                    ...prev,
                    messages: [...prev.messages, assistantMessage],
                    loading: false,
                }));
            } catch (error) {
                console.error("Error processing message:", error);
                setState((prev) => ({
                    ...prev,
                    loading: false,
                    error: "Failed to process your message. Please try again.",
                }));
            }
        },
        []
    );

    // Clear error
    const clearError = useCallback(() => {
        setState((prev) => ({ ...prev, error: null }));
    }, []);

    // Clear chat history
    const clearChat = useCallback(() => {
        setState({
            messages: DEFAULT_MESSAGES,
            loading: false,
            error: null,
        });
    }, []);

    return {
        messages: state.messages,
        loading: state.loading,
        error: state.error,
        sendMessage,
        clearError,
        clearChat,
    };
}

// Helper function to generate mock AI responses
function createMockResponse(userMessage: string): string {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
        return "Hello! How can I help you with your crypto wallet today?";
    }

    if (lowerCaseMessage.includes("balance")) {
        return "To check your balance, please make sure your wallet is connected. Then I can retrieve that information for you.";
    }

    if (lowerCaseMessage.includes("send") && (lowerCaseMessage.includes("eth") || lowerCaseMessage.includes("ether"))) {
        return "I'll help you send ETH. Please provide the recipient address and amount if you haven't already.";
    }

    if (lowerCaseMessage.includes("swap")) {
        return "I can help you swap tokens. Please specify which tokens you'd like to swap and the amount.";
    }

    if (lowerCaseMessage.includes("gas") || lowerCaseMessage.includes("fee")) {
        return "Current gas prices on Ethereum are: Low: 25 gwei (~$1.20), Average: 35 gwei (~$1.80), Fast: 50 gwei (~$2.50).";
    }

    if (lowerCaseMessage.includes("thanks") || lowerCaseMessage.includes("thank you")) {
        return "You're welcome! Is there anything else I can help you with?";
    }

    // Default fallback response
    return "I'm not sure how to help with that specific request. You can try commands like 'Show my balance', 'Send ETH to...', or 'Swap tokens'.";
}