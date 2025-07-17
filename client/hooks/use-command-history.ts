"use client";

import { useState, useCallback } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { STORAGE_KEYS } from "@/lib/constants";

const MAX_HISTORY_LENGTH = 50;

export function useCommandHistory() {
    const [commandHistory, setCommandHistory] = useLocalStorage<string[]>(
        STORAGE_KEYS.COMMAND_HISTORY,
        []
    );
    const [historyIndex, setHistoryIndex] = useState(-1);

    // Add a command to history
    const addToHistory = useCallback(
        (command: string) => {
            if (!command.trim()) return;

            // Don't add duplicates of the last command
            if (commandHistory.length > 0 && commandHistory[0] === command) {
                return;
            }

            // Add to the beginning of the array and limit length
            const newHistory = [command, ...commandHistory.filter(cmd => cmd !== command)]
                .slice(0, MAX_HISTORY_LENGTH);

            setCommandHistory(newHistory);
            setHistoryIndex(-1); // Reset index
        },
        [commandHistory, setCommandHistory]
    );

    // Navigate history (for up/down arrow keys)
    const navigateHistory = useCallback(
        (direction: "up" | "down") => {
            if (commandHistory.length === 0) return null;

            let newIndex;
            if (direction === "up") {
                newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
            } else {
                newIndex = Math.max(historyIndex - 1, -1);
            }

            setHistoryIndex(newIndex);
            return newIndex === -1 ? "" : commandHistory[newIndex];
        },
        [commandHistory, historyIndex]
    );

    // Clear history
    const clearHistory = useCallback(() => {
        setCommandHistory([]);
        setHistoryIndex(-1);
    }, [setCommandHistory]);

    return {
        commandHistory,
        addToHistory,
        navigateHistory,
        clearHistory,
    };
}