"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Edit, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatUSD, truncateAddress } from "@/lib/utils";
import { fadeInUp, buttonAnimation } from "@/lib/animations";

export interface TransactionDetails {
    type: "send" | "swap" | "approve" | "other";
    from: string;
    to: string;
    ensName?: string;
    amount: string;
    token: string;
    usdValue: number;
    gasFee: number;
    network: string;
    // For swaps
    toToken?: string;
    toAmount?: string;
    toUsdValue?: number;
    exchangeRate?: string;
}

interface TransactionSummaryProps {
    details: TransactionDetails;
    onConfirm: () => void;
    onEdit: () => void;
    onCancel: () => void;
    isProcessing?: boolean;
    error?: string | null;
}

export function TransactionSummary({
    details,
    onConfirm,
    onEdit,
    onCancel,
    isProcessing = false,
    error = null
}: TransactionSummaryProps) {
    const [expanded, setExpanded] = useState(false);

    const isSwap = details.type === "swap";

    return (
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            className="mb-4 rounded-lg border p-4 shadow-sm"
        >
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {error ? (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                    ) : (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    <h3 className="text-md font-bold">
                        {error ? "Transaction Error" : "Parsed Command"}
                    </h3>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-[#2081cb]/10 hover:text-[#2081cb]"
                    onClick={() => setExpanded(!expanded)}
                >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit transaction</span>
                </Button>
            </div>

            {error ? (
                <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
                    {error}
                </div>
            ) : null}

            <div className="space-y-2 text-sm">
                <div className="flex items-start justify-between">
                    <span className="text-muted-foreground">Action:</span>
                    <span className="font-medium text-right">
                        {isSwap ? `Swap ${details.token} for ${details.toToken}` : `Send ${details.token}`}
                    </span>
                </div>

                {isSwap ? (
                    <>
                        <div className="flex items-start justify-between">
                            <span className="text-muted-foreground">Amount:</span>
                            <div className="text-right">
                                <div className="font-medium">{details.amount} {details.token}</div>
                                <div className="text-xs text-muted-foreground">
                                    {formatUSD(details.usdValue)}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start justify-between">
                            <span className="text-muted-foreground">You Receive:</span>
                            <div className="text-right">
                                <div className="font-medium">{details.toAmount} {details.toToken}</div>
                                <div className="text-xs text-muted-foreground">
                                    {formatUSD(details.toUsdValue || 0)}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start justify-between">
                            <span className="text-muted-foreground">Rate:</span>
                            <span className="font-medium">
                                {details.exchangeRate}
                            </span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-start justify-between">
                            <span className="text-muted-foreground">Amount:</span>
                            <div className="text-right">
                                <div className="font-medium">{details.amount} {details.token}</div>
                                <div className="text-xs text-muted-foreground">
                                    {formatUSD(details.usdValue)}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start justify-between">
                            <span className="text-muted-foreground">Recipient:</span>
                            <div className="text-right font-medium">
                                {details.ensName ? (
                                    <div className="flex items-center gap-1">
                                        <span>{details.ensName}</span>
                                    </div>
                                ) : (
                                    truncateAddress(details.to)
                                )}
                                {details.ensName ? (
                                    <div className="text-xs text-muted-foreground">
                                        {truncateAddress(details.to)}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </>
                )}

                <div className="flex items-start justify-between">
                    <span className="text-muted-foreground">Network:</span>
                    <span className="font-medium capitalize">{details.network}</span>
                </div>

                <div className="flex items-start justify-between">
                    <span className="text-muted-foreground">Gas Fee:</span>
                    <span className="font-medium">{formatUSD(details.gasFee)}</span>
                </div>

                <div className="flex items-start justify-between pt-1">
                    <span className="text-muted-foreground">Total:</span>
                    <div className="text-right font-bold">
                        {formatUSD(details.usdValue + details.gasFee)}
                    </div>
                </div>
            </div>

            <div className="mt-4 flex gap-2">
                <Button
                    className="flex-1 rounded-full bg-[#2081cb] text-white hover:bg-[#296ea3]"
                    onClick={onConfirm}
                    disabled={isProcessing || !!error}
                    {...buttonAnimation}
                >
                    {isProcessing ? (
                        <>
                            <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></span>
                            Processing...
                        </>
                    ) : (
                        "Confirm in MetaMask"
                    )}
                </Button>
                <Button
                    variant="outline"
                    onClick={onEdit}
                    className="flex-1 rounded-full border-[#2081cb] text-[#2081cb] hover:bg-[#2081cb]/10"
                    disabled={isProcessing}
                >
                    Edit
                </Button>
            </div>

            {!error && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 w-full text-xs text-muted-foreground hover:text-[#2081cb]"
                    onClick={onCancel}
                    disabled={isProcessing}
                >
                    <XCircle className="mr-1 h-3 w-3" />
                    Cancel Transaction
                </Button>
            )}
        </motion.div>
    );
}