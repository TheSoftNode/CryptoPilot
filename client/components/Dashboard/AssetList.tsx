"use client";

import { useState, useCallback, useMemo } from "react";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    SortingState,
    useReactTable,
    ColumnDef,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, ExternalLink, Search, Coins } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatUSD } from "@/lib/utils";

interface TokenInfo {
    symbol: string;
    name: string;
    decimals: number;
    price?: number;
    balance?: number;
    value?: number;
    change24h?: number;
    logoUrl?: string;
}

interface AssetListProps {
    tokens: TokenInfo[];
}

export function AssetList({ tokens }: AssetListProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState("");

    // Memoize data preparation to prevent unnecessary recalculations
    const data = useMemo(() => {
        return tokens.map(token => ({
            ...token,
            balance: token.balance || Math.random() * 100,
            value: (token.balance || Math.random() * 100) * (token.price || 0),
            change24h: token.change24h || (Math.random() * 20) - 10,
        }));
    }, [tokens]);

    // Memoize handlers to prevent unnecessary re-renders
    const handleClearSearch = useCallback(() => {
        setGlobalFilter("");
    }, []);

    const columns: ColumnDef<typeof data[0]>[] = useMemo(() => [
        {
            accessorKey: "name",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900 dark:text-slate-300 dark:hover:text-white"
                >
                    Asset
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const token = row.original;
                return (
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="h-7 w-7 shrink-0 rounded-full bg-gray-200 dark:bg-slate-700/50 sm:h-8 sm:w-8">
                            {token.logoUrl ? (
                                <img
                                    src={token.logoUrl}
                                    alt={token.symbol}
                                    className="h-7 w-7 rounded-full sm:h-8 sm:w-8"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            ) : (
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 sm:h-8 sm:w-8">
                                    {token.symbol.substring(0, 2)}
                                </div>
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="font-medium text-gray-900 dark:text-white truncate text-sm sm:text-base">
                                {token.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-slate-400 truncate sm:text-sm">
                                {token.symbol}
                            </div>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "balance",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900 dark:text-slate-300 dark:hover:text-white justify-end w-full"
                >
                    Balance
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const balance = parseFloat(row.getValue("balance"));
                const symbol = row.original.symbol;
                return (
                    <div className="text-right">
                        <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                            {balance.toFixed(4)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-slate-400 sm:text-sm">
                            {symbol}
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "price",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900 dark:text-slate-300 dark:hover:text-white justify-end w-full hidden md:flex"
                >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const price = parseFloat(row.getValue("price"));
                return (
                    <div className="text-right font-medium text-gray-900 dark:text-white hidden md:block">
                        {formatUSD(price)}
                    </div>
                );
            },
        },
        {
            accessorKey: "value",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900 dark:text-slate-300 dark:hover:text-white justify-end w-full"
                >
                    Value
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const value = parseFloat(row.getValue("value"));
                const price = parseFloat(row.getValue("price"));
                return (
                    <div className="text-right">
                        <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                            {formatUSD(value)}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-slate-400 md:hidden">
                            {formatUSD(price)}
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "change24h",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="h-auto p-0 font-medium text-gray-700 hover:text-gray-900 dark:text-slate-300 dark:hover:text-white justify-end w-full"
                >
                    <span className="hidden sm:inline">24h</span>
                    <span className="sm:hidden">%</span>
                    <ArrowUpDown className="ml-1 h-4 w-4 sm:ml-2" />
                </Button>
            ),
            cell: ({ row }) => {
                const change = parseFloat(row.getValue("change24h"));
                return (
                    <div className={`flex items-center justify-end gap-1 text-right font-medium text-xs sm:text-sm ${
                        change >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                        {change >= 0
                            ? <ArrowUp className="h-3 w-3" />
                            : <ArrowDown className="h-3 w-3" />}
                        <span className="hidden sm:inline">{Math.abs(change).toFixed(2)}%</span>
                        <span className="sm:hidden">{Math.abs(change).toFixed(1)}%</span>
                    </div>
                );
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const token = row.original;
                return (
                    <div className="text-right">
                        <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="h-7 w-7 p-0 hover:bg-gray-100 dark:hover:bg-slate-700 sm:h-8 sm:w-8"
                        >
                            <a
                                href={`https://etherscan.io/token/${token.symbol}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <ExternalLink className="h-3 w-3 text-gray-500 dark:text-slate-400 sm:h-4 sm:w-4" />
                                <span className="sr-only">View on Etherscan</span>
                            </a>
                        </Button>
                    </div>
                );
            },
        },
    ], []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        state: {
            sorting,
            globalFilter,
        },
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    return (
        <div className="w-full space-y-4">
            {/* Search and Stats */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="relative flex-1 sm:flex-none">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-slate-400" />
                    <Input
                        placeholder="Search tokens..."
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="w-full pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 
                                 focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                                 dark:bg-slate-800/50 dark:border-slate-700 dark:text-slate-200 
                                 dark:placeholder:text-slate-400 dark:focus:border-blue-500 
                                 dark:focus:ring-blue-500 sm:w-80"
                    />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
                    <Coins className="h-4 w-4" />
                    <span>
                        {data.length} {data.length === 1 ? 'token' : 'tokens'}
                    </span>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-lg border border-gray-300 bg-white/50 dark:border-slate-700 dark:bg-slate-800/30">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow 
                                    key={headerGroup.id}
                                    className="border-gray-200 hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800/50"
                                >
                                    {headerGroup.headers.map((header) => (
                                        <TableHead 
                                            key={header.id}
                                            className="border-gray-200 text-gray-700 dark:border-slate-700 dark:text-slate-300"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="border-gray-200 transition-colors hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800/50"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell 
                                                key={cell.id}
                                                className="border-gray-200 py-3 dark:border-slate-700 sm:py-4"
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow className="border-gray-200 dark:border-slate-700">
                                    <TableCell colSpan={columns.length} className="h-32 text-center sm:h-40">
                                        <div className="flex flex-col items-center gap-3">
                                            <Coins className="h-8 w-8 text-gray-400 dark:text-slate-500" />
                                            <div className="space-y-2">
                                                <span className="text-gray-600 dark:text-slate-400">No tokens found</span>
                                                {globalFilter && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={handleClearSearch}
                                                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                                    >
                                                        Clear search
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Pagination */}
            {table.getPageCount() > 1 && (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div className="text-sm text-gray-600 dark:text-slate-400 order-2 sm:order-1">
                        <span className="hidden sm:inline">
                            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
                            {Math.min(
                                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                                table.getFilteredRowModel().rows.length
                            )}{" "}
                            of {table.getFilteredRowModel().rows.length} entries
                        </span>
                        <span className="sm:hidden">
                            {table.getFilteredRowModel().rows.length} total entries
                        </span>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-2 order-1 sm:order-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 
                                     dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 
                                     dark:hover:bg-slate-700 dark:hover:text-white disabled:opacity-50"
                        >
                            <span className="hidden sm:inline">Previous</span>
                            <span className="sm:hidden">Prev</span>
                        </Button>
                        <div className="flex items-center gap-1">
                            <span className="text-sm text-gray-600 dark:text-slate-400">
                                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                            </span>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 
                                     dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 
                                     dark:hover:bg-slate-700 dark:hover:text-white disabled:opacity-50"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}