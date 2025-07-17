"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { STORAGE_KEYS } from "@/lib/constants";
import { Transaction, Network, TransactionStatus } from "@/types";
import { useWallet } from "@/hooks/use-wallet";
import { mockTransactions } from "@/lib/mock-data";

export function useTransactionHistory() {
    const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
        STORAGE_KEYS.TRANSACTION_HISTORY,
        mockTransactions
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { address } = useWallet();

    // Load transactions (in a real app, this would fetch from the blockchain)
    const loadTransactions = useCallback(async () => {
        if (!address) return;

        try {
            setLoading(true);
            setError(null);

            // In a real app, this would fetch transactions from an API or blockchain
            // For this demo, we'll just use the cached transactions
            // but this function could be extended to refresh from external sources

            console.log("Loading transactions for address:", address);
            // No need to update anything since we're using mock data

        } catch (err: any) {
            console.error("Error loading transactions:", err);
            setError(err.message || "Failed to load transactions");
        } finally {
            setLoading(false);
        }
    }, [address]);

    // Add transaction (used when creating new transactions)
    const addTransaction = useCallback(
        (transaction: Omit<Transaction, "timestamp" | "status" | "network">, network: Network) => {
            const newTransaction: Transaction = {
                ...transaction,
                timestamp: new Date(),
                status: "pending",
                network,
            };

            setTransactions([newTransaction, ...transactions]);
            return newTransaction;
        },
        [transactions, setTransactions]
    );

    // Update transaction status
    const updateTransaction = useCallback(
        (hash: string, updates: Partial<Transaction>) => {
            const updatedTransactions = transactions.map(tx =>
                tx.hash === hash ? { ...tx, ...updates } : tx
            );

            setTransactions(updatedTransactions);
        },
        [transactions, setTransactions]
    );

    // Filter transactions
    const filterTransactions = useCallback(
        ({
            type,
            status,
            token,
            network,
            dateFrom,
            dateTo,
        }: {
            type?: Transaction["type"] | Transaction["type"][];
            status?: TransactionStatus | TransactionStatus[];
            token?: string;
            network?: Network;
            dateFrom?: Date;
            dateTo?: Date;
        } = {}) => {
            return transactions.filter(tx => {
                // Type filter
                if (type) {
                    const types = Array.isArray(type) ? type : [type];
                    if (!types.includes(tx.type)) return false;
                }

                // Status filter
                if (status) {
                    const statuses = Array.isArray(status) ? status : [status];
                    if (!statuses.includes(tx.status)) return false;
                }

                // Token filter
                if (token && tx.token !== token) return false;

                // Network filter
                if (network && tx.network !== network) return false;

                // Date range filter
                if (dateFrom && tx.timestamp < dateFrom) return false;
                if (dateTo && tx.timestamp > dateTo) return false;

                return true;
            });
        },
        [transactions]
    );

    // Get transaction by hash
    const getTransaction = useCallback(
        (hash: string) => {
            return transactions.find(tx => tx.hash === hash) || null;
        },
        [transactions]
    );

    // Clear all transactions (for testing or reset)
    const clearTransactions = useCallback(() => {
        setTransactions([]);
    }, [setTransactions]);

    // Statistics and analytics
    const getTransactionStats = useCallback(() => {
        const stats = {
            total: transactions.length,
            sent: transactions.filter(tx => tx.type === "send").length,
            received: transactions.filter(tx => tx.type === "receive").length,
            swaps: transactions.filter(tx => tx.type === "swap").length,
            pending: transactions.filter(tx => tx.status === "pending").length,
            failed: transactions.filter(tx => tx.status === "failed").length,
            totalGasSpent: transactions.reduce((sum, tx) => {
                if (tx.fee) {
                    return sum + parseFloat(tx.fee);
                }
                return sum;
            }, 0),
            byToken: {} as Record<string, number>,
            byNetwork: {} as Record<string, number>,
        };

        // Count by token
        transactions.forEach(tx => {
            stats.byToken[tx.token] = (stats.byToken[tx.token] || 0) + 1;
        });

        // Count by network
        transactions.forEach(tx => {
            const network = tx.network || "unknown";
            stats.byNetwork[network] = (stats.byNetwork[network] || 0) + 1;
        });

        return stats;
    }, [transactions]);

    // Load transactions when wallet changes
    useEffect(() => {
        if (address) {
            loadTransactions();
        }
    }, [address, loadTransactions]);

    return {
        transactions,
        loading,
        error,
        loadTransactions,
        addTransaction,
        updateTransaction,
        filterTransactions,
        getTransaction,
        clearTransactions,
        getTransactionStats,
    };
}