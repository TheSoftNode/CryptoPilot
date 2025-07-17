"use client";

import { useState } from "react";
import { Check, ChevronDown, Wifi } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { useAccount, useSwitchChain } from "wagmi";

// Map network names to chain IDs
const CHAIN_IDS = {
  ethereum: 1,
  polygon: 137,
  arbitrum: 42161,
  optimism: 10,
  goerli: 5,
  sepolia: 11155111,
} as const;

const networks = [
  { 
    id: "ethereum", 
    name: "Ethereum", 
    shortName: "ETH",
    icon: "🔷", 
    color: "bg-blue-500",
    isTestnet: false 
  },
  { 
    id: "polygon", 
    name: "Polygon", 
    shortName: "MATIC",
    icon: "🟣", 
    color: "bg-purple-500",
    isTestnet: false 
  },
  { 
    id: "arbitrum", 
    name: "Arbitrum", 
    shortName: "ARB",
    icon: "🔵", 
    color: "bg-blue-600",
    isTestnet: false 
  },
  { 
    id: "optimism", 
    name: "Optimism", 
    shortName: "OP",
    icon: "🔴", 
    color: "bg-red-500",
    isTestnet: false 
  },
  { 
    id: "goerli", 
    name: "Goerli Testnet", 
    shortName: "GOERLI",
    icon: "🟡", 
    color: "bg-yellow-500",
    isTestnet: true 
  },
  { 
    id: "sepolia", 
    name: "Sepolia Testnet", 
    shortName: "SEP",
    icon: "🟠", 
    color: "bg-orange-500",
    isTestnet: true 
  },
];

