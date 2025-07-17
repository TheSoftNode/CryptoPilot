"use client";

import { useState, useCallback, useMemo } from "react";
import { ArrowUpRight, ArrowDownRight, RefreshCw, ExternalLink, ArrowLeftRight, FileText, Activity, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Transaction, TransactionStatus } from "@/types";
import { truncateAddress, formatUSD } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { useTransactionHistory } from "@/hooks/use-transaction-history";
import { TransactionDetail } from "./TransactionDetail";

interface TransactionListProps {
    type?: Transaction["type"] | Transaction["type"][];
    limit?: number;
    showPagination?: boolean;
}

export function TransactionList({
    type,
    limit = 10,
    showPagination = true
}: TransactionListProps) {
    const { transactions, loading } = useTransactionHistory();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTxHash, setSelectedTxHash] = useState<string | null>(null);

    // Memoize filtered transactions to prevent unnecessary recalculations
    const filteredTransactions = useMemo(() => {
        if (!type) return transactions;
        
        return transactions.filter(tx =>
            Array.isArray(type)
                ? type.includes(tx.type)
                : tx.type === type
        );
    }, [transactions, type]);

    // Memoize pagination calculations
    const paginationData = useMemo(() => {
        const totalPages = Math.ceil(filteredTransactions.length / limit);
        const paginatedTransactions = filteredTransactions.slice(
            (currentPage - 1) * limit,
            currentPage * limit
        );
        
        return { totalPages, paginatedTransactions };
    }, [filteredTransactions, currentPage, limit]);

    const { totalPages, paginatedTransactions } = paginationData;

    // Memoize handlers to prevent unnecessary re-renders
    const handleTransactionClick = useCallback((hash: string) => {
        setSelectedTxHash(hash);
    }, []);

    const handleCloseDetail = useCallback(() => {
        setSelectedTxHash(null);
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const getTransactionIcon = useCallback((transaction: Transaction) => {
        if (transaction.status === "pending") {
            return <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-amber-500 dark:text-amber-400" />;
        }

        switch (transaction.type) {
            case "send":
                return <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 dark:text-red-400" />;
            case "receive":
                return <ArrowDownRight className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 dark:text-emerald-400" />;
            case "swap":
                return <ArrowLeftRight className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 dark:text-blue-400" />;
            default:
                return <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-slate-400" />;
        }
    }, []);

    const getStatusBadge = useCallback((status: TransactionStatus) => {
        switch (status) {
            case "pending":
                return (
                    <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30 text-xs">
                        Pending
                    </Badge>
                );
            case "confirmed":
                return (
                    <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30 text-xs">
                        Success
                    </Badge>
                );
            case "failed":
                return (
                    <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30 text-xs">
                        Failed
                    </Badge>
                );
        }
    }, []);

    const getTransactionDescription = useCallback((transaction: Transaction) => {
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
                return `Contract Interaction`;
        }
    }, []);

    const getTransactionSubtitle = useCallback((transaction: Transaction) => {
        switch (transaction.type) {
            case "send":
                return `To ${truncateAddress(transaction.to, 6, 4)}`;
            case "receive":
                return `From ${truncateAddress(transaction.from, 6, 4)}`;
            case "swap":
                return `For ${transaction.tokenAmount || "tokens"}`;
            case "approve":
                return `Contract ${truncateAddress(transaction.contractAddress || transaction.to, 6, 4)}`;
            default:
                return `With ${truncateAddress(transaction.to, 6, 4)}`;
        }
    }, []);

    // Memoize title based on type
    const title = useMemo(() => {
        if (!type) return "All Transactions";
        
        if (typeof type === "string") {
            switch (type) {
                case "send": return "Sent Transactions";
                case "receive": return "Received Transactions";
                case "swap": return "Swap Transactions";
                default: return "Transactions";
            }
        }
        
        return "Transactions";
    }, [type]);

    return (
        <Card className="w-full border-gray-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/50">
            <CardHeader className="pb-4">
                <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                            <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="text-base sm:text-lg lg:text-xl">
                                {title}
                            </span>
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-slate-400">
                            {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {loading ? (
                    <div className="flex h-32 items-center justify-center sm:h-40">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-slate-400">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent sm:h-6 sm:w-6"></div>
                            <span className="text-sm">Loading transactions...</span>
                        </div>
                    </div>
                ) : paginatedTransactions.length > 0 ? (
                    <div className="space-y-3">
                        <AnimatePresence>
                            {paginatedTransactions.map((transaction) => (
                                <motion.div
                                    key={transaction.hash}
                                    variants={fadeInUp}
                                    initial="hidden"
                                    animate="show"
                                    className="group relative rounded-lg border border-gray-200 bg-gray-50/50 p-3 transition-all 
                                             hover:border-gray-300 hover:bg-gray-100/50 hover:shadow-sm cursor-pointer 
                                             dark:border-slate-700/50 dark:bg-slate-800/30 dark:hover:border-slate-600 
                                             dark:hover:bg-slate-800/50 sm:p-4"
                                    onClick={() => handleTransactionClick(transaction.hash)}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full 
                                                      bg-gray-200 dark:bg-slate-700/50 sm:h-10 sm:w-10">
                                            {getTransactionIcon(transaction)}
                                        </div>

                                        <div className="min-w-0 flex-1 space-y-2">
                                            {/* Main content */}
                                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                                <div className="min-w-0 flex-1">
                                                    <div className="font-medium text-gray-900 dark:text-white truncate text-sm sm:text-base">
                                                        {getTransactionDescription(transaction)}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-slate-400 truncate sm:text-sm">
                                                        {getTransactionSubtitle(transaction)}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 shrink-0">
                                                    {getStatusBadge(transaction.status)}
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100 
                                                                 hover:bg-gray-200 dark:hover:bg-slate-700 sm:h-8 sm:w-8"
                                                        asChild
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <a
                                                            href={`https://etherscan.io/tx/${transaction.hash}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <ExternalLink className="h-3 w-3 text-gray-500 dark:text-slate-400 sm:h-4 sm:w-4" />
                                                            <span className="sr-only">View on Etherscan</span>
                                                        </a>
                                                    </Button>
                                                </div>
                                            </div>

                                            {/* Footer information */}
                                            <div className="flex flex-col gap-1 text-xs text-gray-500 dark:text-slate-400 
                                                          sm:flex-row sm:items-center sm:justify-between sm:text-sm">
                                                <div className="flex items-center gap-3">
                                                    {transaction.fee && (
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="h-3 w-3" />
                                                            <span className="hidden sm:inline">Fee: </span>
                                                            {transaction.fee} ETH
                                                        </span>
                                                    )}
                                                    <span className="truncate">
                                                        {formatDistanceToNow(new Date(transaction.timestamp), { addSuffix: true })}
                                                    </span>
                                                </div>
                                                <div className="shrink-0">
                                                    <Badge variant="outline" className="border-gray-300 bg-gray-100 text-gray-700 
                                                                                       dark:border-slate-600/50 dark:bg-slate-700/50 
                                                                                       dark:text-slate-300 text-xs">
                                                        {transaction.network}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {showPagination && totalPages > 1 && (
                            <div className="pt-4 sm:pt-6">
                                <Pagination className="justify-center">
                                    <PaginationContent className="flex-wrap gap-1">
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                                className={`text-xs sm:text-sm ${
                                                    currentPage === 1 
                                                        ? "pointer-events-none opacity-50" 
                                                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                                                }`}
                                            />
                                        </PaginationItem>

                                        {/* Desktop: Show page numbers */}
                                        {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                                            const pageNumber = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                                            if (pageNumber > totalPages) return null;
                                            
                                            return (
                                                <PaginationItem key={pageNumber} className="hidden sm:block">
                                                    <PaginationLink
                                                        onClick={() => handlePageChange(pageNumber)}
                                                        isActive={currentPage === pageNumber}
                                                        className={
                                                            currentPage === pageNumber 
                                                                ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" 
                                                                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                                                        }
                                                    >
                                                        {pageNumber}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            );
                                        })}

                                        {/* Mobile: Show current page info */}
                                        <PaginationItem className="sm:hidden">
                                            <span className="px-3 py-2 text-xs text-gray-500 dark:text-slate-400">
                                                {currentPage} of {totalPages}
                                            </span>
                                        </PaginationItem>

                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                                className={`text-xs sm:text-sm ${
                                                    currentPage === totalPages 
                                                        ? "pointer-events-none opacity-50" 
                                                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
                                                }`}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>

                                {/* Mobile: Page info */}
                                <div className="mt-3 text-center text-xs text-gray-500 dark:text-slate-400 sm:hidden">
                                    Showing {Math.min((currentPage - 1) * limit + 1, filteredTransactions.length)} to{" "}
                                    {Math.min(currentPage * limit, filteredTransactions.length)} of {filteredTransactions.length} transactions
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex h-32 flex-col items-center justify-center gap-3 rounded-lg border border-dashed 
                                  border-gray-300 bg-gray-50/50 p-6 text-center dark:border-slate-700 dark:bg-slate-800/30 
                                  sm:h-40 sm:p-8">
                        <Activity className="h-8 w-8 text-gray-400 dark:text-slate-500" />
                        <div className="space-y-2">
                            <div className="text-sm text-gray-500 dark:text-slate-400 sm:text-base">
                                No transactions found
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                Make your first transaction
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>

            {selectedTxHash && (
                <TransactionDetail
                    transactionHash={selectedTxHash}
                    isOpen={!!selectedTxHash}
                    onClose={handleCloseDetail}
                />
            )}
        </Card>
    );
}