import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, Zap, Sparkles, Lock, Globe } from 'lucide-react';
import { APP_CONFIG } from '@/utils/constants';
import type { HoneypotHeaderProps } from '@/types';

export const HoneypotHeader = ({ 
  title = APP_CONFIG.name, 
  subtitle = APP_CONFIG.description 
}: HoneypotHeaderProps) => {
  return (
    <Card className="card-modern border-honey-primary/20 bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-xl honey-glow overflow-hidden">
      <CardContent className="p-8 lg:p-12 text-center space-y-8 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--honey-primary)),transparent_50%)]"></div>
        </div>
        
        {/* Main Content */}
        <div className="relative z-10 space-y-6">
          {/* Icon and Title */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="text-6xl lg:text-7xl animate-bounce" style={{ animationDuration: '3s' }}>
                🍯
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-6 w-6 text-honey-accent animate-pulse" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-honey-primary via-honey-secondary to-honey-accent bg-clip-text text-transparent honey-glow-text">
                {title}
              </h1>
              <div className="h-1 w-24 mx-auto bg-gradient-to-r from-honey-primary to-honey-secondary rounded-full"></div>
            </div>
            
            <div className="relative">
              <div className="text-6xl lg:text-7xl animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>
                🍯
              </div>
              <div className="absolute -top-2 -left-2">
                <Sparkles className="h-6 w-6 text-honey-accent animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </div>
          
          {/* Subtitle */}
          <div className="max-w-3xl mx-auto">
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed font-medium">
              {subtitle}
            </p>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Badge 
              variant="outline" 
              className="border-honey-primary/30 bg-honey-primary/10 text-honey-primary px-4 py-2 text-sm font-medium backdrop-blur-sm hover:bg-honey-primary/20 transition-all duration-300"
            >
              <Shield className="h-4 w-4 mr-2" />
              Ethical Demo
            </Badge>
            <Badge 
              variant="outline" 
              className="border-honey-secondary/30 bg-honey-secondary/10 text-honey-secondary px-4 py-2 text-sm font-medium backdrop-blur-sm hover:bg-honey-secondary/20 transition-all duration-300"
            >
              <Eye className="h-4 w-4 mr-2" />
              Transparent
            </Badge>
            <Badge 
              variant="outline" 
              className="border-honey-accent/30 bg-honey-accent/10 text-honey-accent px-4 py-2 text-sm font-medium backdrop-blur-sm hover:bg-honey-accent/20 transition-all duration-300"
            >
              <Zap className="h-4 w-4 mr-2" />
              Real-time
            </Badge>
            <Badge 
              variant="outline" 
              className="border-green-500/30 bg-green-500/10 text-green-400 px-4 py-2 text-sm font-medium backdrop-blur-sm hover:bg-green-500/20 transition-all duration-300"
            >
              <Lock className="h-4 w-4 mr-2" />
              Secure
            </Badge>
            <Badge 
              variant="outline" 
              className="border-blue-500/30 bg-blue-500/10 text-blue-400 px-4 py-2 text-sm font-medium backdrop-blur-sm hover:bg-blue-500/20 transition-all duration-300"
            >
              <Globe className="h-4 w-4 mr-2" />
              Cross-browser
            </Badge>
          </div>

          {/* Version Info */}
          <div className="pt-6 border-t border-border/20">
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Version {APP_CONFIG.version}
              </span>
              <span>•</span>
              <span>Educational Purpose Only</span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-honey-primary rounded-full animate-pulse"></div>
                Privacy-First
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};