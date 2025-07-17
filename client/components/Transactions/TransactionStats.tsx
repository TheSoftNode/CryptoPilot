"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { ArrowUpRight, ArrowDownRight, ArrowLeftRight, PieChart, TrendingUp, Activity, Fuel, Repeat } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatUSD } from "@/lib/utils";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { useTransactionHistory } from "@/hooks/use-transaction-history";

export function TransactionStats() {
    const { transactions, getTransactionStats } = useTransactionHistory();
    const [stats, setStats] = useState({
        sent: 0,
        received: 0,
        swaps: 0,
        totalGasSpent: 0,
    });

    // Memoize the stats calculation to prevent infinite re-renders
    const calculateStats = useCallback(() => {
        if (getTransactionStats) {
            const txStats = getTransactionStats();
            setStats({
                sent: txStats.sent,
                received: txStats.received,
                swaps: txStats.swaps,
                totalGasSpent: txStats.totalGasSpent,
            });
        }
    }, [getTransactionStats]);

    // Calculate stats when transactions change
    useEffect(() => {
        calculateStats();
    }, [transactions, calculateStats]);

    const mockEthPrice = 1800; // Mock ETH price for display

    // Memoize stat cards configuration to prevent unnecessary re-renders
    const statCards = useMemo(() => [
        {
            title: "Sent",
            value: stats.sent,
            description: "transactions sent",
            icon: ArrowUpRight,
            iconColor: "text-red-500 dark:text-red-400",
            bgColor: "bg-red-100 dark:bg-red-500/20",
            hoverBgColor: "hover:bg-red-200 dark:hover:bg-red-500/30",
            cardHover: "hover:border-red-300 dark:hover:border-red-500/50"
        },
        {
            title: "Received", 
            value: stats.received,
            description: "transactions received",
            icon: ArrowDownRight,
            iconColor: "text-emerald-500 dark:text-emerald-400",
            bgColor: "bg-emerald-100 dark:bg-emerald-500/20",
            hoverBgColor: "hover:bg-emerald-200 dark:hover:bg-emerald-500/30",
            cardHover: "hover:border-emerald-300 dark:hover:border-emerald-500/50"
        },
        {
            title: "Gas Spent",
            value: formatUSD(stats.totalGasSpent * mockEthPrice),
            description: "total gas fees",
            icon: Fuel,
            iconColor: "text-amber-500 dark:text-amber-400",
            bgColor: "bg-amber-100 dark:bg-amber-500/20",
            hoverBgColor: "hover:bg-amber-200 dark:hover:bg-amber-500/30",
            cardHover: "hover:border-amber-300 dark:hover:border-amber-500/50"
        },
        {
            title: "Swaps",
            value: stats.swaps,
            description: "token swaps",
            icon: Repeat,
            iconColor: "text-blue-500 dark:text-blue-400",
            bgColor: "bg-blue-100 dark:bg-blue-500/20",
            hoverBgColor: "hover:bg-blue-200 dark:hover:bg-blue-500/30",
            cardHover: "hover:border-blue-300 dark:hover:border-blue-500/50"
        }
    ], [stats, mockEthPrice]);

    return (
        <div className="w-full">
            {/* Mobile: Stack vertically */}
            <div className="grid grid-cols-1 gap-3 sm:hidden">
                {statCards.map((stat) => {
                    const IconComponent = stat.icon;
                    return (
                        <motion.div key={stat.title} variants={fadeInUp}>
                            <Card className={`group border-gray-200 bg-white/50 backdrop-blur-sm transition-all duration-200 
                                           dark:border-slate-700 dark:bg-slate-800/50 
                                           hover:shadow-md ${stat.cardHover}`}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-700 dark:text-slate-300 
                                                        group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                        {stat.title}
                                    </CardTitle>
                                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${stat.bgColor} 
                                                   transition-all group-hover:scale-110 ${stat.hoverBgColor}`}>
                                        <IconComponent className={`h-4 w-4 ${stat.iconColor}`} />
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-1">
                                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                                        {stat.value}
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-slate-400 
                                                group-hover:text-gray-700 dark:group-hover:text-slate-300 transition-colors">
                                        {stat.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* Tablet: 2x2 grid */}
            <div className="hidden sm:grid lg:hidden grid-cols-2 gap-4">
                {statCards.map((stat) => {
                    const IconComponent = stat.icon;
                    return (
                        <motion.div key={stat.title} variants={fadeInUp}>
                            <Card className={`group border-gray-200 bg-white/50 backdrop-blur-sm transition-all duration-200 
                                           dark:border-slate-700 dark:bg-slate-800/50 
                                           hover:shadow-md ${stat.cardHover}`}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-700 dark:text-slate-300 
                                                        group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                        {stat.title}
                                    </CardTitle>
                                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${stat.bgColor} 
                                                   transition-all group-hover:scale-110 ${stat.hoverBgColor}`}>
                                        <IconComponent className={`h-4 w-4 ${stat.iconColor}`} />
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-1">
                                    <div className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                                        {stat.value}
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-slate-400 
                                                group-hover:text-gray-700 dark:group-hover:text-slate-300 transition-colors">
                                        {stat.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* Desktop: Single row */}
            <div className="hidden lg:grid grid-cols-4 gap-4 xl:gap-6">
                {statCards.map((stat) => {
                    const IconComponent = stat.icon;
                    return (
                        <motion.div key={stat.title} variants={fadeInUp}>
                            <Card className={`group border-gray-200 bg-white/50 backdrop-blur-sm transition-all duration-200 
                                           dark:border-slate-700 dark:bg-slate-800/50 
                                           hover:shadow-md ${stat.cardHover}`}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-700 dark:text-slate-300 
                                                        group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                        {stat.title}
                                    </CardTitle>
                                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${stat.bgColor} 
                                                   transition-all group-hover:scale-110 ${stat.hoverBgColor}`}>
                                        <IconComponent className={`h-4 w-4 ${stat.iconColor}`} />
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-1">
                                    <div className="text-lg font-bold text-gray-900 dark:text-white xl:text-xl">
                                        {stat.value}
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-slate-400 
                                                group-hover:text-gray-700 dark:group-hover:text-slate-300 transition-colors">
                                        {stat.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}