import { Message, Transaction, TransactionStatus } from "@/types";
import { v4 as uuidv4 } from "uuid";

// Mock initial chat messages
export const initialMessages: Message[] = [
    {
        id: uuidv4(),
        role: "assistant",
        content: "👋 Hello! I'm your AI Wallet Assistant. Connect your wallet and tell me what you'd like to do. You can send transactions, check balances, or swap tokens using simple commands.\n\n**Example:** Try typing 'Send 0.1 ETH to alice.eth' or 'Show my balance'.",
        timestamp: new Date(),
    },
];

// Mock token list
export const tokens = [
    {
        symbol: "ETH",
        name: "Ethereum",
        decimals: 18,
        price: 1800,
    },
    {
        symbol: "DAI",
        name: "Dai Stablecoin",
        decimals: 18,
        price: 1,
    },
    {
        symbol: "USDC",
        name: "USD Coin",
        decimals: 6,
        price: 1,
    },
    {
        symbol: "WBTC",
        name: "Wrapped Bitcoin",
        decimals: 8,
        price: 36000,
    },
    {
        symbol: "MATIC",
        name: "Polygon",
        decimals: 18,
        price: 0.8,
    },
    {
        symbol: "LINK",
        name: "Chainlink",
        decimals: 18,
        price: 12,
    },
];

// Mock transaction history
// Update the existing transactionHistory array
export const transactionHistory: Transaction[] = [
    {
        hash: "0x123...abc",
        from: "0xYourAddress",
        to: "0xRecipient1",
        value: "0.5",
        token: "ETH",
        timestamp: new Date(Date.now() - 86400000),
        status: "confirmed" as TransactionStatus,
        gasUsed: "21000",
        gasPrice: "50",
        network: "ethereum",
        type: "send",
        fee: "0.002"
    },
    {
        hash: "0x456...def",
        from: "0xYourAddress",
        to: "0xRecipient2",
        value: "100",
        token: "DAI",
        timestamp: new Date(Date.now() - 172800000),
        status: "confirmed" as TransactionStatus,
        gasUsed: "65000",
        gasPrice: "40",
        network: "ethereum",
        type: "send",
        fee: "0.001"
    },
    {
        hash: "0x789...ghi",
        from: "0xYourAddress",
        to: "0xUniswap",
        value: "0.2",
        token: "ETH",
        timestamp: new Date(Date.now() - 259200000),
        status: "confirmed" as TransactionStatus,
        gasUsed: "180000",
        gasPrice: "60",
        network: "ethereum",
        type: "swap",
        fee: "0.003"
    },
];

// Mock ENS names
export const ensNames = {
    "alice.eth": "0x1234567890123456789012345678901234567890",
    "bob.eth": "0x2345678901234567890123456789012345678901",
    "charlie.eth": "0x3456789012345678901234567890123456789012",
    "dave.eth": "0x4567890123456789012345678901234567890123",
};

// Mock gas prices
export const gasPrices = {
    slow: 30,
    average: 50,
    fast: 80,
};

// Mock AI responses based on user input patterns
export const mockAIResponses: Record<string, string> = {
    balance: "Your current wallet balance is:\n\n- **{balance} ETH** (~${usdValue})\n\nIs there anything else you'd like to do?",

    send: "I've parsed your command to send {amount} {token} to {recipient}. Please review the transaction details and confirm.",

    swap: "I've parsed your command to swap {amount} {token} for {toToken}. Please review the transaction details and confirm.",

    gas: "Current gas prices on Ethereum:\n\n- **Slow**: {slow} gwei (~${slowUsd})\n- **Average**: {average} gwei (~${avgUsd})\n- **Fast**: {fast} gwei (~${fastUsd})\n\nWould you like to send a transaction with one of these gas prices?",

    history: "Here are your recent transactions:\n\n{transactions}\n\nWould you like to see more transactions or get details about a specific one?",

    fallback: "I'm not sure how to process that command. Try something like 'Show my balance', 'Send 0.1 ETH to alice.eth', or 'Swap 50 DAI for ETH'.",
};

// Mock user prompts for suggestions
export const userPrompts = [
    "Send 0.1 ETH to alice.eth",
    "Show my ETH balance",
    "Swap 50 DAI for ETH",
    "What's the current gas price?",
    "Show my recent transactions",
    "How much is 0.5 ETH in USD?",
];

// Replace placeholders in mock responses
export function formatMockResponse(template: string, values: Record<string, string | number>): string {
    let result = template;

    for (const [key, value] of Object.entries(values)) {
        result = result.replace(new RegExp(`{${key}}`, "g"), value.toString());
    }

    return result;
}


