"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatUSD } from "@/lib/utils";

interface TokenBalanceCardProps {
    symbol: string;
    name: string;
    balance: number;
    price: number;
    priceChange: number;
    iconUrl?: string;
}

export function TokenBalanceCard({
    symbol,
    name,
    balance,
    price,
    priceChange,
    iconUrl,
}: TokenBalanceCardProps) {
    const value = balance * price;
    const isPositive = priceChange >= 0;

    return (
        <Card className="group h-full border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm transition-all 
                       hover:border-gray-400 hover:bg-white/90 hover:shadow-md 
                       dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600 
                       dark:hover:bg-slate-800/70">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 
                                      dark:bg-slate-700/50 sm:h-10 sm:w-10">
                            {iconUrl ? (
                                <img
                                    src={iconUrl}
                                    alt={symbol}
                                    className="h-8 w-8 rounded-full sm:h-10 sm:w-10"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            ) : (
                                <div className="flex h-8 w-8 items-center justify-center rounded-full 
                                              bg-blue-100 text-xs font-bold text-blue-600 
                                              dark:bg-blue-500/20 dark:text-blue-400 
                                              sm:h-10 sm:w-10 sm:text-sm">
                                    {symbol.substring(0, 2)}
                                </div>
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <CardTitle className="text-sm font-semibold text-gray-900 dark:text-white sm:text-base">
                                {symbol}
                            </CardTitle>
                            <CardDescription className="text-xs text-gray-500 dark:text-slate-400 truncate">
                                {name}
                            </CardDescription>
                        </div>
                    </div>
                    <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium shrink-0 ${
                        isPositive 
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' 
                            : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                    }`}>
                        {isPositive ? (
                            <TrendingUp className="h-3 w-3" />
                        ) : (
                            <TrendingDown className="h-3 w-3" />
                        )}
                        <span className="hidden sm:inline">{Math.abs(priceChange).toFixed(2)}%</span>
                        <span className="sm:hidden">{Math.abs(priceChange).toFixed(1)}%</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl lg:text-2xl">
                        {formatUSD(value)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-400 sm:text-sm">
                        Portfolio Value
                    </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <div className="min-w-0 flex-1">
                        <div className="font-medium text-gray-800 dark:text-slate-300 truncate">
                            {balance.toFixed(4)} {symbol}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-slate-500">Balance</div>
                    </div>
                    <div className="text-right shrink-0">
                        <div className="font-medium text-gray-800 dark:text-slate-300">
                            {formatUSD(price)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-slate-500">Price</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}