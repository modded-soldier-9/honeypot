import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Globe, Monitor, Smartphone, Clock, MapPin, Database, Activity, Shield } from 'lucide-react';
import type { DataDisplayProps } from '@/types';

export const DataDisplay = ({ data }: DataDisplayProps) => {
  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return 'Not available';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return String(value);
  };

  const getValueColor = (value: any): string => {
    if (value === null || value === undefined) return 'text-red-400';
    if (typeof value === 'boolean') return value ? 'text-green-400' : 'text-red-400';
    if (typeof value === 'number') return 'text-blue-400';
    if (typeof value === 'string') return 'text-amber-400';
    return 'text-muted-foreground';
  };

  const DataSection = ({ 
    title, 
    icon: Icon, 
    data, 
    className = "",
    color = "honey-primary"
  }: { 
    title: string; 
    icon: any; 
    data: Record<string, any>; 
    className?: string;
    color?: string;
  }) => (
    <Card className={`card-modern border-${color}/20 bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-sm ${className} group hover:border-${color}/40 transition-all duration-300`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-foreground group-hover:text-${color} transition-colors duration-300">
          <div className={`p-2 bg-${color}/10 rounded-lg group-hover:bg-${color}/20 transition-colors duration-300`}>
            <Icon className="h-5 w-5 text-${color}" />
          </div>
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Detailed information about your {title.toLowerCase()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(data).map(([key, value], index) => (
          <div key={key} className="space-y-3 group/item">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <Badge 
                variant="outline" 
                className={`text-xs border-${color}/30 bg-${color}/10 text-${color}`}
              >
                {typeof value}
              </Badge>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg border border-border/20 group-hover/item:bg-muted/50 transition-colors duration-300">
              <pre className={`text-sm font-mono break-all whitespace-pre-wrap ${getValueColor(value)}`}>
                {formatValue(value)}
              </pre>
            </div>
            {index < Object.entries(data).length - 1 && (
              <Separator className="opacity-30" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color = "honey-primary",
    description 
  }: {
    title: string;
    value: number;
    icon: any;
    color?: string;
    description?: string;
  }) => (
    <div className={`p-6 bg-gradient-to-br from-${color}/10 via-${color}/5 to-transparent rounded-xl border border-${color}/20 text-center group hover:border-${color}/40 transition-all duration-300`}>
      <div className={`w-12 h-12 mx-auto mb-3 bg-${color}/20 rounded-lg flex items-center justify-center group-hover:bg-${color}/30 transition-colors duration-300`}>
        <Icon className={`h-6 w-6 text-${color}`} />
      </div>
      <div className={`text-2xl font-bold text-${color} mb-1`}>
        {value}
      </div>
      <div className="text-sm font-medium text-foreground mb-1">
        {title}
      </div>
      {description && (
        <div className="text-xs text-muted-foreground">
          {description}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-8 fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-honey-primary/20 to-honey-secondary/20 rounded-full flex items-center justify-center">
            <Database className="h-8 w-8 text-honey-primary" />
          </div>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-honey-primary via-honey-secondary to-honey-accent bg-clip-text text-transparent">
          🍯 Your Digital Fingerprint
        </h2>
        <p className="text-muted-foreground text-lg">
          Collected at: {new Date(data.collectedAt).toLocaleString()}
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <StatCard 
          title="Browser" 
          value={Object.keys(data.browser).length} 
          icon={Globe} 
          color="honey-primary"
          description="Properties"
        />
        <StatCard 
          title="Screen" 
          value={Object.keys(data.screen).length} 
          icon={Monitor} 
          color="honey-secondary"
          description="Properties"
        />
        <StatCard 
          title="Window" 
          value={Object.keys(data.window).length} 
          icon={Smartphone} 
          color="honey-accent"
          description="Properties"
        />
        <StatCard 
          title="Location" 
          value={Object.keys(data.location).length} 
          icon={MapPin} 
          color="blue-500"
          description="Properties"
        />
        <StatCard 
          title="Time" 
          value={Object.keys(data.time).length} 
          icon={Clock} 
          color="green-500"
          description="Properties"
        />
      </div>

      {/* Data Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        <DataSection 
          title="Browser Information" 
          icon={Globe} 
          data={data.browser}
          color="honey-primary"
        />
        <DataSection 
          title="Screen Information" 
          icon={Monitor} 
          data={data.screen}
          color="honey-secondary"
        />
        <DataSection 
          title="Window Information" 
          icon={Smartphone} 
          data={data.window}
          color="honey-accent"
        />
        <DataSection 
          title="Location Information" 
          icon={MapPin} 
          data={data.location}
          color="blue-500"
        />
        <DataSection 
          title="Time Information" 
          icon={Clock} 
          data={data.time}
          className="md:col-span-2"
          color="green-500"
        />
      </div>

      {/* Summary Card */}
      <Card className="card-modern border-honey-secondary/20 bg-gradient-to-br from-honey-secondary/10 via-honey-secondary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-honey-secondary">
            <div className="p-2 bg-honey-secondary/20 rounded-lg">
              <Activity className="h-5 w-5" />
            </div>
            📊 Data Collection Summary
          </CardTitle>
          <CardDescription>
            Overview of collected information categories and their properties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries({
              'Browser': data.browser,
              'Screen': data.screen,
              'Window': data.window,
              'Location': data.location,
              'Time': data.time
            }).map(([category, categoryData]) => (
              <div key={category} className="text-center p-4 bg-muted/30 rounded-lg border border-border/20 hover:bg-muted/50 transition-colors duration-300">
                <div className="text-2xl font-bold text-honey-secondary mb-1">
                  {Object.keys(categoryData).length}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {category}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Properties
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-border/20">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium text-foreground">Privacy Notice</span>
            </div>
            <p className="text-xs text-muted-foreground">
              This data is collected locally in your browser for educational purposes only. 
              No information is transmitted to external servers. All data remains private and secure.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};