import { useState, useEffect, useCallback } from 'react';
import type { ExtendedCollectedData } from '@/types/advanced';
import { collectAllExtendedData, DATA_COLLECTION, ERROR_MESSAGES } from '@/utils';
import { generateFingerprintReport } from '@/utils/fingerprinting';

export interface UseAdvancedDataCollectionReturn {
  collectedData: ExtendedCollectedData | null;
  isCollecting: boolean;
  refreshData: () => void;
  error: string | null;
  fingerprintReport: ReturnType<typeof generateFingerprintReport> | null;
  dataStats: {
    totalDataPoints: number;
    categories: Record<string, number>;
    privacyScore: number;
    uniquenessScore: number;
  } | null;
}

export const useAdvancedDataCollection = (): UseAdvancedDataCollectionReturn => {
  const [collectedData, setCollectedData] = useState<ExtendedCollectedData | null>(null);
  const [isCollecting, setIsCollecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fingerprintReport, setFingerprintReport] = useState<ReturnType<typeof generateFingerprintReport> | null>(null);
  const [dataStats, setDataStats] = useState<UseAdvancedDataCollectionReturn['dataStats']>(null);

  const collectData = useCallback(async (): Promise<ExtendedCollectedData | null> => {
    try {
      setIsCollecting(true);
      setError(null);
      
      // Simulate some processing time for better UX
      await new Promise(resolve => setTimeout(resolve, DATA_COLLECTION.loadingDelay));
      
      const data = await collectAllExtendedData();
      setCollectedData(data);
      
      // Generate fingerprint report
      const report = generateFingerprintReport(data);
      setFingerprintReport(report);
      
      // Calculate data statistics
      const stats = {
        totalDataPoints: report.dataPoints.total,
        categories: report.dataPoints.categories,
        privacyScore: data.privacyScore,
        uniquenessScore: data.uniquenessScore,
      };
      setDataStats(stats);
      
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
    fingerprintReport,
    dataStats,
  };
};
