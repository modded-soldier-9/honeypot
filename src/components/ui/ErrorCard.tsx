import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, RefreshCw, Shield } from 'lucide-react';

interface ErrorCardProps {
  error: string;
}

export const ErrorCard = ({ error }: ErrorCardProps) => {
  return (
    <Card className="card-modern border-destructive/20 bg-gradient-to-br from-destructive/10 via-destructive/5 to-transparent backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-destructive/20 to-red-500/20 rounded-full flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
        </div>
        <CardTitle className="flex items-center justify-center gap-3 text-destructive text-2xl">
          <AlertCircle className="h-6 w-6" />
          Data Collection Failed
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We encountered an issue while collecting your browser data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Error Details */}
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Error Details:</h4>
              <p className="text-sm text-muted-foreground font-mono bg-muted/30 p-3 rounded border">
                {error}
              </p>
            </div>
          </div>
        </div>
        
        {/* Troubleshooting Steps */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Troubleshooting Steps
          </h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-blue-400">1</span>
              </div>
              <div>
                <span className="text-sm font-medium text-foreground">Refresh the page</span>
                <p className="text-xs text-muted-foreground mt-1">Try reloading the application to resolve temporary issues</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-green-400">2</span>
              </div>
              <div>
                <span className="text-sm font-medium text-foreground">Check browser settings</span>
                <p className="text-xs text-muted-foreground mt-1">Ensure JavaScript is enabled and privacy settings allow data collection</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-amber-400">3</span>
              </div>
              <div>
                <span className="text-sm font-medium text-foreground">Try a different browser</span>
                <p className="text-xs text-muted-foreground mt-1">Some browsers may have stricter privacy policies</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Privacy Notice */}
        <div className="p-4 bg-muted/20 rounded-lg border border-border/20">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-4 w-4 text-green-400" />
            <span className="text-sm font-medium text-foreground">Privacy & Security</span>
          </div>
          <p className="text-xs text-muted-foreground">
            This application collects data locally in your browser for educational purposes only. 
            No information is transmitted to external servers. Your privacy is protected.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
