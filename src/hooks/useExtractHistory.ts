import { useState, useEffect } from 'react';

export interface ExtractHistoryItem {
  id: string;
  url: string;
  timestamp: Date;
  fileCount: number;
  files: {
    name: string;
    type: 'html' | 'css' | 'js';
    content: string;
    size: string;
  }[];
}

const HISTORY_STORAGE_KEY = 'code-hunter-history';
const MAX_HISTORY_ITEMS = 20;

export const useExtractHistory = () => {
  const [history, setHistory] = useState<ExtractHistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        // Convert timestamp strings back to Date objects
        const historyWithDates = parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setHistory(historyWithDates);
      } catch (error) {
        console.error('Failed to parse history:', error);
        localStorage.removeItem(HISTORY_STORAGE_KEY);
      }
    }
  }, []);

  const addToHistory = (url: string, files: ExtractHistoryItem['files']) => {
    const newItem: ExtractHistoryItem = {
      id: Date.now().toString(),
      url,
      timestamp: new Date(),
      fileCount: files.length,
      files
    };

    setHistory(prev => {
      // Remove duplicates based on URL
      const filtered = prev.filter(item => item.url !== url);
      // Add new item at the beginning and limit to MAX_HISTORY_ITEMS
      const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
      
      // Save to localStorage
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      
      return updated;
    });
  };

  const removeFromHistory = (id: string) => {
    setHistory(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory
  };
};