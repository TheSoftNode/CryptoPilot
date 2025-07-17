"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { ConnectModal } from "@/components/Wallet/ConnectModal";
import { PageHeader } from "@/components/Shared/PageHeader";
import { AddressForm } from "@/components/AddressBook/AddressForm";
import { AddressBookList } from "@/components/AddressBook/AddressBookList";
import { useAccount, useConnect } from "wagmi";
import { useWalletContext } from "@/components/Provider/wallet-provider";
import WalletConnectButton from "@/components/Wallet/WalletConnectButton";

export default function AddressBookPage() {
    const { address, isConnected } = useAccount();
    const { connectors, connect } = useConnect();
    const { isConnecting, setIsConnecting } = useWalletContext();

    const [showConnectModal, setShowConnectModal] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleConnectWallet = async () => {
        setIsConnecting(true);
        try {
            await connect({ connector: connectors[0] });
            setShowConnectModal(false);
        } catch (error) {
            console.error("Failed to connect wallet:", error);
        } finally {
            setIsConnecting(false);
        }
    };

    if (!mounted) return null;

    return (
        <div className="flex min-h-screen flex-col">
            <ConnectModal
                isOpen={showConnectModal}
                onClose={() => setShowConnectModal(false)}
                onConnect={handleConnectWallet}
            />

            <main className="flex-1 p-4">
                <PageHeader
                    title="Address Book"
                    description="Save and manage your frequently used addresses"
                    badge="Contacts"
                    centered={false}
                >
                    {isConnected && (
                        <Button
                            onClick={() => setShowAddForm(true)}
                            className="mt-4 bg-[#2081cb] hover:bg-[#296ea3] text-white rounded-full"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add New Contact
                        </Button>
                    )}
                </PageHeader>

                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    {!isConnected ? (
                        <motion.div
                            className="my-12 flex flex-col items-center justify-center space-y-6 text-center"
                            variants={fadeInUp}
                            initial="hidden"
                            animate="show"
                        >
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#2081cb]/10">
                                <Wallet className="h-12 w-12 text-[#2081cb]" />
                            </div>
                            <h2 className="text-2xl font-bold">Connect Your Wallet</h2>
                            <p className="max-w-md text-muted-foreground">
                                Connect your wallet to access and manage your address book.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <WalletConnectButton
                                    className="bg-[#2081cb] hover:bg-[#296ea3] text-white"
                                />
                                <Button
                                    variant="outline"
                                    className="border-[#2081cb] text-[#2081cb] hover:bg-[#2081cb]/10 rounded-full"
                                    onClick={() => window.history.back()}
                                >
                                    Back
                                </Button>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="mx-auto">
                            {showAddForm && (
                                <motion.div
                                    className="mb-8 mx-auto"
                                    variants={fadeInUp}
                                    initial="hidden"
                                    animate="show"
                                >
                                    <AddressForm onClose={() => setShowAddForm(false)} />
                                </motion.div>
                            )}
                            <motion.div
                                variants={fadeInUp}
                                initial="hidden"
                                animate="show"
                                className="mx-auto"
                            >
                                <AddressBookList />
                            </motion.div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}