// Network types
export type Network = "ethereum" | "goerli" | "sepolia" | "polygon" | "arbitrum" | "optimism";

// Transaction types
export type TransactionType = "send" | "swap" | "approve" | "stake" | "unstake" | "other";

// Message types
export interface Message {
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: Date;
}

// Transaction details
export interface TransactionDetails {
    type: TransactionType;
    from: string;
    to: string;
    ensName?: string;
    amount: string;
    token: string;
    usdValue: number;
    gasFee: number;
    network: string;
    // For swaps
    toToken?: string;
    toAmount?: string;
    toUsdValue?: number;
    exchangeRate?: string;
}

// Wallet state
export interface WalletState {
    connected: boolean;
    connecting: boolean;
    address: string | null;
    balance: string | null;
    network: Network;
    error: string | null;
}

// Chat state
export interface ChatState {
    messages: Message[];
    loading: boolean;
    error: string | null;
}

// Token information
export interface TokenInfo {
    symbol: string;
    name: string;
    decimals: number;
    logoUrl?: string;
    address?: string;
    price?: number;
}

// Network information
export interface NetworkInfo {
    name: string;
    chainId: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
    blockExplorerUrl: string;
    rpcUrl: string;
    iconUrl?: string;
}

// Tutorial step
export interface TutorialStep {
    title: string;
    description: string;
    icon?: React.ReactNode;
    color?: string;
    bgColor?: string;
}

// Example command
export interface ExampleCommand {
    text: string;
    description: string;
    icon?: React.ReactNode;
}

// Theme type
export type Theme = "light" | "dark" | "system";

// Testimonial
export interface Testimonial {
    quote: string;
    author: string;
    role?: string;
    avatarUrl?: string;
}

// Feature
export interface Feature {
    title: string;
    description: string;
    icon?: React.ReactNode;
}


// Address book entry
export interface AddressBookEntry {
    id: string;
    name: string;
    address: string;
    network: Network;
    notes?: string;
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
}

// Address book state
export interface AddressBookState {
    entries: AddressBookEntry[];
    loading: boolean;
    error: string | null;
}

// types/index.ts (add to existing types)

export type TransactionStatus = "pending" | "confirmed" | "failed";

export interface Transaction {
    hash: string;
    from: string;
    to: string;
    value: string;
    token: string;
    tokenAmount?: string;
    gasUsed?: string;
    gasPrice?: string;
    timestamp: Date;
    status: TransactionStatus;
    network: Network;
    type: "send" | "receive" | "swap" | "approve" | "contract" | "other";
    nonce?: number;
    blockNumber?: number;
    contractAddress?: string;
    methodName?: string;
    fee?: string;
}

export interface TransactionHistoryState {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
}