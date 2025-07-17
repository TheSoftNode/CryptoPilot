import { Network, WalletState } from "@/types";
import { CHAIN_IDS } from "@/lib/constants";

// Initialize wallet state
export const initialWalletState: WalletState = {
    connected: false,
    connecting: false,
    address: null,
    balance: null,
    network: null as unknown as Network,
    error: null,
};

// Check if MetaMask is installed
export const isMetaMaskInstalled = (): boolean => {
    return typeof window !== "undefined" && window.ethereum !== undefined && window.ethereum.isMetaMask === true;
};

// Get network from chain ID
export const getNetworkFromChainId = (chainId: string): Network | null => {
    switch (chainId) {
        case CHAIN_IDS.ETHEREUM:
            return "ethereum";
        case CHAIN_IDS.GOERLI:
            return "goerli";
        case CHAIN_IDS.SEPOLIA:
            return "sepolia";
        case CHAIN_IDS.POLYGON:
            return "polygon";
        case CHAIN_IDS.ARBITRUM:
            return "arbitrum";
        case CHAIN_IDS.OPTIMISM:
            return "optimism";
        default:
            return null;
    }
};

// Get chain ID from network
export const getChainIdFromNetwork = (network: Network): string | null => {
    switch (network) {
        case "ethereum":
            return CHAIN_IDS.ETHEREUM;
        case "goerli":
            return CHAIN_IDS.GOERLI;
        case "sepolia":
            return CHAIN_IDS.SEPOLIA;
        case "polygon":
            return CHAIN_IDS.POLYGON;
        case "arbitrum":
            return CHAIN_IDS.ARBITRUM;
        case "optimism":
            return CHAIN_IDS.OPTIMISM;
        default:
            return null;
    }
};

// Get network name for display
export const getNetworkName = (network: Network): string => {
    switch (network) {
        case "ethereum":
            return "Ethereum";
        case "goerli":
            return "Goerli Testnet";
        case "sepolia":
            return "Sepolia Testnet";
        case "polygon":
            return "Polygon";
        case "arbitrum":
            return "Arbitrum";
        case "optimism":
            return "Optimism";
        default:
            return "Unknown Network";
    }
};

// Check if the network is a testnet
export const isTestnet = (network: Network): boolean => {
    return network === "goerli" || network === "sepolia";
};

// Request account access from MetaMask
export const requestAccounts = async (): Promise<string[]> => {
    if (!isMetaMaskInstalled()) {
        throw new Error("MetaMask is not installed");
    }

    try {
        const accounts = await window.ethereum?.request({
            method: "eth_requestAccounts",
        });
        return accounts;
    } catch (error) {
        console.error("Error requesting accounts:", error);
        throw error;
    }
};

// Get current chain ID
export const getCurrentChainId = async (): Promise<string> => {
    if (!isMetaMaskInstalled()) {
        throw new Error("MetaMask is not installed");
    }

    try {
        const chainId = await window.ethereum?.request({
            method: "eth_chainId",
        });
        return chainId;
    } catch (error) {
        console.error("Error getting chain ID:", error);
        throw error;
    }
};

// Get balance for an address
export const getBalance = async (address: string): Promise<string> => {
    if (!isMetaMaskInstalled()) {
        throw new Error("MetaMask is not installed");
    }

    try {
        const balanceHex = await window.ethereum?.request({
            method: "eth_getBalance",
            params: [address, "latest"],
        });

        // Convert from wei to ether
        const balanceInWei = parseInt(balanceHex, 16);
        const balanceInEth = balanceInWei / 1e18;

        // Format to 4 decimal places
        return balanceInEth.toFixed(4);
    } catch (error) {
        console.error("Error getting balance:", error);
        throw error;
    }
};

// Switch to a different network
export const switchNetwork = async (network: Network): Promise<boolean> => {
    if (!isMetaMaskInstalled()) {
        throw new Error("MetaMask is not installed");
    }

    const chainId = getChainIdFromNetwork(network);
    if (!chainId) {
        throw new Error("Invalid network");
    }

    try {
        await window.ethereum?.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId }],
        });
        return true;
    } catch (error: any) {
        // If the error code is 4902, the chain hasn't been added to MetaMask
        if (error.code === 4902) {
            try {
                // For a real implementation, we would add the chain here
                // This is a simplified version
                console.log("Chain not added to MetaMask");
                return false;
            } catch (addError) {
                console.error("Error adding chain:", addError);
                throw addError;
            }
        }
        console.error("Error switching chain:", error);
        throw error;
    }
};

// Send a transaction
export const sendTransaction = async (
    from: string,
    to: string,
    value: string, // In ETH
    data: string = "0x",
): Promise<string> => {
    if (!isMetaMaskInstalled()) {
        throw new Error("MetaMask is not installed");
    }

    try {
        // Convert ETH to wei
        const valueInWei = `0x${Math.floor(parseFloat(value) * 1e18).toString(16)}`;

        const txHash = await window.ethereum?.request({
            method: "eth_sendTransaction",
            params: [
                {
                    from,
                    to,
                    value: valueInWei,
                    data,
                },
            ],
        });

        return txHash;
    } catch (error) {
        console.error("Error sending transaction:", error);
        throw error;
    }
};

