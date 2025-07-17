"use client";

import { ArrowUpRight, ArrowDownRight, RefreshCw, Activity } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Transaction {
    hash: string;
    from: string;
    to: string;
    value: string;
    token: string;
    timestamp: Date;
    status: "pending" | "confirmed" | "failed";
    gasUsed?: string;
    gasPrice?: string;
}

interface TransactionsListProps {
    transactions: Transaction[];
}

export function TransactionsList({ transactions }: TransactionsListProps) {
    const truncateAddress = (address: string, startLength = 6, endLength = 4) => {
        if (address.length <= startLength + endLength) return address;
        return `${address.substring(0, startLength)}...${address.substring(address.length - endLength)}`;
    };

    const getTransactionIcon = (transaction: Transaction) => {
        // If transaction is from the user's address, it's an outgoing transaction
        const isOutgoing = transaction.from === "0xYourAddress";

        if (transaction.status === "pending") {
            return <RefreshCw className="h-3 w-3 animate-spin text-amber-400 sm:h-4 sm:w-4" />;
        }

        if (transaction.status === "failed") {
            return <Activity className="h-3 w-3 text-red-400 sm:h-4 sm:w-4" />;
        }

        return isOutgoing ? (
            <ArrowUpRight className="h-3 w-3 text-red-400 sm:h-4 sm:w-4" />
        ) : (
            <ArrowDownRight className="h-3 w-3 text-emerald-400 sm:h-4 sm:w-4" />
        );
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "confirmed":
                return (
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs dark:bg-emerald-500/20 dark:text-emerald-400">
                        Success
                    </Badge>
                );
            case "pending":
                return (
                    <Badge variant="secondary" className="bg-amber-100 text-amber-700 text-xs dark:bg-amber-500/20 dark:text-amber-400">
                        Pending
                    </Badge>
                );
            case "failed":
                return (
                    <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs dark:bg-red-500/20 dark:text-red-400">
                        Failed
                    </Badge>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-2 sm:space-y-3">
            {transactions.length > 0 ? (
                transactions.map((tx) => (
                    <div 
                        key={tx.hash} 
                        className="group flex items-start gap-2 rounded-lg border border-gray-300 bg-white/80 p-3 transition-all 
                                 hover:border-gray-400 hover:bg-white/90 hover:shadow-sm 
                                 dark:border-slate-700/50 dark:bg-slate-800/30 dark:hover:border-slate-600 
                                 dark:hover:bg-slate-800/50 sm:gap-3"
                    >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-200 
                                      dark:bg-slate-700/50 sm:h-8 sm:w-8">
                            {getTransactionIcon(tx)}
                        </div>
                        
                        <div className="min-w-0 flex-1 space-y-1">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-900 dark:text-white sm:text-base">
                                        {tx.from === "0xYourAddress" ? "Sent" : "Received"} {tx.token}
                                    </span>
                                    {getStatusBadge(tx.status)}
                                </div>
                                <div className="font-mono text-xs text-gray-700 dark:text-slate-300 sm:text-sm">
                                    {tx.value} {tx.token}
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-1 text-xs text-gray-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                                <div className="font-mono">
                                    <span className="hidden sm:inline">
                                        {truncateAddress(tx.from)} → {truncateAddress(tx.to)}
                                    </span>
                                    <span className="sm:hidden">
                                        {truncateAddress(tx.from, 4, 3)} → {truncateAddress(tx.to, 4, 3)}
                                    </span>
                                </div>
                                <div className="whitespace-nowrap">
                                    {formatDistanceToNow(tx.timestamp)} ago
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50/50 
                              dark:border-slate-700 dark:bg-slate-800/30">
                    <div className="text-center">
                        <Activity className="mx-auto h-6 w-6 text-gray-400 dark:text-slate-500 mb-2 sm:h-8 sm:w-8" />
                        <p className="text-xs text-gray-500 dark:text-slate-400 mb-2 sm:text-sm">No transactions found</p>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs text-gray-500 hover:text-gray-900 hover:bg-gray-100 
                                     dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-700 
                                     sm:text-sm"
                            asChild
                        >
                            <a href="/transactions">
                                View all transactions
                            </a>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}