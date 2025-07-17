"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    BarChart3,
    Clock,
    Layers,
    RefreshCw,
    TrendingUp,
    PieChart,
    Activity
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWallet } from "@/hooks/use-wallet";
import { formatUSD } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { tokens, transactionHistory } from "@/lib/mock-data";
import { NetworkSelector } from "./NetworkSelector";
import { TokenBalanceCard } from "./TokenBalanceCard";
import { PortfolioChart } from "./PortfolioChart";
import { TransactionsList } from "./TransactionsList";
import { AssetList } from "./AssetList";
import { RecentTransactionsWidget } from "./RecentTransactionsWidget";

export function PortfolioDashboard() {
    const { balance } = useWallet();
    const [timeFrame, setTimeFrame] = useState("1W");
    const [portfolioValue, setPortfolioValue] = useState(0);
    const [portfolioChange, setPortfolioChange] = useState(0);

    // Memoize portfolio calculations to prevent unnecessary re-renders
    const calculatePortfolioValue = useCallback(() => {
        if (balance) {
            // Mock ETH balance plus a few other tokens
            const ethValue = parseFloat(balance.formatted) * 1800; // Assuming $1800 per ETH

            // Add some mock token values
            const tokenValue = 450; // Mock value of other tokens

            setPortfolioValue(ethValue + tokenValue);

            // Mock portfolio change
            setPortfolioChange(timeFrame === "1D" ? 2.4 :
                timeFrame === "1W" ? -1.3 :
                    timeFrame === "1M" ? 8.7 : 15.2);
        }
    }, [balance, timeFrame]);

    useEffect(() => {
        calculatePortfolioValue();
    }, [calculatePortfolioValue]);

    // Memoize handlers to prevent unnecessary re-renders
    const handleTimeFrameChange = useCallback((value: string) => {
        setTimeFrame(value);
    }, []);

    const handleRefresh = useCallback(() => {
        calculatePortfolioValue();
    }, [calculatePortfolioValue]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            <motion.div
                className="container mx-auto px-4 py-6 sm:px-6 lg:px-8"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
            >
                {/* Header Section */}
                <motion.div 
                    variants={fadeInUp}
                    className="mb-6 flex flex-col space-y-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
                >
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                            Portfolio Overview
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-slate-400 sm:text-base">
                            Track and manage your crypto assets with real-time insights
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <NetworkSelector />
                        <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={handleRefresh}
                            className="gap-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 
                                     dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 
                                     dark:hover:bg-slate-700 dark:hover:text-white"
                        >
                            <RefreshCw className="h-4 w-4" />
                            <span className="hidden sm:inline">Refresh</span>
                        </Button>
                    </div>
                </motion.div>

                {/* Main Portfolio Value Card */}
                <motion.div variants={fadeInUp} className="mb-6 sm:mb-8">
                    <Card className="border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm 
                                   dark:border-slate-800 dark:bg-slate-800/50">
                        <CardHeader className="pb-4">
                            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                                <div>
                                    <CardDescription className="text-gray-600 dark:text-slate-400">
                                        Total Portfolio Value
                                    </CardDescription>
                                    <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                                        {formatUSD(portfolioValue)}
                                    </CardTitle>
                                </div>
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                                    <div className={`flex items-center gap-1 text-sm font-medium ${
                                        portfolioChange >= 0 
                                            ? 'text-emerald-600 dark:text-emerald-400' 
                                            : 'text-red-600 dark:text-red-400'
                                    }`}>
                                        {portfolioChange >= 0
                                            ? <ArrowUpRight className="h-4 w-4" />
                                            : <ArrowDownRight className="h-4 w-4" />}
                                        {Math.abs(portfolioChange).toFixed(2)}% ({timeFrame})
                                    </div>
                                    <Select
                                        defaultValue={timeFrame}
                                        onValueChange={handleTimeFrameChange}
                                    >
                                        <SelectTrigger className="w-[110px] border-gray-300 bg-white text-gray-900 
                                                                dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="border-gray-300 bg-white 
                                                               dark:border-slate-700 dark:bg-slate-800">
                                            <SelectItem value="1D">1 Day</SelectItem>
                                            <SelectItem value="1W">1 Week</SelectItem>
                                            <SelectItem value="1M">1 Month</SelectItem>
                                            <SelectItem value="1Y">1 Year</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
                                    <Activity className="h-4 w-4" />
                                    <span>Last updated: just now</span>
                                </div>
                                <Button variant="ghost" size="sm" 
                                      className="gap-2 text-gray-600 hover:text-gray-900 
                                               dark:text-slate-400 dark:hover:text-white">
                                    <BarChart3 className="h-4 w-4" />
                                    Analytics
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Token Balance Cards Grid */}
                <motion.div variants={fadeInUp} className="mb-6 space-y-6 sm:mb-8">
                    {/* Token Balance Cards Grid */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {/* ETH Balance Card */}
                        <div className="w-full">
                            <TokenBalanceCard
                                symbol="ETH"
                                name="Ethereum"
                                balance={balance ? parseFloat(balance.formatted) : 0}
                                price={1800}
                                priceChange={3.2}
                                iconUrl="/api/placeholder/32/32"
                            />
                        </div>

                        {/* DAI Balance Card */}
                        <div className="w-full">
                            <TokenBalanceCard
                                symbol="DAI"
                                name="Dai Stablecoin"
                                balance={100}
                                price={1}
                                priceChange={0.01}
                                iconUrl="/api/placeholder/32/32"
                            />
                        </div>

                        {/* LINK Balance Card */}
                        <div className="w-full">
                            <TokenBalanceCard
                                symbol="LINK"
                                name="Chainlink"
                                balance={25}
                                price={12}
                                priceChange={-1.5}
                                iconUrl="/api/placeholder/32/32"
                            />
                        </div>
                    </div>

                    {/* Recent Transactions Widget - Full Width */}
                    <div className="w-full">
                        <RecentTransactionsWidget />
                    </div>
                </motion.div>

                {/* Charts and Analytics Section */}
                <motion.div variants={fadeInUp} className="mb-6 sm:mb-8">
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Portfolio Performance Chart */}
                        <div className="lg:col-span-2">
                            <Card className="h-full border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm 
                                           dark:border-slate-800 dark:bg-slate-800/50">
                                <CardHeader className="pb-4">
                                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                                        <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                                            <TrendingUp className="h-5 w-5" />
                                            Portfolio Performance
                                        </CardTitle>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="sm" 
                                                  className="text-gray-600 hover:text-gray-900 
                                                           dark:text-slate-400 dark:hover:text-white">
                                                <PieChart className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="h-[300px] p-0 sm:h-[400px]">
                                    <PortfolioChart timeFrame={timeFrame} />
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Transactions */}
                        <div className="lg:col-span-1">
                            <Card className="h-full border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm 
                                           dark:border-slate-800 dark:bg-slate-800/50">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center justify-between text-gray-900 dark:text-white">
                                        <span className="flex items-center gap-2">
                                            <Clock className="h-5 w-5" />
                                            Recent Activity
                                        </span>
                                        <Button variant="ghost" size="sm" 
                                              className="text-gray-600 hover:text-gray-900 
                                                       dark:text-slate-400 dark:hover:text-white">
                                            View All
                                        </Button>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <TransactionsList transactions={transactionHistory.slice(0, 5)} />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </motion.div>

                {/* Assets Section */}
                <motion.div variants={fadeInUp}>
                    <Card className="border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm 
                                   dark:border-slate-800 dark:bg-slate-800/50">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                                <Wallet className="h-5 w-5" />
                                Your Assets
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="tokens" className="w-full">
                                <TabsList className="mb-6 grid w-full grid-cols-2 bg-gray-100 
                                                  dark:bg-slate-800 sm:w-auto">
                                    <TabsTrigger 
                                        value="tokens"
                                        className="data-[state=active]:bg-white data-[state=active]:text-gray-900 
                                                 dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-white"
                                    >
                                        Tokens
                                    </TabsTrigger>
                                    <TabsTrigger 
                                        value="nfts"
                                        className="data-[state=active]:bg-white data-[state=active]:text-gray-900 
                                                 dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-white"
                                    >
                                        NFTs
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="tokens" className="mt-6">
                                    <AssetList tokens={tokens} />
                                </TabsContent>
                                <TabsContent value="nfts" className="mt-6">
                                    <div className="flex h-32 items-center justify-center rounded-lg border border-dashed 
                                                  border-gray-300 bg-gray-50 dark:border-slate-700 dark:bg-slate-800/30 
                                                  sm:h-40">
                                        <div className="text-center">
                                            <Layers className="mx-auto h-8 w-8 text-gray-400 dark:text-slate-500" />
                                            <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
                                                No NFTs found in this wallet
                                            </p>
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="mt-2 text-gray-600 hover:text-gray-900 
                                                         dark:text-slate-400 dark:hover:text-white"
                                            >
                                                Browse NFTs
                                            </Button>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    );
}