"use client";

import { truncateAddress, formatUSD } from "@/lib/utils";
import WalletConnectButton from "./WalletConnectButton";

export function WalletStatus({
    isConnected,
    address,
    balance,
    onConnect,
}: {
    isConnected: boolean;
    address?: string;
    balance?: string;
    onConnect: () => void;
}) {
    // Format balance value for display with USD conversion
    const formattedBalance = balance ? `${balance} ETH (${formatUSD(parseFloat(balance) * 1800)})` : "0 ETH";

    if (!isConnected) {
        return <WalletConnectButton />;
    }

    return (
        <div className="flex items-center gap-2">
            <div className="text-right">
                <div className="text-xs font-medium text-muted-foreground">
                    {truncateAddress(address || "")}
                </div>
                <div className="text-xs font-medium">{formattedBalance}</div>
            </div>
        </div>
    );
}