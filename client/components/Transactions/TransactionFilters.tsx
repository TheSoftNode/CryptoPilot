"use client";

import { useState } from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TransactionStatus } from "@/types";

interface DateRangeProps {
    from: Date | undefined;
    to: Date | undefined;
}

export function TransactionFilters() {
    const [status, setStatus] = useState<TransactionStatus | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<DateRangeProps>({
        from: undefined,
        to: undefined,
    });

    const clearFilters = () => {
        setStatus(null);
        setToken(null);
        setDateRange({ from: undefined, to: undefined });
    };

    const hasActiveFilters = status || token || dateRange.from || dateRange.to;

    return (
        <div className="flex items-center gap-2">
            {/* Show active filters */}
            {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mr-2">
                    {status && (
                        <Badge
                            variant="outline"
                            className="flex items-center gap-1 pr-1 border-blue-600 text-blue-600 
                                     dark:border-blue-400 dark:text-blue-400"
                        >
                            Status: {status}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 ml-1 p-0 hover:bg-blue-600/10 hover:text-blue-600 
                                         dark:hover:bg-blue-400/10 dark:hover:text-blue-400"
                                onClick={() => setStatus(null)}
                            >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Remove status filter</span>
                            </Button>
                        </Badge>
                    )}

                    {token && (
                        <Badge
                            variant="outline"
                            className="flex items-center gap-1 pr-1 border-blue-600 text-blue-600 
                                     dark:border-blue-400 dark:text-blue-400"
                        >
                            Token: {token}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 ml-1 p-0 hover:bg-blue-600/10 hover:text-blue-600 
                                         dark:hover:bg-blue-400/10 dark:hover:text-blue-400"
                                onClick={() => setToken(null)}
                            >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Remove token filter</span>
                            </Button>
                        </Badge>
                    )}

                    {(dateRange.from || dateRange.to) && (
                        <Badge
                            variant="outline"
                            className="flex items-center gap-1 pr-1 border-blue-600 text-blue-600 
                                     dark:border-blue-400 dark:text-blue-400"
                        >
                            Date: {dateRange.from ? format(dateRange.from, "MMM d") : "Any"}
                            to {dateRange.to ? format(dateRange.to, "MMM d") : "Now"}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 ml-1 p-0 hover:bg-blue-600/10 hover:text-blue-600 
                                         dark:hover:bg-blue-400/10 dark:hover:text-blue-400"
                                onClick={() => setDateRange({ from: undefined, to: undefined })}
                            >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Remove date filter</span>
                            </Button>
                        </Badge>
                    )}

                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-blue-600 hover:bg-blue-600/10 
                                 dark:text-blue-400 dark:hover:bg-blue-400/10"
                        onClick={clearFilters}
                    >
                        Clear all
                    </Button>
                </div>
            )}

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 rounded-full border-blue-600 text-blue-600 hover:bg-blue-600/10 
                                 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400/10"
                    >
                        <Filter className="h-4 w-4" />
                        Filter
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 border-gray-300 bg-white dark:border-slate-700 dark:bg-slate-800">
                    <DropdownMenuLabel className="text-gray-900 dark:text-white">Filter Transactions</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-slate-700" />

                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-xs text-gray-500 dark:text-slate-400">Status</DropdownMenuLabel>
                        <DropdownMenuItem
                            className={cn(
                                "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700",
                                status === "pending" && "bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400"
                            )}
                            onClick={() => setStatus(status === "pending" ? null : "pending")}
                        >
                            Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className={cn(
                                "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700",
                                status === "confirmed" && "bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400"
                            )}
                            onClick={() => setStatus(status === "confirmed" ? null : "confirmed")}
                        >
                            Confirmed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className={cn(
                                "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700",
                                status === "failed" && "bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400"
                            )}
                            onClick={() => setStatus(status === "failed" ? null : "failed")}
                        >
                            Failed
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-slate-700" />

                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-xs text-gray-500 dark:text-slate-400">Token</DropdownMenuLabel>
                        <DropdownMenuItem
                            className={cn(
                                "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700",
                                token === "ETH" && "bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400"
                            )}
                            onClick={() => setToken(token === "ETH" ? null : "ETH")}
                        >
                            ETH
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className={cn(
                                "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700",
                                token === "DAI" && "bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400"
                            )}
                            onClick={() => setToken(token === "DAI" ? null : "DAI")}
                        >
                            DAI
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className={cn(
                                "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700",
                                token === "USDC" && "bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400"
                            )}
                            onClick={() => setToken(token === "USDC" ? null : "USDC")}
                        >
                            USDC
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-slate-700" />

                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-xs text-gray-500 dark:text-slate-400">Date Range</DropdownMenuLabel>
                        <div className="p-2">
                            <div className="flex items-center gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-left font-normal border-blue-600/30 text-blue-600 
                                                     hover:bg-blue-600/10 dark:border-blue-400/30 dark:text-blue-400 
                                                     dark:hover:bg-blue-400/10"
                                            size="sm"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {dateRange.from ? (
                                                format(dateRange.from, "MMM d, yyyy")
                                            ) : (
                                                <span>From date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 border-gray-300 bg-white dark:border-slate-700 dark:bg-slate-800">
                                        <Calendar
                                            mode="single"
                                            selected={dateRange.from}
                                            onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                                            initialFocus
                                            className="[&_.rbc-day-selected]:bg-blue-600 dark:[&_.rbc-day-selected]:bg-blue-400"
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="mt-2 flex items-center gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-left font-normal border-blue-600/30 text-blue-600 
                                                     hover:bg-blue-600/10 dark:border-blue-400/30 dark:text-blue-400 
                                                     dark:hover:bg-blue-400/10"
                                            size="sm"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {dateRange.to ? (
                                                format(dateRange.to, "MMM d, yyyy")
                                            ) : (
                                                <span>To date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 border-gray-300 bg-white dark:border-slate-700 dark:bg-slate-800">
                                        <Calendar
                                            mode="single"
                                            selected={dateRange.to}
                                            onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                                            initialFocus
                                            className="[&_.rbc-day-selected]:bg-blue-600 dark:[&_.rbc-day-selected]:bg-blue-400"
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-slate-700" />
                    <div className="p-2">
                        <Button
                            className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white 
                                     dark:bg-blue-500 dark:hover:bg-blue-600"
                            size="sm"
                            onClick={clearFilters}
                        >
                            Reset Filters
                        </Button>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}