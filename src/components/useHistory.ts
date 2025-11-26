import { useState, useCallback, useRef } from 'react';

interface HistoryState<T> {
    past: T[];
    present: T;
    future: T[];
}

interface UseHistoryReturn<T> {
    state: T;
    setState: (newState: T, addToHistory?: boolean) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    clear: () => void;
}

export function useHistory<T>(initialState: T): UseHistoryReturn<T> {
    const [history, setHistory] = useState<HistoryState<T>>({
        past: [],
        present: initialState,
        future: []
    });

    const isUndoRedoAction = useRef(false);

    const setState = useCallback((newState: T, addToHistory = true) => {
        // Don't add to history if it's an undo/redo action
        if (!addToHistory || isUndoRedoAction.current) {
            setHistory((current) => ({
                ...current,
                present: newState
            }));
            isUndoRedoAction.current = false;
            return;
        }

        setHistory((current) => {
            // Check if state actually changed
            if (JSON.stringify(current.present) === JSON.stringify(newState)) {
                return current;
            }

            return {
                past: [...current.past, current.present],
                present: newState,
                future: [] // Clear future when new action is performed
            };
        });
    }, []);

    const undo = useCallback(() => {
        setHistory((current) => {
            if (current.past.length === 0) return current;

            const previous = current.past[current.past.length - 1];
            const newPast = current.past.slice(0, current.past.length - 1);

            isUndoRedoAction.current = true;

            return {
                past: newPast,
                present: previous,
                future: [current.present, ...current.future]
            };
        });
    }, []);

    const redo = useCallback(() => {
        setHistory((current) => {
            if (current.future.length === 0) return current;

            const next = current.future[0];
            const newFuture = current.future.slice(1);

            isUndoRedoAction.current = true;

            return {
                past: [...current.past, current.present],
                present: next,
                future: newFuture
            };
        });
    }, []);

    const clear = useCallback(() => {
        setHistory({
            past: [],
            present: history.present,
            future: []
        });
    }, [history.present]);

    return {
        state: history.present,
        setState,
        undo,
        redo,
        canUndo: history.past.length > 0,
        canRedo: history.future.length > 0,
        clear
    };
}