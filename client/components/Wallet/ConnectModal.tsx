"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { motion } from "framer-motion";
import WalletConnectButton from "./WalletConnectButton";
import { useWalletContext } from "../Provider/wallet-provider";

export function ConnectModal({
    isOpen,
    onClose,
    onConnect,
}: {
    isOpen: boolean;
    onClose: () => void;
    onConnect: () => void;
}) {
    const { isConnecting } = useWalletContext();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Connect your wallet</DialogTitle>
                    <DialogDescription>
                        Connect your crypto wallet to interact with blockchain features
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-4 py-4">
                    <div className="flex flex-col items-center justify-center space-y-6">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100"
                        >
                            <Wallet className="h-12 w-12 text-blue-500" />
                        </motion.div>

                        <p className="text-center text-sm text-muted-foreground">
                            Connect to your preferred wallet to access blockchain features.
                            Your wallet will be used for transactions and authentication.
                        </p>
                    </div>

                    <div className="flex flex-col space-y-2">
                        {/* Use the WalletConnectButton component with large variant */}
                        <WalletConnectButton variant="large" className="w-full" />

                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="w-full"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}