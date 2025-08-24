import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, Fingerprint, Database, Activity, 
  Monitor, Smartphone, Globe, Settings,
  Wifi, HardDrive, Lock, Zap,
  Palette, Plug, Video, Gamepad2
} from 'lucide-react';
import type { ExtendedCollectedData } from '@/types/advanced';

interface DataDashboardProps {
  data: ExtendedCollectedData;
  fingerprintReport: any;
  dataStats: any;
}

export const DataDashboard = ({ data, fingerprintReport, dataStats }: DataDashboardProps) => {
  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return 'Not available';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
  };

  const getPrivacyColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getUniquenessColor = (score: number) => {
    if (score <= 20) return 'text-green-500';
    if (score <= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusColor = (supported: boolean) => {
    return supported ? 'text-green-500' : 'text-red-500';
  };

  const getStatusIcon = (supported: boolean) => {
    return supported ? '✓' : '✗';
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-honey-primary">
          🍯 Advanced Digital Fingerprint Dashboard
        </h1>
        <p className="text-muted-foreground">
          Comprehensive analysis of your browser's data collection capabilities
        </p>
        <div className="flex justify-center gap-4 text-sm text-muted-foreground">
          <span>Session: {data.sessionId}</span>
          <span>•</span>
          <span>Collected: {new Date(data.collectedAt).toLocaleString()}</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-honey-primary/20 bg-gradient-to-br from-honey-primary/10 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-honey-primary">
              <Database className="h-4 w-4 inline mr-2" />
              Total Data Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-honey-primary">
              {dataStats?.totalDataPoints || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Across {Object.keys(dataStats?.categories || {}).length} categories
            </p>
          </CardContent>
        </Card>

        <Card className="border-honey-secondary/20 bg-gradient-to-br from-honey-secondary/10 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-honey-secondary">
              <Shield className="h-4 w-4 inline mr-2" />
              Privacy Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getPrivacyColor(data.privacyScore)}`}>
              {data.privacyScore}%
            </div>
            <Progress value={data.privacyScore} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {fingerprintReport?.privacyLevel} Privacy
            </p>
          </CardContent>
        </Card>

        <Card className="border-honey-primary/20 bg-gradient-to-br from-honey-primary/10 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-honey-primary">
              <Fingerprint className="h-4 w-4 inline mr-2" />
              Uniqueness Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getUniquenessColor(data.uniquenessScore)}`}>
              {data.uniquenessScore}%
            </div>
            <Progress value={data.uniquenessScore} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {fingerprintReport?.uniquenessLevel} Uniqueness
            </p>
          </CardContent>
        </Card>

        <Card className="border-honey-secondary/20 bg-gradient-to-br from-honey-secondary/10 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-honey-secondary">
              <Activity className="h-4 w-4 inline mr-2" />
              Fingerprint ID
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-mono text-honey-secondary break-all">
              {data.fingerprint?.slice(0, 16)}...
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Unique identifier
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Category Overview */}
      <Card className="border-honey-primary/20">
        <CardHeader>
          <CardTitle className="text-honey-primary">
            <Database className="h-5 w-5 inline mr-2" />
            Data Collection Categories
          </CardTitle>
          <CardDescription>
            Overview of all data categories and their collection status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries(dataStats?.categories || {}).map(([category, count]) => (
              <div key={category} className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-lg font-bold text-honey-primary">
                  {count as number}
                </div>
                <div className="text-xs text-muted-foreground capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Privacy Features Status */}
      <Card className="border-honey-secondary/20">
        <CardHeader>
          <CardTitle className="text-honey-secondary">
            <Shield className="h-5 w-5 inline mr-2" />
            Privacy Protection Status
          </CardTitle>
          <CardDescription>
            Current status of privacy protection features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <span className={`text-lg ${getStatusColor(!data.webgl.canvasFingerprint)}`}>
                {getStatusIcon(!data.webgl.canvasFingerprint)}
              </span>
              <span className="text-sm">Canvas Blocked</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-lg ${getStatusColor(!data.audio.audioFingerprint)}`}>
                {getStatusIcon(!data.audio.audioFingerprint)}
              </span>
              <span className="text-sm">Audio Blocked</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-lg ${getStatusColor(data.fonts.fontCount < 10)}`}>
                {getStatusIcon(data.fonts.fontCount < 10)}
              </span>
              <span className="text-sm">Fonts Limited</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-lg ${getStatusColor(data.browser.doNotTrack === '1')}`}>
                {getStatusIcon(data.browser.doNotTrack === '1')}
              </span>
              <span className="text-sm">Do Not Track</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Browser Capabilities Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Web Technologies */}
        <Card className="border-honey-primary/20">
          <CardHeader>
            <CardTitle className="text-honey-primary">
              <Globe className="h-5 w-5 inline mr-2" />
              Web Technologies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">WebGL Support</span>
              <Badge variant={data.webgl.supported ? "default" : "secondary"}>
                {data.webgl.supported ? "Supported" : "Not Supported"}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Audio Context</span>
              <Badge variant={data.audio.contextSupported ? "default" : "secondary"}>
                {data.audio.contextSupported ? "Supported" : "Not Supported"}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Service Worker</span>
              <Badge variant={data.features.serviceWorker ? "default" : "secondary"}>
                {data.features.serviceWorker ? "Supported" : "Not Supported"}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">WebRTC</span>
              <Badge variant={data.network.webRTCSupported ? "default" : "secondary"}>
                {data.network.webRTCSupported ? "Supported" : "Not Supported"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Hardware & Sensors */}
        <Card className="border-honey-secondary/20">
          <CardHeader>
            <CardTitle className="text-honey-secondary">
              <Settings className="h-5 w-5 inline mr-2" />
              Hardware & Sensors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">CPU Cores</span>
              <Badge variant="outline">
                {data.hardware.hardwareConcurrency || 'Unknown'}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Device Memory</span>
              <Badge variant="outline">
                {data.hardware.deviceMemory ? `${data.hardware.deviceMemory}GB` : 'Unknown'}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Touch Points</span>
              <Badge variant="outline">
                {data.hardware.maxTouchPoints || 'None'}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Gamepad Support</span>
              <Badge variant={data.hardware.gamepadSupport ? "default" : "secondary"}>
                {data.hardware.gamepadSupport ? "Supported" : "Not Supported"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      {fingerprintReport?.recommendations && fingerprintReport.recommendations.length > 0 && (
        <Card className="border-yellow-500/20 bg-yellow-500/5">
          <CardHeader>
            <CardTitle className="text-yellow-600">
              <Shield className="h-5 w-5 inline mr-2" />
              Privacy Recommendations
            </CardTitle>
            <CardDescription>
              Suggestions to improve your privacy protection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {fingerprintReport.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span className="text-sm">{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Data Summary */}
      <Card className="border-honey-primary/20">
        <CardHeader>
          <CardTitle className="text-honey-primary">
            <Activity className="h-5 w-5 inline mr-2" />
            Collection Summary
          </CardTitle>
          <CardDescription>
            Detailed breakdown of collected information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Browser Information</h4>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>User Agent: {data.browser.userAgent.slice(0, 50)}...</div>
                <div>Language: {data.browser.language}</div>
                <div>Platform: {data.browser.platform}</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Display Information</h4>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Resolution: {data.screen.width}×{data.screen.height}</div>
                <div>Color Depth: {data.screen.colorDepth} bits</div>
                <div>Pixel Ratio: {data.window.devicePixelRatio}</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">System Information</h4>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>Timezone: {data.time.timezone}</div>
                <div>Online: {data.browser.onLine ? 'Yes' : 'No'}</div>
                <div>Secure Context: {data.security.secureContext ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
