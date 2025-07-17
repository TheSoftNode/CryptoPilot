// hooks/use-address-book.ts
"use client";

import { useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { STORAGE_KEYS } from "@/lib/constants";
import { AddressBookEntry, Network } from "@/types";

export function useAddressBook() {
    const [addressBook, setAddressBook] = useLocalStorage<AddressBookEntry[]>(
        STORAGE_KEYS.ADDRESS_BOOK,
        []
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Add new address
    const addAddress = useCallback(
        (name: string, address: string, network: Network, notes?: string, tags?: string[]) => {
            try {
                setLoading(true);
                setError(null);

                // Validate address (basic validation for demo)
                if (!address.startsWith("0x") || address.length !== 42) {
                    throw new Error("Invalid Ethereum address format");
                }

                // Check for duplicates
                const isDuplicate = addressBook.some(
                    (entry) => entry.address.toLowerCase() === address.toLowerCase() && entry.network === network
                );

                if (isDuplicate) {
                    throw new Error("This address already exists in your address book");
                }

                const newEntry: AddressBookEntry = {
                    id: uuidv4(),
                    name,
                    address,
                    network,
                    notes,
                    tags,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };

                setAddressBook([...addressBook, newEntry]);
                return newEntry;
            } catch (err: any) {
                setError(err.message || "Failed to add address");
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [addressBook, setAddressBook]
    );

    // Update existing address
    const updateAddress = useCallback(
        (
            id: string,
            updates: Partial<Omit<AddressBookEntry, "id" | "createdAt" | "updatedAt">>
        ) => {
            try {
                setLoading(true);
                setError(null);

                const entryIndex = addressBook.findIndex((entry) => entry.id === id);
                if (entryIndex === -1) {
                    throw new Error("Address not found");
                }

                // Check for duplicate if address is being updated
                if (
                    updates.address &&
                    updates.address !== addressBook[entryIndex].address
                ) {
                    const isDuplicate = addressBook.some(
                        (entry) =>
                            entry.id !== id &&
                            entry.address.toLowerCase() === updates.address!.toLowerCase() &&
                            entry.network === (updates.network || addressBook[entryIndex].network)
                    );

                    if (isDuplicate) {
                        throw new Error("This address already exists in your address book");
                    }
                }

                const updatedEntries = [...addressBook];
                updatedEntries[entryIndex] = {
                    ...updatedEntries[entryIndex],
                    ...updates,
                    updatedAt: new Date(),
                };

                setAddressBook(updatedEntries);
                return updatedEntries[entryIndex];
            } catch (err: any) {
                setError(err.message || "Failed to update address");
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [addressBook, setAddressBook]
    );

    // Delete address
    const deleteAddress = useCallback(
        (id: string) => {
            try {
                setLoading(true);
                setError(null);

                const filteredEntries = addressBook.filter((entry) => entry.id !== id);
                setAddressBook(filteredEntries);
            } catch (err: any) {
                setError(err.message || "Failed to delete address");
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [addressBook, setAddressBook]
    );

    // Get address by id
    const getAddressById = useCallback(
        (id: string) => {
            return addressBook.find((entry) => entry.id === id) || null;
        },
        [addressBook]
    );

    // Search addresses
    const searchAddresses = useCallback(
        (query: string) => {
            const lowerQuery = query.toLowerCase();
            return addressBook.filter(
                (entry) =>
                    entry.name.toLowerCase().includes(lowerQuery) ||
                    entry.address.toLowerCase().includes(lowerQuery) ||
                    entry.notes?.toLowerCase().includes(lowerQuery) ||
                    entry.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
            );
        },
        [addressBook]
    );

    return {
        addressBook,
        loading,
        error,
        addAddress,
        updateAddress,
        deleteAddress,
        getAddressById,
        searchAddresses,
    };
}