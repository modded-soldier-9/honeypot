import { useDataCollection } from '@/hooks/useDataCollection';
import { useAdvancedDataCollection } from '@/hooks/useAdvancedDataCollection';
import { HoneypotHeader } from '@/components/HoneypotHeader';
import { DataActions, DataTabs } from '@/components/features';
import { PageLayout } from '@/components/layout';

const Index = () => {
  // Use both basic and advanced data collection
  const { collectedData, isCollecting, refreshData, error } = useDataCollection();
  const { 
    collectedData: extendedData, 
    isCollecting: isAdvancedCollecting, 
    refreshData: refreshAdvancedData, 
    error: advancedError,
    fingerprintReport,
    dataStats
  } = useAdvancedDataCollection();

  // Use the advanced collection state as primary
  const isCollectingState = isAdvancedCollecting || isCollecting;
  const errorState = advancedError || error;

  return (
    <PageLayout>
      <HoneypotHeader />
      
      <DataActions 
        collectedData={extendedData || collectedData}
        isCollecting={isCollectingState}
        onRefresh={() => {
          refreshData();
          refreshAdvancedData();
        }}
      />

      <DataTabs 
        collectedData={collectedData}
        extendedData={extendedData}
        isCollecting={isCollectingState}
        error={errorState}
        fingerprintReport={fingerprintReport}
        dataStats={dataStats}
      />
    </PageLayout>
  );
};

export default Index;
