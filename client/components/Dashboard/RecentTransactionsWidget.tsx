"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { TransactionList } from "../Transactions/TransactionList";
import { TransactionDetail } from "../Transactions/TransactionDetail";

export function RecentTransactionsWidget() {
    const [selectedTxHash, setSelectedTxHash] = useState<string | null>(null);

    // Memoize handlers to prevent unnecessary re-renders
    const handleCloseDetail = useCallback(() => {
        setSelectedTxHash(null);
    }, []);

    return (
        <motion.div
            variants={fadeInUp}
            className="h-full w-full"
        >
            <Card className="h-full border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm 
                           dark:border-slate-700 dark:bg-slate-800/50">
                <CardHeader className="pb-4">
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                        <div className="space-y-1">
                            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                                <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span className="text-base sm:text-lg">Recent Activity</span>
                            </CardTitle>
                            <CardDescription className="text-gray-600 dark:text-slate-400">
                                Your latest transactions
                            </CardDescription>
                        </div>
                        <Button 
                            asChild 
                            variant="ghost" 
                            size="sm"
                            className="w-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 
                                     dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-700 
                                     sm:w-auto"
                        >
                            <Link href="/transactions" className="flex items-center gap-1">
                                <span className="hidden sm:inline">View All</span>
                                <span className="sm:hidden">All</span>
                                <ExternalLink className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <TransactionList limit={5} showPagination={false} />
                </CardContent>
            </Card>

            {selectedTxHash && (
                <TransactionDetail
                    transactionHash={selectedTxHash}
                    isOpen={!!selectedTxHash}
                    onClose={handleCloseDetail}
                />
            )}
        </motion.div>
    );
}