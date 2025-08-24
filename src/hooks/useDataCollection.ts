import { useState, useEffect, useCallback } from 'react';
import type { UseDataCollectionReturn, CollectedData } from '@/types';
import { collectAllData, DATA_COLLECTION, ERROR_MESSAGES } from '@/utils';

export const useDataCollection = (): UseDataCollectionReturn => {
  const [collectedData, setCollectedData] = useState<CollectedData | null>(null);
  const [isCollecting, setIsCollecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const collectData = useCallback(async (): Promise<CollectedData | null> => {
    try {
      setIsCollecting(true);
      setError(null);
      
      // Simulate some processing time for better UX
      await new Promise(resolve => setTimeout(resolve, DATA_COLLECTION.loadingDelay));
      
      const data = collectAllData();
      setCollectedData(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.dataCollectionFailed;
      setError(errorMessage);
      return null;
    } finally {
      setIsCollecting(false);
    }
  }, []);

  const refreshData = useCallback(async () => {
    await collectData();
  }, [collectData]);

  // Initial data collection on mount
  useEffect(() => {
    collectData();
  }, [collectData]);

  return {
    collectedData,
    isCollecting,
    refreshData,
    error,
  };
};