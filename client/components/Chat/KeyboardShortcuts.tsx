"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Keyboard } from "lucide-react";
import { useState } from "react";

export function KeyboardShortcuts() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                    <Keyboard className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="sr-only">Keyboard shortcuts</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="border-gray-300 bg-white dark:border-slate-700 dark:bg-slate-800">
                <DialogHeader>
                    <DialogTitle className="text-gray-900 dark:text-white">Keyboard Shortcuts</DialogTitle>
                    <DialogDescription className="text-gray-600 dark:text-slate-400">
                        Use these keyboard shortcuts to navigate quickly.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 py-4 sm:space-y-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                        <div className="rounded-md border border-gray-200 p-2 transition-colors hover:border-blue-300 
                                      dark:border-slate-700 dark:hover:border-blue-500/30 sm:p-3">
                            <div className="text-sm font-medium text-blue-600 dark:text-blue-400">Command History</div>
                            <div className="mt-1 flex items-center justify-between">
                                <span className="text-xs text-gray-600 dark:text-slate-400">Navigate previous commands</span>
                                <div className="flex items-center gap-1">
                                    <kbd className="rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-700 
                                                 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300">↑</kbd>
                                    <kbd className="rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-700 
                                                 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300">↓</kbd>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-md border border-gray-200 p-2 transition-colors hover:border-blue-300 
                                      dark:border-slate-700 dark:hover:border-blue-500/30 sm:p-3">
                            <div className="text-sm font-medium text-blue-600 dark:text-blue-400">Send Message</div>
                            <div className="mt-1 flex items-center justify-between">
                                <span className="text-xs text-gray-600 dark:text-slate-400">Send current command</span>
                                <div>
                                    <kbd className="rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-700 
                                                 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300">Enter</kbd>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-md border border-gray-200 p-2 transition-colors hover:border-blue-300 
                                      dark:border-slate-700 dark:hover:border-blue-500/30 sm:p-3">
                            <div className="text-sm font-medium text-blue-600 dark:text-blue-400">Suggestions</div>
                            <div className="mt-1 flex items-center justify-between">
                                <span className="text-xs text-gray-600 dark:text-slate-400">Show command examples</span>
                                <div>
                                    <kbd className="rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-700 
                                                 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300">Ctrl</kbd>
                                    <span className="mx-1 text-[10px] font-semibold text-gray-700 dark:text-slate-300">+</span>
                                    <kbd className="rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-700 
                                                 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300">Space</kbd>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-md border border-gray-200 p-2 transition-colors hover:border-blue-300 
                                      dark:border-slate-700 dark:hover:border-blue-500/30 sm:p-3">
                            <div className="text-sm font-medium text-blue-600 dark:text-blue-400">Clear Chat</div>
                            <div className="mt-1 flex items-center justify-between">
                                <span className="text-xs text-gray-600 dark:text-slate-400">Clear current conversation</span>
                                <div>
                                    <kbd className="rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-700 
                                                 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300">Ctrl</kbd>
                                    <span className="mx-1 text-[10px] font-semibold text-gray-700 dark:text-slate-300">+</span>
                                    <kbd className="rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-700 
                                                 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300">K</kbd>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button 
                        className="rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                        onClick={() => setOpen(false)}
                    >
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}