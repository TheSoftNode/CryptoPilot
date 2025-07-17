"use client";

import { useState, useCallback, useMemo } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Wallet, Loader2, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAccount, useBalance } from "wagmi";
import { formatUSD } from "@/lib/utils";
import { AddressSelector } from "./AddressSelector";

interface TransactionFormProps {
    onCancel: () => void;
    onSubmit: (txDetails: any) => void;
    initialAmount?: string;
    initialRecipient?: string;
}

// Form schema
const formSchema = z.object({
    amount: z.string()
        .min(1, "Amount is required")
        .refine(val => !isNaN(parseFloat(val)), "Must be a valid number")
        .refine(val => parseFloat(val) > 0, "Amount must be greater than 0"),
    recipient: z.string()
        .min(1, "Recipient address is required")
        .refine(val => val.startsWith("0x") && val.length === 42, {
            message: "Invalid Ethereum address",
            path: ["recipient"],
        }),
});

export function TransactionForm({
    onCancel,
    onSubmit,
    initialAmount = "",
    initialRecipient = "",
}: TransactionFormProps) {
    const { address } = useAccount();
    const { data: balanceData } = useBalance({ address });
    const balance = balanceData ? balanceData.formatted.substring(0, 7) : "0";

    const [isLoading, setIsLoading] = useState(false);
    const [recipientName, setRecipientName] = useState<string | undefined>();

    const defaultValues = useMemo(() => ({
        amount: initialAmount,
        recipient: initialRecipient,
    }), [initialAmount, initialRecipient]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const watchAmount = form.watch("amount");
    const amountValue = parseFloat(watchAmount || "0");
    const ethPrice = 1800; // Mock ETH price
    const estimatedGasFee = 0.0015; // Mock gas fee in ETH

    // Memoize calculations to prevent unnecessary re-renders
    const calculations = useMemo(() => ({
        usdValue: amountValue * ethPrice,
        gasFeeUsd: estimatedGasFee * ethPrice,
        totalEth: amountValue + estimatedGasFee,
        totalUsd: (amountValue + estimatedGasFee) * ethPrice,
    }), [amountValue, ethPrice, estimatedGasFee]);

    const handleFormSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true);

            // Build transaction details
            const txDetails = {
                type: "send",
                from: address,
                to: values.recipient,
                ensName: recipientName,
                amount: values.amount,
                token: "ETH",
                usdValue: parseFloat(values.amount) * ethPrice,
                gasFee: estimatedGasFee * ethPrice, // In USD
                network: "ethereum",
            };

            onSubmit(txDetails);
        } catch (error: any) {
            console.error("Transaction error:", error);
            form.setError("root", {
                type: "manual",
                message: error.message || "Transaction failed. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    }, [address, recipientName, ethPrice, estimatedGasFee, onSubmit, form]);

    const handleAddressSelect = useCallback((address: string, name?: string) => {
        form.setValue("recipient", address, { shouldValidate: true });
        setRecipientName(name);
    }, [form]);

    const handleCancel = useCallback(() => {
        onCancel();
    }, [onCancel]);

    return (
        <Card className="mx-auto w-full max-w-lg border-gray-300 bg-white/95 backdrop-blur-sm shadow-lg 
                       dark:border-slate-700 dark:bg-slate-800/95">
            <CardHeader className="border-b border-gray-200 pb-4 dark:border-slate-700">
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-lg sm:text-xl">Send ETH</span>
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-slate-400">
                    Send ETH to another wallet address securely
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)} className="contents">
                    <CardContent className="space-y-4 p-4 sm:space-y-6 sm:p-6">
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-slate-300 font-medium">
                                        Amount (ETH)
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                placeholder="0.0"
                                                {...field}
                                                type="number"
                                                step="0.0001"
                                                min="0.0001"
                                                className="bg-white border-gray-300 text-gray-900 pr-20 
                                                         focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                                                         dark:bg-slate-700/50 dark:border-slate-600 dark:text-white 
                                                         dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                            />
                                            {amountValue > 0 && (
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400">
                                                    <DollarSign className="h-3 w-3" />
                                                    <span>{formatUSD(calculations.usdValue)}</span>
                                                </div>
                                            )}
                                        </div>
                                    </FormControl>
                                    <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-0">
                                        <FormMessage className="text-red-500 dark:text-red-400" />
                                        <div className="text-xs text-gray-500 dark:text-slate-400">
                                            Balance: <span className="font-medium">{balance} ETH</span>
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="recipient"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-slate-300 font-medium">
                                        Recipient Address
                                    </FormLabel>
                                    <FormControl>
                                        <div className="space-y-3">
                                            <AddressSelector
                                                onSelect={handleAddressSelect}
                                                placeholder="Select from address book or enter manually"
                                                buttonClassName="w-full justify-between text-left font-normal border-gray-300 
                                                               hover:bg-gray-50 dark:border-slate-600 dark:hover:bg-slate-700"
                                            />
                                            <div className="relative">
                                                <Input
                                                    placeholder="0x..."
                                                    {...field}
                                                    className="bg-white border-gray-300 text-gray-900 font-mono text-sm pr-20
                                                             focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                                                             dark:bg-slate-700/50 dark:border-slate-600 dark:text-white 
                                                             dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                                />
                                                {recipientName && (
                                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 max-w-20 truncate text-xs 
                                                                  text-gray-500 dark:text-slate-400">
                                                        {recipientName}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-red-500 dark:text-red-400" />
                                </FormItem>
                            )}
                        />

                        {/* Transaction Summary */}
                        <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 
                                      dark:border-slate-700 dark:bg-slate-800/50">
                            <div className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                                Transaction Summary
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-slate-400">Amount:</span>
                                    <div className="text-right">
                                        <div className="font-medium text-gray-900 dark:text-white">
                                            {amountValue || 0} ETH
                                        </div>
                                        {amountValue > 0 && (
                                            <div className="text-xs text-gray-500 dark:text-slate-400">
                                                {formatUSD(calculations.usdValue)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-slate-400">Estimated Gas Fee:</span>
                                    <div className="text-right">
                                        <div className="font-medium text-gray-900 dark:text-white">
                                            {estimatedGasFee} ETH
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-slate-400">
                                            {formatUSD(calculations.gasFeeUsd)}
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 pt-2 dark:border-slate-700">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-gray-900 dark:text-white">Total:</span>
                                        <div className="text-right">
                                            <div className="font-bold text-gray-900 dark:text-white">
                                                {calculations.totalEth.toFixed(4)} ETH
                                            </div>
                                            {amountValue > 0 && (
                                                <div className="text-xs text-gray-500 dark:text-slate-400">
                                                    {formatUSD(calculations.totalUsd)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3 border-t border-gray-200 p-4 
                                         sm:flex-row sm:justify-between sm:gap-2 sm:p-6 
                                         dark:border-slate-700">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            disabled={isLoading}
                            className="w-full sm:w-auto order-2 sm:order-1 border-gray-300 text-gray-700 hover:bg-gray-50 
                                     dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading || !amountValue || !form.watch("recipient")}
                            className="w-full sm:w-auto order-1 sm:order-2 bg-blue-600 text-white hover:bg-blue-700 
                                     shadow-md hover:shadow-lg transition-all duration-300 
                                     dark:bg-blue-500 dark:hover:bg-blue-600
                                     disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    <span className="hidden sm:inline">Processing...</span>
                                    <span className="sm:hidden">Wait...</span>
                                </>
                            ) : (
                                <>
                                    <ArrowRight className="mr-2 h-4 w-4" />
                                    <span className="hidden sm:inline">Send ETH</span>
                                    <span className="sm:hidden">Send</span>
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}