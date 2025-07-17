import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Truncate Ethereum address
export function truncateAddress(address: string, startLength = 6, endLength = 4): string {
  if (!address) return "";
  if (address.length < startLength + endLength) return address;

  return `${address.substring(0, startLength)}...${address.substring(
    address.length - endLength
  )}`;
}

// Format balance with 4 decimals max
export function formatBalance(balance: number | string, decimals = 4): string {
  if (!balance) return "0";

  const num = typeof balance === "string" ? parseFloat(balance) : balance;

  // Display whole numbers without decimals
  if (Number.isInteger(num)) return num.toString();

  // For very small numbers (smaller than 0.0001), show scientific notation
  if (num > 0 && num < 0.0001) return num.toExponential(2);

  // For normal floating point numbers
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

// Format USD amount with $ symbol
export function formatUSD(amount: number | string): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
}

// Calculate gas cost in USD
export function calculateGasCost(gasPrice: number, gasLimit: number, ethPrice: number): number {
  // Gas price is in Gwei (1e9 wei)
  const gasPriceInEth = gasPrice * 1e-9;
  const gasCostInEth = gasPriceInEth * gasLimit;
  return gasCostInEth * ethPrice;
}

// Parse ENS name or address
export function parseRecipient(recipient: string): { address: string; ensName?: string } {
  // Simple check if it's an ENS name (ends with .eth)
  const isEns = recipient.endsWith(".eth");

  if (isEns) {
    // In real app, we would resolve this to an address
    return {
      address: "0x1234567890123456789012345678901234567890", // Placeholder
      ensName: recipient,
    };
  }

  return { address: recipient };
}

// Format date for transaction history
export function formatDate(timestamp: number | string | Date): string {
  const date = typeof timestamp === "object"
    ? timestamp
    : new Date(timestamp);

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// Helper to validate amount input
export function isValidAmount(amount: string): boolean {
  if (!amount) return false;

  // Check for valid number format (allows decimals)
  const regex = /^\d+(\.\d+)?$/;
  if (!regex.test(amount)) return false;

  // Additional checks could be added (e.g., max decimals)
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0;
}

// Generate a random transaction hash (for mocks/demos)
export function generateTransactionHash(): string {
  return "0x" + [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
}
