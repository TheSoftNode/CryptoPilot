"use client";

import { useState, useEffect } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useAddressBook } from "@/hooks/use-address-book";
import { truncateAddress } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Network } from "@/types";

interface AddressSelectorProps {
    onSelect: (address: string, name?: string) => void;
    network?: Network;
    placeholder?: string;
    buttonClassName?: string;
}

// Network display names
const networkNames: Record<Network, string> = {
    ethereum: "Ethereum",
    goerli: "Goerli",
    sepolia: "Sepolia",
    polygon: "Polygon",
    arbitrum: "Arbitrum",
    optimism: "Optimism",
};

export function AddressSelector({
    onSelect,
    network = "ethereum",
    placeholder = "Select contact",
    buttonClassName
}: AddressSelectorProps) {
    const { addressBook } = useAddressBook();
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedContactName, setSelectedContactName] = useState<string | null>(null);

    // Filter addresses by network and search query
    const filteredAddresses = addressBook.filter(entry => {
        const matchesNetwork = network === null || entry.network === network;
        const matchesSearch =
            searchValue === "" ||
            entry.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            entry.address.toLowerCase().includes(searchValue.toLowerCase());

        return matchesNetwork && matchesSearch;
    });

    const handleSelect = (address: string, name: string) => {
        onSelect(address, name);
        setSelectedContactName(name);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`text-[#2081cb] border-[#2081cb]/50 hover:bg-[#2081cb]/10 hover:border-[#2081cb] ${buttonClassName}`}
                >
                    {selectedContactName || placeholder}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search addresses..."
                        value={searchValue}
                        onValueChange={setSearchValue}
                        className="border-none focus:ring-[#2081cb]/20"
                    />
                    <CommandEmpty>
                        {addressBook.length === 0
                            ? "No saved addresses. Add contacts in the Address Book."
                            : "No addresses found."}
                    </CommandEmpty>
                    <CommandGroup>
                        <CommandList>
                            {filteredAddresses.map((entry) => (
                                <CommandItem
                                    key={entry.id}
                                    value={entry.id}
                                    onSelect={() => handleSelect(entry.address, entry.name)}
                                    className="hover:bg-[#2081cb]/10"
                                >
                                    <div className="flex flex-1 items-start flex-col">
                                        <div className="flex items-center gap-2">
                                            <Check
                                                className={`h-4 w-4 text-[#2081cb] ${selectedContactName === entry.name
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                                    }`}
                                            />
                                            <span>{entry.name}</span>
                                            <Badge variant="outline" className="text-xs border-[#2081cb]/30 text-[#2081cb]">
                                                {networkNames[entry.network]}
                                            </Badge>
                                        </div>
                                        <span className="ml-6 text-xs text-muted-foreground font-mono">
                                            {truncateAddress(entry.address)}
                                        </span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}