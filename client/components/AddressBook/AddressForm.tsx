"use client";

import { useState, useCallback } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Plus, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
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
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAddressBook } from "@/hooks/use-address-book";
import { AddressBookEntry, Network } from "@/types";
import { toast } from "@/hooks/use-toast";

interface AddressFormProps {
    onClose: () => void;
    editEntry?: AddressBookEntry;
}

// Form schema
const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    address: z.string()
        .min(1, "Address is required")
        .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format"),
    network: z.enum(["ethereum", "goerli", "sepolia", "polygon", "arbitrum", "optimism"]),
    notes: z.string().optional(),
    tags: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function AddressForm({ onClose, editEntry }: AddressFormProps) {
    const { addAddress, updateAddress, error: addressBookError } = useAddressBook();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const defaultValues: Partial<FormValues> = {
        name: editEntry?.name || "",
        address: editEntry?.address || "",
        network: editEntry?.network || "ethereum",
        notes: editEntry?.notes || "",
        tags: editEntry?.tags?.join(", ") || "",
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    // Memoize handlers to prevent unnecessary re-renders
    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    const onSubmit = useCallback(async (values: FormValues) => {
        try {
            setIsSubmitting(true);

            const formattedTags = values.tags
                ? values.tags.split(",").map(tag => tag.trim()).filter(Boolean)
                : undefined;

            if (editEntry) {
                await updateAddress(editEntry.id, {
                    name: values.name,
                    address: values.address,
                    network: values.network,
                    notes: values.notes,
                    tags: formattedTags,
                });
                toast({
                    title: "Contact updated",
                    description: "The contact has been successfully updated.",
                });
            } else {
                await addAddress(
                    values.name,
                    values.address,
                    values.network,
                    values.notes,
                    formattedTags
                );
                toast({
                    title: "Contact added",
                    description: "The new contact has been successfully added.",
                });
            }

            onClose();
        } catch (err: any) {
            console.error("Form submission error:", err);
            toast({
                title: "Error",
                description: err.message || "An error occurred. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    }, [editEntry, updateAddress, addAddress, onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl mx-auto"
        >
            <Card className="bg-white/90 backdrop-blur-sm border-gray-300 shadow-lg overflow-hidden 
                           dark:bg-gray-800/80 dark:border-gray-700/50">
                <CardHeader className="border-b border-gray-200 dark:border-gray-700/50 pb-4">
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                        <div className="min-w-0 flex-1 pr-4">
                            <CardTitle className="text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:via-teal-400 dark:to-pink-400 text-lg sm:text-xl">
                                {editEntry ? "Edit Contact" : "Add New Contact"}
                            </CardTitle>
                            <CardDescription className="text-gray-600 dark:text-gray-300 text-sm">
                                {editEntry
                                    ? "Update the details of this contact"
                                    : "Save a new address to your address book"}
                            </CardDescription>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClose}
                            className="h-8 w-8 p-0 shrink-0 text-gray-500 hover:text-gray-900 hover:bg-gray-100 
                                     dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700/50"
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </div>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="contents">
                        <CardContent className="space-y-4 p-4 sm:space-y-6 sm:p-6">
                            <div className="grid gap-4 sm:gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 dark:text-gray-200 font-medium">
                                                Contact Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter a name for this contact"
                                                    {...field}
                                                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 
                                                             focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                                                             dark:bg-gray-700/50 dark:border-gray-600 dark:text-white 
                                                             dark:placeholder:text-gray-400 dark:focus:border-blue-500 
                                                             dark:focus:ring-blue-500"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500 dark:text-red-400" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 dark:text-gray-200 font-medium">
                                                Ethereum Address
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="0x..."
                                                    {...field}
                                                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 
                                                             focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono text-sm
                                                             dark:bg-gray-700/50 dark:border-gray-600 dark:text-white 
                                                             dark:placeholder:text-gray-400 dark:focus:border-blue-500 
                                                             dark:focus:ring-blue-500"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500 dark:text-red-400" />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="network"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 dark:text-gray-200 font-medium">
                                                    Network
                                                </FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="bg-white border-gray-300 text-gray-900 
                                                                                 focus:ring-blue-500 focus:ring-1 focus:border-blue-500
                                                                                 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white 
                                                                                 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                            <SelectValue placeholder="Select network" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="bg-white border-gray-300 text-gray-900 
                                                                             dark:bg-gray-800 dark:border-gray-700 dark:text-white">
                                                        <SelectItem value="ethereum" className="focus:bg-blue-100 dark:focus:bg-blue-900/30">
                                                            Ethereum Mainnet
                                                        </SelectItem>
                                                        <SelectItem value="polygon" className="focus:bg-blue-100 dark:focus:bg-blue-900/30">
                                                            Polygon
                                                        </SelectItem>
                                                        <SelectItem value="arbitrum" className="focus:bg-blue-100 dark:focus:bg-blue-900/30">
                                                            Arbitrum
                                                        </SelectItem>
                                                        <SelectItem value="optimism" className="focus:bg-blue-100 dark:focus:bg-blue-900/30">
                                                            Optimism
                                                        </SelectItem>
                                                        <SelectItem value="goerli" className="focus:bg-blue-100 dark:focus:bg-blue-900/30">
                                                            Goerli Testnet
                                                        </SelectItem>
                                                        <SelectItem value="sepolia" className="focus:bg-blue-100 dark:focus:bg-blue-900/30">
                                                            Sepolia Testnet
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage className="text-red-500 dark:text-red-400" />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="tags"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-700 dark:text-gray-200 font-medium">
                                                    Tags <span className="text-gray-500 dark:text-gray-400 font-normal">(comma separated)</span>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="e.g. exchange, defi, personal"
                                                        {...field}
                                                        className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 
                                                                 focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                                                                 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white 
                                                                 dark:placeholder:text-gray-400 dark:focus:border-blue-500 
                                                                 dark:focus:ring-blue-500"
                                                    />
                                                </FormControl>
                                                <FormMessage className="text-red-500 dark:text-red-400" />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="notes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700 dark:text-gray-200 font-medium">
                                                Notes <span className="text-gray-500 dark:text-gray-400 font-normal">(optional)</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Add any additional information about this contact"
                                                    className="resize-none min-h-[80px] bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 
                                                             focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                                                             dark:bg-gray-700/50 dark:border-gray-600 dark:text-white 
                                                             dark:placeholder:text-gray-400 dark:focus:border-blue-500 
                                                             dark:focus:ring-blue-500"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="text-red-500 dark:text-red-400" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3 border-t border-gray-200 dark:border-gray-700/50 
                                             p-4 sm:flex-row sm:justify-end sm:gap-2 sm:p-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                                disabled={isSubmitting}
                                className="w-full sm:w-auto order-2 sm:order-1 border-gray-300 text-gray-700 hover:bg-gray-50 
                                         dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-auto order-1 sm:order-2 bg-blue-600 text-white hover:bg-blue-700 
                                         shadow-md hover:shadow-lg transition-all duration-300 
                                         dark:bg-gradient-to-r dark:from-blue-600 dark:via-teal-500 dark:to-pink-500 
                                         dark:hover:from-blue-700 dark:hover:via-teal-600 dark:hover:to-pink-600
                                         disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        <span>{editEntry ? "Updating..." : "Saving..."}</span>
                                    </>
                                ) : (
                                    <>
                                        <Plus className="mr-2 h-4 w-4" />
                                        <span className="hidden sm:inline">
                                            {editEntry ? "Update Contact" : "Save Contact"}
                                        </span>
                                        <span className="sm:hidden">
                                            {editEntry ? "Update" : "Save"}
                                        </span>
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </motion.div>
    );
}