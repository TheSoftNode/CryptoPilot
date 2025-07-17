"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { useWalletContext } from "../Provider/wallet-provider";
import { useChat } from "@/hooks/use-chat";
import { useAddressBook } from "@/hooks/use-address-book";
import { formatUSD, truncateAddress } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";

import { initialMessages, mockTransactions } from "@/lib/mock-data";
import { Message, MessageBubble } from "./MessageBubble";
import { TransactionDetails, TransactionSummary } from "./TransactionSummary";
import { ConnectModal } from "../Wallet/ConnectModal";
import { TutorialOverlay } from "./TutorialOverlay";
import { NetworkIndicator } from "../Wallet/NetworkIndicator";
import { WalletStatus } from "../Wallet/WalletStatus";
import { WelcomeBanner } from "./WelcomeBanner";
import { EmptyState } from "./EmptyState";
import { LoadingIndicator } from "./LoadingIndicator";
import { CommandInput } from "./CommandInput";
import { SmartSuggestions } from "./SmartSuggestions";
import { KeyboardShortcuts } from "./KeyboardShortcuts";
import { TransactionForm } from "./TransactionForm";

export function ChatInterface() {
    // Replace useWallet with wagmi hooks
    const { address, isConnected } = useAccount();
    const { data: balanceData } = useBalance({
        address,
    });
    const { connectors, connect } = useConnect();
    const { isConnecting, setIsConnecting } = useWalletContext();

    const { messages: chatMessages, sendMessage, loading } = useChat();
    const { addressBook } = useAddressBook();
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [showTutorial, setShowTutorial] = useState(false);
    const [isProcessingTx, setIsProcessingTx] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState<TransactionDetails | null>(null);
    const [txError, setTxError] = useState<string | null>(null);
    const [showConnectModal, setShowConnectModal] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [showTransactionForm, setShowTransactionForm] = useState(false);
    const [transactionFormData, setTransactionFormData] = useState<{
        amount: string;
        recipient: string;
        recipientName?: string;
    } | null>(null);

    // Get formatted balance from wagmi data
    const balance = balanceData ? balanceData.formatted.substring(0, 7) : "0";

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages update
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Memoize handlers to prevent unnecessary re-renders
    const handleSendMessage = useCallback((content: string) => {
        // Add user message
        const userMessage: Message = {
            id: uuidv4(),
            role: "user",
            content,
            timestamp: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // Process message (in a real app, this would involve AI processing)
        processUserMessage(content);
    }, []);

    const processUserMessage = useCallback((content: string) => {
        // Simulate AI processing delay
        setTimeout(() => {
            
            const lowerContent = content.toLowerCase();

            // Handle different command types
            if (lowerContent.includes("send") && (lowerContent.includes("eth") || lowerContent.includes("ether"))) {
                // Parse send transaction
                handleSendTransaction(content);
            } else if (lowerContent.includes("swap")) {
                // Parse swap transaction
                handleSwapTransaction(content);
            } else if (lowerContent.includes("balance")) {
                // Handle balance request
                respondWithBalance();
            } else if (lowerContent.includes("transaction") &&
                (lowerContent.includes("history") || lowerContent.includes("recent"))) {
                handleShowTransactionHistory();
            } else {
                // Default response for unrecognized commands
                const assistantMessage: Message = {
                    id: uuidv4(),
                    role: "assistant",
                    content: "I'm not sure how to process that command. Try something like 'Send 0.1 ETH to alice.eth' or 'Show my balance'.",
                    timestamp: new Date(),
                };
                setMessages((prevMessages) => [...prevMessages, assistantMessage]);
            }
        }, 800); // Simulate processing time
    }, [addressBook, balance]);

    const handleShowTransactionHistory = useCallback(() => {
        // Get recent transactions from mock data
        const recentTxs = mockTransactions.slice(0, 3);

        let content = "Here are your recent transactions:\n\n";

        recentTxs.forEach((tx, index) => {
            const formattedDate = new Date(tx.timestamp).toLocaleDateString();

            content += `${index + 1}. **${tx.type === 'send' ? 'Sent' : tx.type === 'receive' ? 'Received' : 'Swapped'}** ${tx.value} ${tx.token}`;

            if (tx.type === 'send') {
                content += ` to ${truncateAddress(tx.to)}`;
            } else if (tx.type === 'receive') {
                content += ` from ${truncateAddress(tx.from)}`;
            } else if (tx.type === 'swap' && tx.tokenAmount) {
                content += ` for ${tx.tokenAmount}`;
            }

            content += ` (${formattedDate})\n`;
        });

        content += "\nYou can view your full transaction history in the Transactions tab.";

        // Add assistant message
        const assistantMessage: Message = {
            id: uuidv4(),
            role: "assistant",
            content,
            timestamp: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    }, []);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl+Space to show suggestions
            if (e.ctrlKey && e.code === "Space") {
                e.preventDefault();
                setShowSuggestions(true);
            }

            // Ctrl+K to clear chat
            if (e.ctrlKey && e.key === "k") {
                e.preventDefault();
                // Ask for confirmation before clearing
                if (window.confirm("Clear the current conversation?")) {
                    setMessages(initialMessages);
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleSendTransaction = useCallback((content: string) => {
        // Basic parsing for demo
        const amountMatch = content.match(/\d+\.?\d*/);
        const amount = amountMatch ? amountMatch[0] : "0.1";

        const addressMatch = content.match(/to\s+([^\s]+)/i);
        const recipient = addressMatch ? addressMatch[1] : "";

        // Determine if there's an ENS name
        const isEns = recipient.endsWith(".eth");

        let recipientAddress = recipient;
        let recipientName;

        // If it's an ENS name or potential address book entry
        if (isEns || recipient) {
            // Check address book for matches by name
            const addressEntry = addressBook.find(
                entry => entry.name.toLowerCase() === recipient.toLowerCase()
            );

            if (addressEntry) {
                recipientAddress = addressEntry.address;
                recipientName = addressEntry.name;
            } else if (isEns) {
                // In a real app, we'd resolve ENS names
                recipientAddress = "0x1234...5678"; // Mock address
                recipientName = recipient;
            }
        }

        // Open transaction form instead of just showing summary
        setShowTransactionForm(true);
        setTransactionFormData({
            amount,
            recipient: recipientAddress,
            recipientName
        });
    }, [addressBook]);

    const handleSwapTransaction = useCallback((content: string) => {
        // Basic parsing for demo
        const fromAmountMatch = content.match(/\d+\.?\d*/);
        const fromAmount = fromAmountMatch ? fromAmountMatch[0] : "0.5";

        const fromTokenMatch = content.match(/\b(eth|dai|usdc|wbtc)\b/i);
        const fromToken = (fromTokenMatch ? fromTokenMatch[0] : "ETH").toUpperCase();

        const toTokenMatch = content.match(/for\s+([^\s]+)/i);
        const toToken = toTokenMatch
            ? toTokenMatch[1].toUpperCase()
            : fromToken === "ETH"
                ? "DAI"
                : "ETH";

        // Mock exchange rate and received amount
        const mockRates = {
            "ETH-DAI": 1800,
            "ETH-USDC": 1800,
            "ETH-WBTC": 0.05,
            "DAI-ETH": 1 / 1800,
            "USDC-ETH": 1 / 1800,
            "WBTC-ETH": 20,
        };

        const pairKey = `${fromToken}-${toToken}` as keyof typeof mockRates;
        const rate = mockRates[pairKey] || 1;
        const toAmount = (parseFloat(fromAmount) * rate).toFixed(
            toToken === "WBTC" ? 6 : toToken === "ETH" ? 4 : 2
        );

        // Create mock transaction details
        const txDetails: TransactionDetails = {
            type: "swap",
            from: address || "",
            to: "0xUniswap...Router", // Mock swap router
            amount: fromAmount,
            token: fromToken,
            usdValue: parseFloat(fromAmount) * (fromToken === "ETH" ? 1800 : fromToken === "WBTC" ? 36000 : 1),
            toToken,
            toAmount,
            toUsdValue: parseFloat(toAmount) * (toToken === "ETH" ? 1800 : toToken === "WBTC" ? 36000 : 1),
            exchangeRate: `1 ${fromToken} = ${rate} ${toToken}`,
            gasFee: 5.75, // Swaps are more expensive
            network: "ethereum",
        };

        setCurrentTransaction(txDetails);

        // Add transaction to chat
        const assistantMessage: Message = {
            id: uuidv4(),
            role: "assistant",
            content: `I've parsed your command to swap ${fromAmount} ${fromToken} for ${toToken}. Please review the transaction details and confirm.`,
            timestamp: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    }, [address]);

    const respondWithBalance = useCallback(() => {
        const assistantMessage: Message = {
            id: uuidv4(),
            role: "assistant",
            content: `Your current wallet balance is:\n\n- **${balance} ETH** (${formatUSD(parseFloat(balance || "0") * 1800)})\n\nIs there anything else you'd like to do?`,
            timestamp: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    }, [balance]);

    const handleConfirmTransaction = useCallback(async () => {
        if (!currentTransaction) return;

        setIsProcessingTx(true);
        setTxError(null);

        try {
            // In a real app, we would use sendTransaction from wagmi
            // Simulate transaction processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Success!
            const txHash = "0x" + Math.random().toString(16).substring(2, 66);

            const assistantMessage: Message = {
                id: uuidv4(),
                role: "assistant",
                content: `✅ **Transaction Confirmed!**\n\nYour transaction has been confirmed successfully.\n\n**Transaction Hash:** [${txHash.substring(0, 10)}...${txHash.substring(62)}](https://etherscan.io/tx/${txHash})\n\nIs there anything else you'd like to do?`,
                timestamp: new Date(),
            };

            setMessages((prevMessages) => [...prevMessages, assistantMessage]);
            setCurrentTransaction(null);
        } catch (error) {
            console.error("Transaction error:", error);
            setTxError("Failed to send transaction. Please try again later.");
        } finally {
            setIsProcessingTx(false);
        }
    }, [currentTransaction]);

    const handleSuggestionClick = useCallback((suggestion: string) => {
        handleSendMessage(suggestion);
    }, [handleSendMessage]);

    const handleEditTransaction = useCallback(() => {
        if (!currentTransaction) return;

        // In a real app, this might open a transaction editor
        // For this demo, we'll simply return to the chat
        setCurrentTransaction(null);

        const assistantMessage: Message = {
            id: uuidv4(),
            role: "assistant",
            content: "Let's try again. What transaction would you like to make?",
            timestamp: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    }, [currentTransaction]);

    const handleCancelTransaction = useCallback(() => {
        setCurrentTransaction(null);

        const assistantMessage: Message = {
            id: uuidv4(),
            role: "assistant",
            content: "Transaction cancelled. Is there anything else I can help you with?",
            timestamp: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    }, []);

    const handleTransactionFormSubmit = useCallback((txDetails: any) => {
        setCurrentTransaction(txDetails);
        setShowTransactionForm(false);

        // Add assistant message
        const assistantMessage: Message = {
            id: uuidv4(),
            role: "assistant",
            content: `I've prepared a transaction to send ${txDetails.amount} ETH to ${txDetails.ensName || txDetails.to}. Please review the details and confirm.`,
            timestamp: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    }, []);

    const handleTransactionFormCancel = useCallback(() => {
        setShowTransactionForm(false);
        setTransactionFormData(null);

        // Add assistant message
        const assistantMessage: Message = {
            id: uuidv4(),
            role: "assistant",
            content: "Transaction cancelled. Is there anything else I can help you with?",
            timestamp: new Date(),
        };

        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    }, []);

    const handleConnectWallet = useCallback(async () => {
        if (!connectors || connectors.length === 0) {
            console.warn("No connectors available");
            return;
        }

        setIsConnecting(true);
        try {
            await connect({ connector: connectors[0] });
        } catch (error) {
            console.error("Failed to connect wallet:", error);
        } finally {
            setIsConnecting(false);
            setShowConnectModal(false);
        }
    }, [connect, connectors, setIsConnecting]);

    const openConnectModal = useCallback(() => {
        setShowConnectModal(true);
    }, []);

    const closeTutorial = useCallback(() => {
        setShowTutorial(false);
    }, []);

    const handleExampleClick = useCallback((example: string) => {
        handleSendMessage(example);
    }, [handleSendMessage]);

    return (
        <motion.div
            className="relative flex min-h-screen flex-col bg-gray-50 dark:bg-slate-900"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
        >
            {/* Connect Wallet Modal */}
            <ConnectModal
                isOpen={showConnectModal}
                onClose={() => setShowConnectModal(false)}
                onConnect={handleConnectWallet}
            />

            {/* Tutorial overlay for first-time users */}
            {showTutorial && (
                <TutorialOverlay onClose={closeTutorial} />
            )}

            {/* Header */}
            <motion.div
                className="border-b border-gray-200 bg-white/95 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/95"
                variants={fadeInUp}
            >
                <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex items-center">
                        <h1 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                            AI Wallet Assistant
                        </h1>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <div className="hidden sm:block">
                            <KeyboardShortcuts />
                        </div>
                        {isConnected && <NetworkIndicator network={"ethereum"} />}
                        <WalletStatus
                            isConnected={isConnected}
                            address={address}
                            balance={balance}
                            onConnect={openConnectModal}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Chat area */}
            <div className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                    {/* Welcome banner */}
                    <WelcomeBanner onTutorialClick={() => setShowTutorial(true)} />

                    {/* Smart suggestions */}
                    <SmartSuggestions onSuggestionClick={handleSuggestionClick} />

                    <div className="space-y-4">
                        {showTransactionForm && transactionFormData && (
                            <motion.div
                                className="mb-4"
                                variants={fadeInUp}
                                initial="hidden"
                                animate="show"
                            >
                                <TransactionForm
                                    initialAmount={transactionFormData.amount}
                                    initialRecipient={transactionFormData.recipient}
                                    onSubmit={handleTransactionFormSubmit}
                                    onCancel={handleTransactionFormCancel}
                                />
                            </motion.div>
                        )}

                        {messages.length === 1 && !isConnected ? (
                            <EmptyState
                                isWalletConnected={isConnected}
                                onConnect={openConnectModal}
                                onExampleClick={handleExampleClick}
                            />
                        ) : (
                            <div className="space-y-4">
                                <AnimatePresence>
                                    {messages.map((message, index) => (
                                        <MessageBubble
                                            key={message.id}
                                            message={message}
                                            isLastMessage={index === messages.length - 1}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* Loading indicator */}
                        {loading && <LoadingIndicator />}

                        {/* Current transaction summary */}
                        {currentTransaction && (
                            <TransactionSummary
                                details={currentTransaction}
                                onConfirm={handleConfirmTransaction}
                                onEdit={handleEditTransaction}
                                onCancel={handleCancelTransaction}
                                isProcessing={isProcessingTx}
                                error={txError}
                            />
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </div>

            {/* Input area */}
            <div className="border-t border-gray-200 bg-white/95 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/95">
                <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                    <CommandInput
                        onSendMessage={handleSendMessage}
                        isWalletConnected={isConnected}
                        disabled={isProcessingTx || loading}
                    />
                </div>
            </div>
        </motion.div>
    );
}