// Get transaction count (nonce)
export const getTransactionCount = async (address: string): Promise<number> => {
    if (!isMetaMaskInstalled()) {
        throw new Error("MetaMask is not installed");
    }

    try {
        const countHex = await window.ethereum?.request({
            method: "eth_getTransactionCount",
            params: [address, "latest"],
        });

        return parseInt(countHex, 16);
    } catch (error) {
        console.error("Error getting transaction count:", error);
        throw error;
    }
};

// Get gas price
export const getGasPrice = async (): Promise<string> => {
    if (!isMetaMaskInstalled()) {
        throw new Error("MetaMask is not installed");
    }

    try {
        const gasPriceHex = await window.ethereum?.request({
            method: "eth_gasPrice",
        });

        // Convert from wei to gwei
        const gasPriceInWei = parseInt(gasPriceHex, 16);
        const gasPriceInGwei = gasPriceInWei / 1e9;

        return gasPriceInGwei.toFixed(2);
    } catch (error) {
        console.error("Error getting gas price:", error);
        throw error;
    }
};

// Estimate gas for a transaction
export const estimateGas = async (
    from: string,
    to: string,
    value: string, // In ETH
    data: string = "0x",
): Promise<string> => {
    if (!isMetaMaskInstalled()) {
        throw new Error("MetaMask is not installed");
    }

    try {
        // Convert ETH to wei
        const valueInWei = `0x${Math.floor(parseFloat(value) * 1e18).toString(16)}`;

        const gasHex = await window.ethereum?.request({
            method: "eth_estimateGas",
            params: [
                {
                    from,
                    to,
                    value: valueInWei,
                    data,
                },
            ],
        });

        return parseInt(gasHex, 16).toString();
    } catch (error) {
        console.error("Error estimating gas:", error);
        throw error;
    }
};

// Get transaction by hash
export const getTransaction = async (txHash: string): Promise<any> => {
    if (!isMetaMaskInstalled()) {
        throw new Error("MetaMask is not installed");
    }

    try {
        const tx = await window.ethereum?.request({
            method: "eth_getTransactionByHash",
            params: [txHash],
        });

        return tx;
    } catch (error) {
        console.error("Error getting transaction:", error);
        throw error;
    }
};

// Sign message
export const signMessage = async (address: string, message: string): Promise<string> => {
    if (!isMetaMaskInstalled()) {
        throw new Error("MetaMask is not installed");
    }

    try {
        // Convert message to hex
        const msgHex = `0x${Buffer.from(message).toString("hex")}`;

        const signature = await window.ethereum?.request({
            method: "personal_sign",
            params: [msgHex, address],
        });

        return signature;
    } catch (error) {
        console.error("Error signing message:", error);
        throw error;
    }
};

// Add token to MetaMask
export const addToken = async (
    tokenAddress: string,
    tokenSymbol: string,
    tokenDecimals: number,
    tokenImage: string,
): Promise<boolean> => {
    if (!isMetaMaskInstalled()) {
        throw new Error("MetaMask is not installed");
    }

    try {
        const wasAdded = await window.ethereum?.request({
            method: "wallet_watchAsset",
            params: {
                type: "ERC20",
                options: {
                    address: tokenAddress,
                    symbol: tokenSymbol,
                    decimals: tokenDecimals,
                    image: tokenImage,
                },
            },
        });

        return wasAdded;
    } catch (error) {
        console.error("Error adding token:", error);
        throw error;
    }
};

// Add event listeners
export const addEventListeners = (
    onAccountsChanged: (accounts: string[]) => void,
    onChainChanged: (chainId: string) => void,
    onConnect: (connectInfo: { chainId: string }) => void,
    onDisconnect: (error: { code: number; message: string }) => void,
) => {
    if (!isMetaMaskInstalled()) {
        console.error("MetaMask is not installed");
        return;
    }

    window.ethereum?.on("accountsChanged", onAccountsChanged);
    window.ethereum?.on("chainChanged", onChainChanged);
    window.ethereum?.on("connect", onConnect);
    window.ethereum?.on("disconnect", onDisconnect);
};

// Remove event listeners
export const removeEventListeners = (
    onAccountsChanged: (accounts: string[]) => void,
    onChainChanged: (chainId: string) => void,
    onConnect: (connectInfo: { chainId: string }) => void,
    onDisconnect: (error: { code: number; message: string }) => void,
) => {
    if (!isMetaMaskInstalled()) {
        console.error("MetaMask is not installed");
        return;
    }

    window.ethereum?.removeListener("accountsChanged", onAccountsChanged);
    window.ethereum?.removeListener("chainChanged", onChainChanged);
    window.ethereum?.removeListener("connect", onConnect);
    window.ethereum?.removeListener("disconnect", onDisconnect);
};

// Check if ethereum is a MetaMask provider and supports the necessary methods
export const checkMetaMaskSupport = (): { isInstalled: boolean; isSupported: boolean } => {
    const isInstalled = isMetaMaskInstalled();

    // Check if the provider supports the necessary methods
    const isSupported = isInstalled &&
        typeof window.ethereum?.request === "function" &&
        typeof window.ethereum?.on === "function" &&
        typeof window.ethereum?.removeListener === "function";

    return { isInstalled, isSupported };
};