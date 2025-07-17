"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useAccount, useConnect } from "wagmi";
import { Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { ConnectModal } from "@/components/Wallet/ConnectModal";
import { PageHeader } from "@/components/Shared/PageHeader";
import { PortfolioDashboard } from "@/components/Dashboard/PortfolioDashboard";
import { useWalletContext } from "@/components/Provider/wallet-provider";
import WalletConnectButton from "@/components/Wallet/WalletConnectButton";

export default function DashboardPage() {
    const { isConnected } = useAccount();
    const { connectors, connect } = useConnect();
    const { isConnecting, setIsConnecting } = useWalletContext();
    const [showConnectModal, setShowConnectModal] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Memoize the connect handler to prevent unnecessary re-renders
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

    // Memoize modal close handler
    const handleCloseModal = useCallback(() => {
        setShowConnectModal(false);
    }, []);

    // Memoize the wallet connect section to prevent unnecessary re-renders
    const walletConnectSection = useMemo(() => (
        <motion.div
            className="container mx-auto my-8 flex flex-col items-center justify-center space-y-4 px-4 text-center
                     sm:my-12 sm:space-y-6 sm:px-6 lg:px-8"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
        >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 
                          dark:bg-blue-500/20 sm:h-20 sm:w-20 md:h-24 md:w-24">
                <Wallet className="h-8 w-8 text-blue-600 dark:text-blue-400 
                                sm:h-10 sm:w-10 md:h-12 md:w-12" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                Connect Your Wallet
            </h2>
            <p className="max-w-xs text-sm text-gray-600 dark:text-slate-400 
                        sm:max-w-md sm:text-base">
                Connect your wallet to view your portfolio and track your assets securely.
            </p>
            <WalletConnectButton
                variant="large"
                className="w-full bg-blue-600 text-white hover:bg-blue-700 
                         dark:bg-blue-500 dark:hover:bg-blue-600 sm:w-auto"
            />
        </motion.div>
    ), []);

    // Early return for hydration
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

            <main className="flex-1">
                <PageHeader
                    title="Portfolio Dashboard"
                    description="Track and manage your crypto assets in one place"
                    badge="Dashboard"
                    centered
                />

                {!isConnected ? (
                    walletConnectSection
                ) : (
                    <div className="px-4 sm:px-6 lg:px-8">
                        <PortfolioDashboard />
                    </div>
                )}
            </main>
        </div>
    );
}