import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw, Download, Sparkles, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { downloadDataAsJson, SUCCESS_MESSAGES } from '@/utils';
import type { CollectedData } from '@/types';

interface DataActionsProps {
  collectedData: CollectedData | null;
  isCollecting: boolean;
  onRefresh: () => void;
}

export const DataActions = ({ collectedData, isCollecting, onRefresh }: DataActionsProps) => {
  const { toast } = useToast();

  const handleDownloadData = () => {
    if (!collectedData) return;
    
    try {
      downloadDataAsJson(collectedData);
      toast({
        title: "Data Downloaded",
        description: SUCCESS_MESSAGES.dataDownloaded,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRefresh = () => {
    onRefresh();
    toast({
      title: "Data Refreshed", 
      description: SUCCESS_MESSAGES.dataRefreshed,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      {/* Refresh Button */}
      <Button 
        onClick={handleRefresh} 
        disabled={isCollecting}
        size="lg"
        className="btn-honey px-8 py-3 text-base font-semibold relative group"
      >
        {isCollecting ? (
          <Loader2 className="h-5 w-5 mr-3 animate-spin" />
        ) : (
          <RefreshCw className="h-5 w-5 mr-3 group-hover:rotate-180 transition-transform duration-500" />
        )}
        {isCollecting ? 'Collecting Data...' : 'Refresh Data'}
        <Sparkles className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Button>
      
      {/* Download Button */}
      <Button 
        onClick={handleDownloadData}
        disabled={!collectedData}
        size="lg"
        variant="outline"
        className="px-8 py-3 text-base font-semibold border-honey-secondary/30 bg-honey-secondary/10 text-honey-secondary hover:bg-honey-secondary/20 hover:border-honey-secondary/50 transition-all duration-300 relative group"
      >
        <Download className="h-5 w-5 mr-3 group-hover:translate-y-[-2px] transition-transform duration-300" />
        Download Data
        <Database className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Button>

      {/* Status Indicator */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className={`w-3 h-3 rounded-full ${collectedData ? 'bg-green-500 animate-pulse' : 'bg-yellow-500 animate-pulse'}`}></div>
        <span>{collectedData ? 'Data Ready' : 'No Data Collected'}</span>
      </div>
    </div>
  );
};
