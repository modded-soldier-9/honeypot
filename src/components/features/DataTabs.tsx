import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, HelpCircle, BarChart3, Search, Shield, Activity, Settings } from 'lucide-react';
import { DataDisplay } from '@/components/DataDisplay';
import { DataDashboard } from '@/components/dashboard/DataDashboard';
import { DataExplorer } from '@/components/interactive/DataExplorer';
import { FAQ } from '@/components/FAQ';
import { LoadingCard, ErrorCard } from '@/components/ui';
import type { CollectedData } from '@/types';
import type { ExtendedCollectedData } from '@/types/advanced';

interface DataTabsProps {
  collectedData: CollectedData | null;
  extendedData?: ExtendedCollectedData | null;
  isCollecting: boolean;
  error: string | null;
  fingerprintReport?: any;
  dataStats?: any;
}

export const DataTabs = ({ 
  collectedData, 
  extendedData, 
  isCollecting, 
  error, 
  fingerprintReport, 
  dataStats 
}: DataTabsProps) => {
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      {/* Modern Tab List */}
      <div className="flex justify-center mb-8">
        <TabsList className="grid w-full max-w-4xl grid-cols-6 bg-card/50 backdrop-blur-sm border border-border/20 rounded-2xl p-2 gap-2">
          <TabsTrigger 
            value="dashboard" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-honey-primary/20 data-[state=active]:to-honey-secondary/20 data-[state=active]:text-honey-primary data-[state=active]:shadow-lg rounded-xl px-4 py-3 transition-all duration-300 hover:bg-muted/50"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger 
            value="explorer"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-honey-secondary/20 data-[state=active]:to-honey-accent/20 data-[state=active]:text-honey-secondary data-[state=active]:shadow-lg rounded-xl px-4 py-3 transition-all duration-300 hover:bg-muted/50"
          >
            <Search className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Explorer</span>
          </TabsTrigger>
          <TabsTrigger 
            value="basic" 
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-honey-primary/20 data-[state=active]:to-honey-secondary/20 data-[state=active]:text-honey-primary data-[state=active]:shadow-lg rounded-xl px-4 py-3 transition-all duration-300 hover:bg-muted/50"
          >
            <Database className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Basic</span>
          </TabsTrigger>
          <TabsTrigger 
            value="privacy"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500/20 data-[state=active]:to-emerald-500/20 data-[state=active]:text-green-400 data-[state=active]:shadow-lg rounded-xl px-4 py-3 transition-all duration-300 hover:bg-muted/50"
          >
            <Shield className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
          <TabsTrigger 
            value="advanced"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500/20 data-[state=active]:to-cyan-500/20 data-[state=active]:text-blue-400 data-[state=active]:shadow-lg rounded-xl px-4 py-3 transition-all duration-300 hover:bg-muted/50"
          >
            <Activity className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Advanced</span>
          </TabsTrigger>
          <TabsTrigger 
            value="faq"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-500/20 data-[state=active]:text-purple-400 data-[state=active]:shadow-lg rounded-xl px-4 py-3 transition-all duration-300 hover:bg-muted/50"
          >
            <HelpCircle className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">FAQ</span>
          </TabsTrigger>
        </TabsList>
      </div>
      
      {/* Tab Contents */}
      <div className="space-y-6">
        <TabsContent value="dashboard" className="mt-0 slide-in">
          {isCollecting && !extendedData ? (
            <LoadingCard />
          ) : error ? (
            <ErrorCard error={error} />
          ) : extendedData && fingerprintReport && dataStats ? (
            <DataDashboard 
              data={extendedData} 
              fingerprintReport={fingerprintReport} 
              dataStats={dataStats} 
            />
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted/20 rounded-full flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Dashboard Unavailable</h3>
              <p className="text-muted-foreground">Enhanced data collection is required for the dashboard view.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="explorer" className="mt-0 slide-in">
          {isCollecting && !extendedData ? (
            <LoadingCard />
          ) : error ? (
            <ErrorCard error={error} />
          ) : extendedData ? (
            <DataExplorer data={extendedData} />
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted/20 rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Explorer Unavailable</h3>
              <p className="text-muted-foreground">Enhanced data collection is required for the data explorer.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="basic" className="mt-0 slide-in">
          {isCollecting && !collectedData ? (
            <LoadingCard />
          ) : error ? (
            <ErrorCard error={error} />
          ) : collectedData ? (
            <DataDisplay data={collectedData} />
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted/20 rounded-full flex items-center justify-center">
                <Database className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No Data Available</h3>
              <p className="text-muted-foreground">Click "Refresh Data" to collect basic browser information.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="privacy" className="mt-0 slide-in">
          {isCollecting && !extendedData ? (
            <LoadingCard />
          ) : error ? (
            <ErrorCard error={error} />
          ) : extendedData && fingerprintReport ? (
            <div className="space-y-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-green-400" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  🛡️ Privacy Analysis
                </h2>
                <p className="text-muted-foreground mt-2">
                  Detailed analysis of your browser's privacy protection
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card-modern p-6 space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-green-400 mb-2">
                      Privacy Score: {extendedData.privacyScore}%
                    </h3>
                    <div className="w-full bg-muted rounded-full h-3 mb-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${extendedData.privacyScore}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {fingerprintReport.privacyLevel} level of privacy protection
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Privacy Features:</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm">Canvas Fingerprinting</span>
                        <span className={`text-sm font-medium ${extendedData.webgl.canvasFingerprint ? 'text-red-400' : 'text-green-400'}`}>
                          {extendedData.webgl.canvasFingerprint ? 'Detected' : 'Blocked'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm">Audio Fingerprinting</span>
                        <span className={`text-sm font-medium ${extendedData.audio.audioFingerprint ? 'text-red-400' : 'text-green-400'}`}>
                          {extendedData.audio.audioFingerprint ? 'Detected' : 'Blocked'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm">Font Enumeration</span>
                        <span className="text-sm font-medium text-amber-400">
                          {extendedData.fonts.fontCount} fonts detected
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm">Do Not Track</span>
                        <span className={`text-sm font-medium ${extendedData.browser.doNotTrack === '1' ? 'text-green-400' : 'text-red-400'}`}>
                          {extendedData.browser.doNotTrack === '1' ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card-modern p-6 space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-amber-400 mb-2">
                      Uniqueness Score: {extendedData.uniquenessScore}%
                    </h3>
                    <div className="w-full bg-muted rounded-full h-3 mb-2">
                      <div 
                        className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${extendedData.uniquenessScore}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {fingerprintReport.uniquenessLevel} level of uniqueness
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Fingerprint Components:</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <div className="text-sm font-medium text-foreground mb-1">Browser</div>
                        <div className="text-xs text-muted-foreground font-mono">
                          {extendedData.browser.userAgent.slice(0, 50)}...
                        </div>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <div className="text-sm font-medium text-foreground mb-1">Screen Resolution</div>
                        <div className="text-xs text-muted-foreground">
                          {extendedData.screen.width} × {extendedData.screen.height}
                        </div>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <div className="text-sm font-medium text-foreground mb-1">Platform</div>
                        <div className="text-xs text-muted-foreground">
                          {extendedData.browser.platform}
                        </div>
                      </div>
                      <div className="p-3 bg-muted/30 rounded-lg">
                        <div className="text-sm font-medium text-foreground mb-1">Timezone</div>
                        <div className="text-xs text-muted-foreground">
                          {extendedData.time.timezone}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {fingerprintReport.recommendations && fingerprintReport.recommendations.length > 0 && (
                <div className="card-modern p-6">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Privacy Recommendations
                  </h3>
                  <div className="space-y-3">
                    {fingerprintReport.recommendations.map((recommendation: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                        <span className="text-yellow-400 mt-1 text-lg">•</span>
                        <span className="text-sm text-foreground">{recommendation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted/20 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Privacy Analysis Unavailable</h3>
              <p className="text-muted-foreground">Enhanced data collection is required for privacy analysis.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="advanced" className="mt-0 slide-in">
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-muted/20 rounded-full flex items-center justify-center">
              <Activity className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Advanced Features</h3>
            <p className="text-muted-foreground">Coming soon! Advanced analytics and features will be available here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="faq" className="mt-0 slide-in">
          <FAQ />
        </TabsContent>
      </div>
    </Tabs>
  );
};
