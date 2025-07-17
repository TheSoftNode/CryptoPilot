"use client";

import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    Copy,
    ExternalLink,
    Tag,
    Filter,
    CheckCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAddressBook } from "@/hooks/use-address-book";
import { AddressBookEntry, Network } from "@/types";
import { truncateAddress } from "@/lib/utils";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AddressForm } from "./AddressForm";

export function AddressBookList() {
    const { addressBook, loading, error, deleteAddress } = useAddressBook();
    const [searchQuery, setSearchQuery] = useState("");
    const [editingEntry, setEditingEntry] = useState<AddressBookEntry | undefined>(undefined);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [copied, setCopied] = useState<string | null>(null);
    const [activeNetworkFilter, setActiveNetworkFilter] = useState<Network | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);

    // Memoize handlers to prevent unnecessary re-renders
    const handleCopyToClipboard = useCallback((text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    }, []);

    const handleDeleteConfirm = useCallback(() => {
        if (deletingId) {
            deleteAddress(deletingId);
            setDeletingId(null);
        }
    }, [deletingId, deleteAddress]);

    const handleCloseForm = useCallback(() => {
        setEditingEntry(undefined);
        setShowAddForm(false);
    }, []);

    const handleClearFilters = useCallback(() => {
        setSearchQuery("");
        setActiveNetworkFilter(null);
    }, []);

    // Memoize filtered addresses to prevent unnecessary recalculations
    const filteredAddresses = useMemo(() => {
        return addressBook.filter(entry => {
            const matchesSearch =
                searchQuery === "" ||
                entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                entry.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                entry.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                entry.notes?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesNetwork = activeNetworkFilter === null || entry.network === activeNetworkFilter;

            return matchesSearch && matchesNetwork;
        });
    }, [addressBook, searchQuery, activeNetworkFilter]);

    // Memoize unique networks for filter
    const networks = useMemo(() => {
        return Array.from(new Set(addressBook.map(entry => entry.network)));
    }, [addressBook]);

    // Network display names
    const networkNames: Record<Network, string> = {
        ethereum: "Ethereum",
        goerli: "Goerli",
        sepolia: "Sepolia",
        polygon: "Polygon",
        arbitrum: "Arbitrum",
        optimism: "Optimism",
    };

    // Network colors - Light and Dark mode
    const networkColors: Record<Network, string> = {
        ethereum: "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700/50",
        goerli: "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700/50",
        sepolia: "bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-700/50",
        polygon: "bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-700/50",
        arbitrum: "bg-cyan-100 text-cyan-700 border-cyan-300 dark:bg-cyan-900/30 dark:text-cyan-400 dark:border-cyan-700/50",
        optimism: "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700/50",
    };

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="w-full"
        >
            {/* Edit form modal */}
            {(editingEntry || showAddForm) && (
                <motion.div
                    className="mb-6 sm:mb-8"
                    variants={fadeInUp}
                    initial="hidden"
                    animate="show"
                >
                    <AddressForm
                        onClose={handleCloseForm}
                        editEntry={editingEntry}
                    />
                </motion.div>
            )}

            {/* Delete confirmation dialog */}
            <AlertDialog open={deletingId !== null} onOpenChange={(open) => !open && setDeletingId(null)}>
                <AlertDialogContent className="mx-4 w-[calc(100vw-2rem)] max-w-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white sm:mx-0 sm:w-full">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:via-teal-400 dark:to-pink-400">
                            Are you sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
                            This will permanently delete this address from your address book.
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                        <AlertDialogCancel className="bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            className="bg-red-600 text-white hover:bg-red-700 dark:bg-gradient-to-r dark:from-red-600 dark:to-red-800 dark:hover:from-red-700 dark:hover:to-red-900"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Card className="bg-white/80 backdrop-blur-sm border-gray-300 shadow-lg dark:bg-gray-800/80 dark:border-gray-700/50">
                <CardHeader className="border-b border-gray-200 dark:border-gray-700/50">
                    <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                        <div>
                            <CardTitle className="text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:via-teal-400 dark:to-pink-400">
                                Saved Addresses
                            </CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-300">
                                Manage your frequently used addresses
                            </CardDescription>
                        </div>
                        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 lg:flex-row lg:space-x-2">
                            <div className="relative flex-1 sm:flex-none">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                                <Input
                                    placeholder="Search addresses..."
                                    className="pl-10 w-full bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:w-64"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        <Filter className="h-4 w-4 mr-2 sm:mr-0" />
                                        <span className="sm:hidden">Filter</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-white border-gray-300 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
                                    <DropdownMenuLabel>Filter by Network</DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-gray-300 dark:bg-gray-700" />
                                    <DropdownMenuItem
                                        onClick={() => setActiveNetworkFilter(null)}
                                        className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                    >
                                        <span>All Networks</span>
                                        {activeNetworkFilter === null && <CheckCircle className="h-4 w-4 text-emerald-500" />}
                                    </DropdownMenuItem>
                                    {networks.map((network) => (
                                        <DropdownMenuItem
                                            key={network || 'unknown'}
                                            onClick={() => setActiveNetworkFilter(network)}
                                            className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                        >
                                            <span>{networkNames[network]}</span>
                                            {activeNetworkFilter === network && <CheckCircle className="h-4 w-4 text-emerald-500" />}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button
                                onClick={() => setShowAddForm(true)}
                                className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-gradient-to-r dark:from-blue-600 dark:via-teal-500 dark:to-pink-500 dark:hover:from-blue-700 dark:hover:via-teal-600 dark:hover:to-pink-600 shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                <span className="hidden sm:inline">Add Contact</span>
                                <span className="sm:hidden">Add</span>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                    {loading ? (
                        <div className="flex h-32 items-center justify-center sm:h-40">
                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent sm:h-8 sm:w-8 dark:border-t-transparent dark:border-b-blue-400 dark:border-r-teal-400 dark:border-l-pink-400"></div>
                        </div>
                    ) : filteredAddresses.length > 0 ? (
                        <div className="space-y-3 sm:space-y-4">
                            {filteredAddresses.map((entry) => (
                                <motion.div
                                    key={entry.id}
                                    variants={fadeInUp}
                                    className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 transition-all duration-300 hover:shadow-md hover:shadow-blue-200/50 hover:border-gray-300 dark:border-gray-700/50 dark:bg-gray-800/50 dark:hover:shadow-blue-900/20 dark:hover:border-gray-600/50"
                                    whileHover={{ y: -2 }}
                                >
                                    <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                                        <div className="min-w-0 flex-1 space-y-2">
                                            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                                                <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                                    {entry.name}
                                                </h3>
                                                <Badge
                                                    variant="outline"
                                                    className={`${networkColors[entry.network]} text-xs`}
                                                >
                                                    {networkNames[entry.network]}
                                                </Badge>
                                            </div>
                                            <div className="font-mono text-sm text-blue-600 dark:text-blue-300 break-all sm:break-normal">
                                                <span className="sm:hidden">{truncateAddress(entry.address, 6, 6)}</span>
                                                <span className="hidden sm:inline">{truncateAddress(entry.address, 10, 8)}</span>
                                            </div>
                                            {entry.notes && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400 break-words">
                                                    {entry.notes}
                                                </p>
                                            )}
                                            {entry.tags && entry.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-1 pt-1">
                                                    {entry.tags.map((tag) => (
                                                        <div
                                                            key={tag}
                                                            className="flex items-center gap-1 rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700/70 dark:text-gray-300"
                                                        >
                                                            <Tag className="h-3 w-3 text-teal-500 dark:text-teal-400" />
                                                            <span className="truncate max-w-20">{tag}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-end space-x-1 lg:justify-start">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleCopyToClipboard(entry.address, entry.id)}
                                                className={`p-2 ${copied === entry.id 
                                                    ? "text-emerald-500" 
                                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700/50"
                                                }`}
                                            >
                                                {copied === entry.id ? (
                                                    <CheckCircle className="h-4 w-4" />
                                                ) : (
                                                    <Copy className="h-4 w-4" />
                                                )}
                                                <span className="sr-only">Copy address</span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                asChild
                                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700/50"
                                            >
                                                <a
                                                    href={`https://etherscan.io/address/${entry.address}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                    <span className="sr-only">View on Etherscan</span>
                                                </a>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setEditingEntry(entry)}
                                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700/50"
                                            >
                                                <Pencil className="h-4 w-4" />
                                                <span className="sr-only">Edit contact</span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setDeletingId(entry.id)}
                                                className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Delete contact</span>
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex h-32 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-6 text-center dark:border-gray-700 dark:bg-gray-800/30 sm:h-40 sm:p-8">
                            <div className="text-gray-500 dark:text-gray-400">
                                {searchQuery || activeNetworkFilter
                                    ? "No addresses match your search or filter."
                                    : "No addresses saved yet."}
                            </div>
                            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
                                {(searchQuery || activeNetworkFilter) && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleClearFilters}
                                        className="border-gray-300 text-blue-600 hover:bg-blue-50 dark:border-gray-700 dark:text-blue-400 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                                    >
                                        Clear filters
                                    </Button>
                                )}
                                <Button
                                    size="sm"
                                    onClick={() => setShowAddForm(true)}
                                    className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-gradient-to-r dark:from-blue-600 dark:via-teal-500 dark:to-pink-500 dark:hover:from-blue-700 dark:hover:via-teal-600 dark:hover:to-pink-600"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add an address
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}