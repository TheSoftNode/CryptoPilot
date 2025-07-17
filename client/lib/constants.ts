// App information
export const APP_NAME = "AI Wallet Assistant";
export const APP_DESCRIPTION = "AI-driven interface for managing cryptocurrency transactions with natural language";
export const METAMASK_COLOR = "#F6851B";

// Network identifiers
export const NETWORKS = {
    ETHEREUM: "ethereum",
    GOERLI: "goerli",
    SEPOLIA: "sepolia",
    POLYGON: "polygon",
    ARBITRUM: "arbitrum",
    OPTIMISM: "optimism",
} as const;

// Chain IDs
export const CHAIN_IDS = {
    ETHEREUM: "0x1",
    GOERLI: "0x5",
    SEPOLIA: "0xaa36a7",
    POLYGON: "0x89",
    ARBITRUM: "0xa4b1",
    OPTIMISM: "0xa",
} as const;

// Mock token prices (for demo purposes)
export const TOKEN_PRICES = {
    ETH: 1800,
    DAI: 1,
    USDC: 1,
    WBTC: 36000,
    MATIC: 0.8,
    LINK: 12,
} as const;

// Example commands
export const EXAMPLE_COMMANDS = [
    {
        text: "Send 0.1 ETH to alice.eth",
        description: "Transfer ETH to an address or ENS name",
    },
    {
        text: "Swap 50 DAI for ETH",
        description: "Exchange tokens on decentralized exchanges",
    },
    {
        text: "Show my balance",
        description: "Check your wallet's token balances",
    },
    {
        text: "What's the gas price right now?",
        description: "Check current network conditions",
    },
    {
        text: "View my recent transactions",
        description: "See your transaction history",
    },
    {
        text: "Speed up my pending transaction",
        description: "Increase gas to accelerate a pending transaction",
    },
];

// Tutorial steps
export const TUTORIAL_STEPS = [
    {
        title: "Welcome to AI Wallet Assistant",
        description: "Your intelligent companion for managing cryptocurrency with natural language commands.",
    },
    {
        title: "Connect Your Wallet",
        description: "Start by connecting your MetaMask wallet to access your funds and send transactions.",
    },
    {
        title: "Use Natural Language",
        description: "Type commands in plain English like 'Send 0.1 ETH to alice.eth' or 'Show my balance'.",
    },
    {
        title: "Review Transactions",
        description: "Before anything is sent, you'll see a clear summary to review and approve in MetaMask.",
    },
];

// Transaction types
export const TRANSACTION_TYPES = {
    SEND: "send",
    SWAP: "swap",
    APPROVE: "approve",
    STAKE: "stake",
    UNSTAKE: "unstake",
    OTHER: "other",
} as const;

// Local storage keys
export const STORAGE_KEYS = {
    CHAT_HISTORY: "ai-wallet-chat-history",
    COMMAND_HISTORY: "ai-wallet-command-history",
    ADDRESS_BOOK: "ai-wallet-address-book",
    TRANSACTION_HISTORY: "ai-wallet-transaction-history",
    THEME: "ai-wallet-theme",
    IS_FIRST_VISIT: "ai-wallet-first-visit",
} as const;

// Default gas fees (in USD, for demo)
export const DEFAULT_GAS = {
    LOW: 1.2,
    MEDIUM: 1.8,
    HIGH: 2.5,
} as const;