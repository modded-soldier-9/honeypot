import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Database, Sparkles } from 'lucide-react';

export const LoadingCard = () => {
  return (
    <Card className="card-modern border-honey-primary/20 bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-xl honey-glow overflow-hidden">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-honey-primary/20 to-honey-secondary/20 rounded-full flex items-center justify-center animate-pulse">
              <Database className="h-8 w-8 text-honey-primary" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="h-6 w-6 text-honey-accent animate-pulse" />
            </div>
          </div>
        </div>
        <CardTitle className="flex items-center justify-center gap-3 text-honey-primary text-2xl">
          <Loader2 className="h-6 w-6 animate-spin" />
          🍯 Collecting Honey Data...
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Gathering comprehensive browser and device information transparently. 
          This ethical demonstration shows what data can be collected.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Loading Animation */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="w-32 h-32 border-4 border-muted rounded-full"></div>
            <div className="absolute top-0 left-0 w-32 h-32 border-4 border-transparent border-t-honey-primary rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-32 h-32 border-4 border-transparent border-r-honey-secondary rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
          </div>
        </div>
        
        {/* Loading Steps */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-foreground">Browser information collected</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-3 h-3 bg-honey-primary rounded-full animate-pulse"></div>
            <span className="text-sm text-foreground">Screen and window data gathered</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-3 h-3 bg-honey-secondary rounded-full animate-pulse"></div>
            <span className="text-sm text-foreground">Location and time data processed</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <div className="w-3 h-3 bg-honey-accent rounded-full animate-pulse"></div>
            <span className="text-sm text-foreground">Advanced fingerprinting analysis</span>
          </div>
        </div>
        
        {/* Status Message */}
        <div className="text-center space-y-2">
          <div className="text-lg font-medium text-foreground">
            🔍 Ethical data collection in progress...
          </div>
          <div className="text-sm text-muted-foreground">
            Building your digital fingerprint transparently and securely
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
