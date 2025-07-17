"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NetworkIndicatorProps {
    network: string | null;
    className?: string;
}

export function NetworkIndicator({ network, className }: NetworkIndicatorProps) {
    // Get network color and name based on the network identifier
    const getNetworkInfo = (network: string | null) => {
        switch (network) {
            case "ethereum":
                return {
                    name: "Ethereum",
                    bgColor: "bg-[#627EEA]/10",
                    textColor: "text-[#627EEA]",
                    dotColor: "bg-[#627EEA]",
                };
            case "goerli":
                return {
                    name: "Goerli Testnet",
                    bgColor: "bg-yellow-500/10",
                    textColor: "text-yellow-500",
                    dotColor: "bg-yellow-500",
                };
            case "sepolia":
                return {
                    name: "Sepolia Testnet",
                    bgColor: "bg-purple-500/10",
                    textColor: "text-purple-500",
                    dotColor: "bg-purple-500",
                };
            case "polygon":
                return {
                    name: "Polygon",
                    bgColor: "bg-[#8247E5]/10",
                    textColor: "text-[#8247E5]",
                    dotColor: "bg-[#8247E5]",
                };
            case "arbitrum":
                return {
                    name: "Arbitrum",
                    bgColor: "bg-[#28A0F0]/10",
                    textColor: "text-[#28A0F0]",
                    dotColor: "bg-[#28A0F0]",
                };
            case "optimism":
                return {
                    name: "Optimism",
                    bgColor: "bg-[#FF0420]/10",
                    textColor: "text-[#FF0420]",
                    dotColor: "bg-[#FF0420]",
                };
            default:
                return {
                    name: "Unknown Network",
                    bgColor: "bg-gray-500/10",
                    textColor: "text-gray-500",
                    dotColor: "bg-gray-500",
                };
        }
    };

    const networkInfo = getNetworkInfo(network);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Badge
                variant="outline"
                className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1",
                    networkInfo.bgColor,
                    networkInfo.textColor,
                    className
                )}
            >
                <span className="relative flex h-2 w-2">
                    <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-75", networkInfo.dotColor)}></span>
                    <span
                        className={cn(
                            "relative inline-flex h-2 w-2 rounded-full",
                            networkInfo.dotColor
                        )}
                    ></span>
                </span>
                {networkInfo.name}
            </Badge>
        </motion.div>
    );
}