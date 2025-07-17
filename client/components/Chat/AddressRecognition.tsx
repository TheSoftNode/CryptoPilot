"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, User, ExternalLink } from "lucide-react";
import { useAddressBook } from "@/hooks/use-address-book";
import { truncateAddress } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface AddressRecognitionProps {
    text: string;
}

export function AddressRecognition({ text }: AddressRecognitionProps) {
    const { addressBook } = useAddressBook();
    const [recognizedAddresses, setRecognizedAddresses] = useState<{
        address: string;
        inAddressBook: boolean;
        name?: string;
    }[]>([]);
    const router = useRouter();

    useEffect(() => {
        // Simple regex to find Ethereum addresses
        const addressRegex = /0x[a-fA-F0-9]{40}/g;
        const matches = text.match(addressRegex);

        if (matches) {
            const uniqueAddresses = [...new Set(matches)];

            const addressInfo = uniqueAddresses.map(address => {
                const entry = addressBook.find(
                    entry => entry.address.toLowerCase() === address.toLowerCase()
                );

                return {
                    address,
                    inAddressBook: !!entry,
                    name: entry?.name,
                };
            });

            setRecognizedAddresses(addressInfo);
        } else {
            setRecognizedAddresses([]);
        }
    }, [text, addressBook]);

    if (recognizedAddresses.length === 0) {
        return null;
    }

    return (
        <div className="mt-2 space-y-2">
            {recognizedAddresses.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center gap-2 rounded-md border p-2 text-xs hover:border-[#2081cb]/30"
                >
                    {item.inAddressBook ? (
                        <>
                            <User className="h-4 w-4 text-[#2081cb]" />
                            <div>
                                <span className="font-medium">{item.name}</span>
                                <span className="ml-2 text-muted-foreground">
                                    ({truncateAddress(item.address)})
                                </span>
                            </div>
                        </>
                    ) : (
                        <>
                            <span className="font-mono">{truncateAddress(item.address)}</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 gap-1 text-xs text-[#2081cb] hover:bg-[#2081cb]/10"
                                onClick={() => router.push("/address-book")}
                            >
                                <PlusCircle className="h-3 w-3" />
                                Add to contacts
                            </Button>
                        </>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto h-6 w-6 hover:bg-[#2081cb]/10 hover:text-[#2081cb]"
                        asChild
                    >
                        <a
                            href={`https://etherscan.io/address/${item.address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ExternalLink className="h-3 w-3" />
                            <span className="sr-only">View on Etherscan</span>
                        </a>
                    </Button>
                </div>
            ))}
        </div>
    );
}