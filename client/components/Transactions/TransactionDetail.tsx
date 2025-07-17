"use client";

import { useState, useCallback, useMemo } from "react";
import { format } from "date-fns";
import {
    ArrowUpRight,
    ArrowDownRight,
    ArrowLeftRight,
    FileText,
    CheckCircle2,
    AlertCircle,
    Clock,
    Copy,
    ExternalLink,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTransactionHistory } from "@/hooks/use-transaction-history";

interface TransactionDetailProps {
    transactionHash: string;
    isOpen: boolean;
    onClose: () => void;
}

export function TransactionDetail({
    transactionHash,
    isOpen,
    onClose
}: TransactionDetailProps) {
    const { getTransaction } = useTransactionHistory();
    const transaction = getTransaction(transactionHash);
    const [copied, setCopied] = useState(false);

    // Memoize handlers to prevent unnecessary re-renders
    const handleCopyToClipboard = useCallback((text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }, []);

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    // Memoize computed values
    const statusIcon = useMemo(() => {
        if (!transaction) return null;
        
        switch (transaction.status) {
            case "confirmed":
                return <CheckCircle2 className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />;
            case "pending":
                return <Clock className="h-4 w-4 text-blue-500 dark:text-blue-400" />;
            case "failed":
                return <AlertCircle className="h-4 w-4 text-red-500 dark:text-red-400" />;
        }
    }, [transaction]);

    const transactionTypeIcon = useMemo(() => {
        if (!transaction) return null;
        
        switch (transaction.type) {
            case "send":
                return <ArrowUpRight className="h-4 w-4 text-red-500 dark:text-red-400" />;
            case "receive":
                return <ArrowDownRight className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />;
            case "swap":
                return <ArrowLeftRight className="h-4 w-4 text-blue-500 dark:text-blue-400" />;
            default:
                return <FileText className="h-4 w-4 text-gray-500 dark:text-slate-400" />;
        }
    }, [transaction]);

    const transactionTitle = useMemo(() => {
        if (!transaction) return "Transaction";
        
        switch (transaction.type) {
            case "send":
                return `Sent ${transaction.value} ${transaction.token}`;
            case "receive":
                return `Received ${transaction.value} ${transaction.token}`;
            case "swap":
                return `Swapped ${transaction.value} ${transaction.token}`;
            case "approve":
                return `Approved ${transaction.token}`;
            default:
                return "Transaction";
        }
    }, [transaction]);

    const statusBadge = useMemo(() => {
        if (!transaction || transaction.status !== "pending") return null;
        
        return (
            <Badge 
                variant="outline" 
                className="border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-500/50 dark:bg-blue-500/10 dark:text-blue-400"
            >
                Pending confirmation
            </Badge>
        );
    }, [transaction]);

    if (!transaction) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="mx-4 w-[calc(100vw-2rem)] max-w-lg max-h-[90vh] overflow-y-auto
                                     border-gray-300 bg-white backdrop-blur-md
                                     dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200
                                     sm:mx-0 sm:w-full">
                <DialogHeader className="space-y-2 pb-4">
                    <div className="flex items-start justify-between gap-2">
                        <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white pr-8">
                            {transactionTypeIcon}
                            <span className="break-words">{transactionTitle}</span>
                        </DialogTitle>
                    </div>
                    <DialogDescription className="text-sm text-gray-600 dark:text-slate-400">
                        Transaction details and network information
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Status Section */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2">
                            {statusIcon}
                            <span className="font-medium capitalize text-gray-900 dark:text-white">
                                {transaction.status}
                            </span>
                        </div>
                        {statusBadge}
                    </div>

                    {/* Transaction Hash */}
                    <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-700 dark:text-slate-300">Transaction Hash</div>
                        <div className="space-y-2">
                            <div className="break-all rounded-md bg-gray-100 px-3 py-2 text-xs font-mono text-gray-700 
                                           dark:bg-slate-900/50 dark:text-slate-300">
                                {transaction.hash}
                            </div>
                            <div className="flex gap-2 justify-center sm:justify-start">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 sm:flex-none border-gray-300 text-gray-700 hover:bg-gray-50 
                                             dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                                    onClick={() => handleCopyToClipboard(transaction.hash)}
                                >
                                    {copied ? (
                                        <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-500 dark:text-emerald-400" />
                                    ) : (
                                        <Copy className="h-4 w-4 mr-2" />
                                    )}
                                    {copied ? "Copied" : "Copy"}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 sm:flex-none border-gray-300 text-gray-700 hover:bg-gray-50 
                                             dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                                    asChild
                                >
                                    <a
                                        href={`https://etherscan.io/tx/${transaction.hash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center"
                                    >
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        View
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* From/To Addresses */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="text-sm font-medium text-gray-700 dark:text-slate-300">From</div>
                            <div className="break-all rounded-md bg-gray-100 px-3 py-2 text-sm font-mono text-gray-700 
                                          dark:bg-slate-900/30 dark:text-slate-300">
                                {transaction.from}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-sm font-medium text-gray-700 dark:text-slate-300">To</div>
                            <div className="break-all rounded-md bg-gray-100 px-3 py-2 text-sm font-mono text-gray-700 
                                          dark:bg-slate-900/30 dark:text-slate-300">
                                {transaction.to}
                            </div>
                        </div>
                    </div>

                    {/* Value and Fee */}
                    <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                        <div className="space-y-2">
                            <div className="text-sm font-medium text-gray-700 dark:text-slate-300">Value</div>
                            <div className="rounded-md bg-gray-100 px-3 py-2 font-semibold text-gray-900 
                                          dark:bg-slate-900/30 dark:text-white">
                                {transaction.value} {transaction.token}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-sm font-medium text-gray-700 dark:text-slate-300">Gas Fee</div>
                            <div className="rounded-md bg-gray-100 px-3 py-2 font-semibold text-gray-900 
                                          dark:bg-slate-900/30 dark:text-white">
                                {transaction.fee || "0.00"} ETH
                            </div>
                        </div>
                    </div>

                    {/* Network and Timestamp */}
                    <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                        <div className="space-y-2">
                            <div className="text-sm font-medium text-gray-700 dark:text-slate-300">Network</div>
                            <div className="rounded-md bg-gray-100 px-3 py-2 font-medium text-gray-900 
                                          dark:bg-slate-900/30 dark:text-white capitalize">
                                {transaction.network}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-sm font-medium text-gray-700 dark:text-slate-300">Timestamp</div>
                            <div className="rounded-md bg-gray-100 px-3 py-2 font-medium text-gray-900 
                                          dark:bg-slate-900/30 dark:text-white">
                                {format(new Date(transaction.timestamp), "MMM d, yyyy HH:mm")}
                            </div>
                        </div>
                    </div>

                    {/* Additional Details */}
                    {(transaction.nonce !== undefined || transaction.blockNumber || transaction.methodName) && (
                        <div className="space-y-4 border-t border-gray-200 pt-6 dark:border-slate-700">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Additional Details</h4>
                            
                            {transaction.nonce !== undefined && (
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-700 dark:text-slate-300">Nonce</div>
                                    <div className="rounded-md bg-gray-100 px-3 py-2 font-mono text-sm text-gray-700 
                                                  dark:bg-slate-900/30 dark:text-slate-300">
                                        {transaction.nonce}
                                    </div>
                                </div>
                            )}
                            
                            {transaction.blockNumber && (
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-700 dark:text-slate-300">Block</div>
                                    <div className="rounded-md bg-gray-100 px-3 py-2 font-mono text-sm text-gray-700 
                                                  dark:bg-slate-900/30 dark:text-slate-300">
                                        {transaction.blockNumber}
                                    </div>
                                </div>
                            )}
                            
                            {transaction.methodName && (
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-700 dark:text-slate-300">Method</div>
                                    <div className="rounded-md bg-gray-100 px-3 py-2 font-mono text-sm text-gray-700 
                                                  dark:bg-slate-900/30 dark:text-slate-300">
                                        {transaction.methodName}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end sm:gap-2">
                        <Button
                            variant="outline"
                            onClick={handleClose}
                            className="order-2 sm:order-1 border-gray-300 text-gray-700 hover:bg-gray-50 
                                     dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                        >
                            Close
                        </Button>
                        <Button
                            className="order-1 sm:order-2 bg-blue-600 text-white hover:bg-blue-700 
                                     dark:bg-blue-500 dark:hover:bg-blue-600"
                            asChild
                        >
                            <a
                                href={`https://etherscan.io/tx/${transaction.hash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2"
                            >
                                <ExternalLink className="h-4 w-4" />
                                View on Explorer
                            </a>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}