export const mockTransactions: Transaction[] = [
    {
        hash: "0xabcd1234abcd1234abcd1234abcd1234abcd1234abcd1234abcd1234abcd1234",
        from: "0xYourAddress",
        to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
        value: "0.5",
        token: "ETH",
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        status: "confirmed" as TransactionStatus,
        type: "send",
        network: "ethereum",
        fee: "0.002",
        blockNumber: 18745632,
        nonce: 42
    },
    {
        hash: "0xefgh5678efgh5678efgh5678efgh5678efgh5678efgh5678efgh5678efgh5678",
        from: "0x9b1f109551bD432803012645Ac136ddd64DBA83",
        to: "0xYourAddress",
        value: "100",
        token: "DAI",
        timestamp: new Date(Date.now() - 172800000), // 2 days ago
        status: "confirmed" as TransactionStatus,
        type: "receive",
        network: "ethereum",
        fee: "0.003",
        blockNumber: 18745532,
        nonce: 41
    },
    {
        hash: "0xijkl9012ijkl9012ijkl9012ijkl9012ijkl9012ijkl9012ijkl9012ijkl9012",
        from: "0xYourAddress",
        to: "0xUniswapV2Router02",
        value: "0.2",
        token: "ETH",
        tokenAmount: "600 DAI",
        timestamp: new Date(Date.now() - 259200000), // 3 days ago
        status: "confirmed" as TransactionStatus,
        type: "swap",
        network: "ethereum",
        fee: "0.004",
        blockNumber: 18745432,
        methodName: "swapExactETHForTokens",
        nonce: 40
    },
    {
        hash: "0xmnop3456mnop3456mnop3456mnop3456mnop3456mnop3456mnop3456mnop3456",
        from: "0xYourAddress",
        to: "0xDAI_CONTRACT_ADDRESS",
        value: "Unlimited",
        token: "DAI",
        timestamp: new Date(Date.now() - 345600000), // 4 days ago
        status: "confirmed" as TransactionStatus,
        type: "approve",
        network: "ethereum",
        fee: "0.002",
        blockNumber: 18745332,
        methodName: "approve",
        contractAddress: "0xUniswapV2Router02",
        nonce: 39
    },
    {
        hash: "0xqrst7890qrst7890qrst7890qrst7890qrst7890qrst7890qrst7890qrst7890",
        from: "0xYourAddress",
        to: "0x7ba1f109551bD432803012645Ac136ddd64DBA72",
        value: "0.1",
        token: "ETH",
        timestamp: new Date(Date.now() - 432000000), // 5 days ago
        status: "failed" as TransactionStatus,
        type: "send",
        network: "ethereum",
        fee: "0.001",
        nonce: 38
    },
    {
        hash: "0xuvwx1234uvwx1234uvwx1234uvwx1234uvwx1234uvwx1234uvwx1234uvwx1234",
        from: "0x5ba1f109551bD432803012645Ac136ddd64DBA72",
        to: "0xYourAddress",
        value: "0.3",
        token: "ETH",
        timestamp: new Date(Date.now() - 518400000), // 6 days ago
        status: "confirmed" as TransactionStatus,
        type: "receive",
        network: "ethereum",
        fee: "0.0015",
        blockNumber: 18745132,
        nonce: 37
    },
    {
        hash: "0xyzab5678yzab5678yzab5678yzab5678yzab5678yzab5678yzab5678yzab5678",
        from: "0xYourAddress",
        to: "0xUniswapV2Router02",
        value: "200",
        token: "DAI",
        tokenAmount: "0.1 ETH",
        timestamp: new Date(Date.now() - 604800000), // 7 days ago
        status: "confirmed" as TransactionStatus,
        type: "swap",
        network: "ethereum",
        fee: "0.0025",
        blockNumber: 18745032,
        methodName: "swapExactTokensForETH",
        nonce: 36
    },
    {
        hash: "0xcdef9012cdef9012cdef9012cdef9012cdef9012cdef9012cdef9012cdef9012",
        from: "0xYourAddress",
        to: "0x6ba1f109551bD432803012645Ac136ddd64DBA72",
        value: "0.05",
        token: "ETH",
        timestamp: new Date(Date.now() - 691200000), // 8 days ago
        status: "confirmed" as TransactionStatus,
        type: "send",
        network: "ethereum",
        fee: "0.002",
        blockNumber: 18744932,
        nonce: 35
    },
    {
        hash: "0xghij3456ghij3456ghij3456ghij3456ghij3456ghij3456ghij3456ghij3456",
        from: "0x4ba1f109551bD432803012645Ac136ddd64DBA72",
        to: "0xYourAddress",
        value: "0.25",
        token: "ETH",
        timestamp: new Date(Date.now() - 777600000), // 9 days ago
        status: "confirmed" as TransactionStatus,
        type: "receive",
        network: "ethereum",
        fee: "0.0018",
        blockNumber: 18744832,
        nonce: 34
    },
    {
        hash: "0xklmn7890klmn7890klmn7890klmn7890klmn7890klmn7890klmn7890klmn7890",
        from: "0xYourAddress",
        to: "0xWBTC_CONTRACT_ADDRESS",
        value: "0.01",
        token: "WBTC",
        timestamp: new Date(Date.now() - 864000000), // 10 days ago
        status: "pending" as TransactionStatus,
        type: "send",
        network: "ethereum",
        fee: "0.003",
        nonce: 33
    }
];
