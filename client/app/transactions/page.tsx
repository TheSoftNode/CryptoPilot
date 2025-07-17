"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, RefreshCw, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccount, useConnect } from "wagmi";
import { useWalletContext } from "@/components/Provider/wallet-provider";
import { ConnectModal } from "@/components/Wallet/ConnectModal";
import { PageHeader } from "@/components/Shared/PageHeader";
import { TransactionFilters } from "@/components/Transactions/TransactionFilters";
import { TransactionList } from "@/components/Transactions/TransactionList";
import { TransactionStats } from "@/components/Transactions/TransactionStats";
import WalletConnectButton from "@/components/Wallet/WalletConnectButton";
import { useTransactionHistory } from "@/hooks/use-transaction-history";

export default function TransactionsPage() {
    const { isConnected } = useAccount();
    const { connectors, connect } = useConnect();
    const { isConnecting, setIsConnecting } = useWalletContext();
    const { transactions, loading, loadTransactions } = useTransactionHistory();
    const [showConnectModal, setShowConnectModal] = useState(false);
    const [activeTab, setActiveTab] = useState("all");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Memoize handlers to prevent unnecessary re-renders
    const handleConnectWallet = useCallback(async () => {
        if (!connectors || connectors.length === 0) {
            console.warn("No connectors available");
            return;
        }

        setIsConnecting(true);
        try {
            await connect({ connector: connectors[0] });
            setShowConnectModal(false);
        } catch (error) {
            console.error("Failed to connect wallet:", error);
        } finally {
            setIsConnecting(false);
        }
    }, [connect, connectors, setIsConnecting]);

    const handleCloseModal = useCallback(() => {
        setShowConnectModal(false);
    }, []);

    const handleRefresh = useCallback(() => {
        if (loadTransactions) {
            loadTransactions();
        }
    }, [loadTransactions]);

    const handleGoBack = useCallback(() => {
        window.history.back();
    }, []);

    // Memoize wallet connect section
    const walletConnectSection = useMemo(() => (
        <motion.div
            className="my-8 flex flex-col items-center justify-center space-y-4 text-center px-4 sm:my-12 sm:space-y-6"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
        >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/20 sm:h-20 sm:w-20 md:h-24 md:w-24">
                <Wallet className="h-8 w-8 text-blue-600 dark:text-blue-400 sm:h-10 sm:w-10 md:h-12 md:w-12" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                Connect Your Wallet
            </h2>
            <p className="max-w-xs text-sm text-gray-600 dark:text-slate-400 sm:max-w-md sm:text-base">
                Connect your wallet to view your transaction history and analytics.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
                <WalletConnectButton
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 sm:w-auto"
                />
                <Button
                    variant="outline"
                    onClick={handleGoBack}
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800 sm:w-auto"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>
            </div>
        </motion.div>
    ), [handleGoBack]);

    // Loading state
    if (!mounted) {
        return (
            <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-slate-900">
                <div className="flex flex-1 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-slate-900">
            <ConnectModal
                isOpen={showConnectModal}
                onClose={handleCloseModal}
                onConnect={handleConnectWallet}
            />

            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                <PageHeader
                    title="Transaction History"
                    description="Track and analyze your transaction activity"
                    badge="History"
                >
                    {isConnected && (
                        <div className="flex items-center justify-between gap-4 mt-4 sm:mt-0 sm:ml-auto">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleRefresh}
                                disabled={loading}
                                className="border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-500/50 dark:text-blue-400 dark:hover:bg-blue-500/10"
                            >
                                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                                <span className="hidden sm:inline">Refresh</span>
                            </Button>
                        </div>
                    )}
                </PageHeader>

                <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-4 lg:px-8">
                    {!isConnected ? (
                        walletConnectSection
                    ) : (
                        <div className="mx-auto max-w-7xl">
                            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                                {/* Tab Navigation and Filters */}
                                <div className="mb-6 space-y-4 lg:space-y-0">
                                    {/* Mobile: Stack vertically */}
                                    <div className="flex flex-col gap-4 lg:hidden">
                                        <div className="overflow-x-auto">
                                            <TabsList className="inline-flex w-full min-w-max bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                                                <TabsTrigger
                                                    value="all"
                                                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500 text-sm whitespace-nowrap"
                                                >
                                                    All
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="sent"
                                                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500 text-sm whitespace-nowrap"
                                                >
                                                    Sent
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="received"
                                                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500 text-sm whitespace-nowrap"
                                                >
                                                    Received
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="swaps"
                                                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500 text-sm whitespace-nowrap"
                                                >
                                                    Swaps
                                                </TabsTrigger>
                                            </TabsList>
                                        </div>
                                        <div className="w-full">
                                            <TransactionFilters />
                                        </div>
                                    </div>

                                    {/* Desktop: Side by side */}
                                    <div className="hidden lg:flex lg:items-center lg:justify-between">
                                        <TabsList className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                                            <TabsTrigger
                                                value="all"
                                                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500"
                                            >
                                                All Transactions
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="sent"
                                                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500"
                                            >
                                                Sent
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="received"
                                                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500"
                                            >
                                                Received
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="swaps"
                                                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500"
                                            >
                                                Swaps
                                            </TabsTrigger>
                                        </TabsList>
                                        <TransactionFilters />
                                    </div>
                                </div>

                                {/* Transaction Stats */}
                                <div className="mb-6 sm:mb-8">
                                    <TransactionStats />
                                </div>

                                {/* Transaction Lists */}
                                <div className="space-y-6">
                                    <TabsContent value="all" className="mt-0">
                                        <TransactionList type={undefined} />
                                    </TabsContent>
                                    <TabsContent value="sent" className="mt-0">
                                        <TransactionList type="send" />
                                    </TabsContent>
                                    <TabsContent value="received" className="mt-0">
                                        <TransactionList type="receive" />
                                    </TabsContent>
                                    <TabsContent value="swaps" className="mt-0">
                                        <TransactionList type="swap" />
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}