export function NetworkSelector() {
  const { chain, isConnected } = useAccount();
  const { switchChain, isPending } = useSwitchChain();
  const [open, setOpen] = useState(false);

  // Get current network from chain or default to ethereum
  const networkId = chain?.name?.toLowerCase() || "ethereum";
  const currentNetwork = networks.find(n => n.id === networkId) || networks[0];

  const handleSwitchNetwork = async (networkId: string) => {
    const chainId = CHAIN_IDS[networkId as keyof typeof CHAIN_IDS];
    if (switchChain && chainId && isConnected) {
      try {
        await switchChain({ chainId });
      } catch (error) {
        console.error("Failed to switch network:", error);
      }
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={!isConnected || isPending}
          className="w-full sm:w-auto min-w-[120px] max-w-[180px] justify-between 
                     border-gray-300 bg-white/80 text-gray-900 backdrop-blur-sm transition-all duration-200
                     hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900
                     dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-200 
                     dark:hover:bg-slate-700 dark:hover:border-slate-600 dark:hover:text-white
                     disabled:opacity-50 disabled:cursor-not-allowed sm:min-w-[140px] sm:max-w-[200px]"
        >
          <div className="flex items-center gap-1.5 min-w-0 sm:gap-2">
            {/* Network indicator */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              <div className={`w-2 h-2 rounded-full ${currentNetwork.color} 
                              ${isConnected ? 'animate-pulse' : 'opacity-50'}`} 
              />
              <span className="text-xs font-medium hidden sm:inline">
                {currentNetwork.icon}
              </span>
            </div>
            
            {/* Network name - responsive */}
            <span className="truncate text-xs sm:text-sm">
              <span className="sm:hidden">{currentNetwork.shortName}</span>
              <span className="hidden sm:inline">{currentNetwork.name}</span>
            </span>

            {/* Status badges */}
            {currentNetwork.isTestnet && (
              <Badge 
                variant="secondary" 
                className="hidden md:inline-flex bg-yellow-100 text-yellow-700 text-xs px-1.5 py-0.5
                         dark:bg-yellow-500/20 dark:text-yellow-400"
              >
                TEST
              </Badge>
            )}
          </div>
          
          <ChevronDown className={`ml-1 h-3 w-3 shrink-0 transition-transform duration-200 
                                  sm:ml-2 sm:h-4 sm:w-4
                                  ${open ? 'rotate-180' : ''} 
                                  ${isPending ? 'animate-spin' : ''}`} 
          />
        </Button>
      </PopoverTrigger>
      
      <PopoverContent 
        className="w-[260px] sm:w-[280px] lg:w-[320px] p-0 border-gray-300 bg-white/95 backdrop-blur-md
                 dark:border-slate-700 dark:bg-slate-800/95"
        align="end"
        sideOffset={8}
      >
        <Command className="bg-transparent">
          <CommandInput
            placeholder="Search networks..."
            className="border-none bg-transparent text-gray-900 placeholder:text-gray-400 
                       focus:ring-0 focus:ring-offset-0 h-10 sm:h-12
                       dark:text-slate-200 dark:placeholder:text-slate-400"
          />
          <CommandEmpty className="py-4 text-center text-sm text-gray-500 dark:text-slate-400 sm:py-6">
            <Wifi className="mx-auto h-6 w-6 mb-2 opacity-50 sm:h-8 sm:w-8" />
            No network found.
          </CommandEmpty>
          
          <CommandList className="max-h-[250px] overflow-y-auto sm:max-h-[300px]">
            {/* Mainnets */}
            <CommandGroup heading="Mainnets" className="text-gray-700 font-medium dark:text-slate-300">
              {networks.filter(network => !network.isTestnet).map((network) => (
                <CommandItem
                  key={network.id}
                  onSelect={() => handleSwitchNetwork(network.id)}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 
                           cursor-pointer transition-colors duration-150 rounded-md mx-1
                           dark:hover:bg-slate-700/50 sm:p-3"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${network.color} sm:w-3 sm:h-3`} />
                      <span className="text-base sm:text-lg">{network.icon}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-900 dark:text-slate-200 sm:text-sm">
                        {network.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-slate-400">
                        {network.shortName}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {currentNetwork.id === network.id && (
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs
                                                         dark:bg-emerald-500/20 dark:text-emerald-400">
                        Active
                      </Badge>
                    )}
                    <Check
                      className={`h-3 w-3 text-emerald-500 transition-opacity dark:text-emerald-400 sm:h-4 sm:w-4 ${
                        currentNetwork.id === network.id ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>

            {/* Testnets */}
            <CommandGroup heading="Testnets" className="text-gray-700 font-medium dark:text-slate-300">
              {networks.filter(network => network.isTestnet).map((network) => (
                <CommandItem
                  key={network.id}
                  onSelect={() => handleSwitchNetwork(network.id)}
                  className="flex items-center justify-between p-2 hover:bg-gray-100 
                           cursor-pointer transition-colors duration-150 rounded-md mx-1
                           dark:hover:bg-slate-700/50 sm:p-3"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${network.color} sm:w-3 sm:h-3`} />
                      <span className="text-base sm:text-lg">{network.icon}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-900 dark:text-slate-200 sm:text-sm">
                        {network.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-slate-400">
                        {network.shortName}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 text-xs
                                                       dark:bg-yellow-500/20 dark:text-yellow-400">
                      TEST
                    </Badge>
                    {currentNetwork.id === network.id && (
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs
                                                         dark:bg-emerald-500/20 dark:text-emerald-400">
                        Active
                      </Badge>
                    )}
                    <Check
                      className={`h-3 w-3 text-emerald-500 transition-opacity dark:text-emerald-400 sm:h-4 sm:w-4 ${
                        currentNetwork.id === network.id ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          
          {/* Footer */}
          <div className="border-t border-gray-200 p-2 dark:border-slate-700 sm:p-3">
            <p className="text-xs text-gray-500 text-center dark:text-slate-400">
              {isConnected ? (
                <>
                  <span className="inline-flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse sm:w-2 sm:h-2" />
                    Connected to {currentNetwork.name}
                  </span>
                </>
              ) : (
                "Connect wallet to switch networks"
              )}
            </p>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}