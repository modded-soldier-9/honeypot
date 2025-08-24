import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { 
  Search, Filter, Copy, Download, Eye, EyeOff,
  Globe, Monitor, Smartphone, Clock, MapPin,
  Palette, Zap, Wifi, HardDrive, Lock, Settings,
  Database, Shield, Activity, Gamepad2, Video, Plug
} from 'lucide-react';
import type { ExtendedCollectedData } from '@/types/advanced';

interface DataExplorerProps {
  data: ExtendedCollectedData;
}

export const DataExplorer = ({ data }: DataExplorerProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSensitiveData, setShowSensitiveData] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Organize data into categories
  const dataCategories = useMemo(() => ({
    basic: {
      title: 'Basic Information',
      icon: Database,
      data: {
        browser: data.browser,
        screen: data.screen,
        window: data.window,
        location: data.location,
        time: data.time,
      }
    },
    webgl: {
      title: 'WebGL & Graphics',
      icon: Palette,
      data: {
        webgl: data.webgl,
        canvas: data.canvas,
      }
    },
    audio: {
      title: 'Audio & Media',
      icon: Video,
      data: {
        audio: data.audio,
        media: data.media,
      }
    },
    network: {
      title: 'Network & Connectivity',
      icon: Wifi,
      data: {
        network: data.network,
      }
    },
    storage: {
      title: 'Storage & Data',
      icon: HardDrive,
      data: {
        storage: data.storage,
      }
    },
    permissions: {
      title: 'Permissions & Security',
      icon: Lock,
      data: {
        permissions: data.permissions,
        security: data.security,
      }
    },
    hardware: {
      title: 'Hardware & Sensors',
      icon: Settings,
      data: {
        hardware: data.hardware,
        sensors: data.sensors,
      }
    },
    performance: {
      title: 'Performance & Memory',
      icon: Zap,
      data: {
        performance: data.performance,
      }
    },
    features: {
      title: 'Browser Features',
      icon: Globe,
      data: {
        features: data.features,
      }
    },
    fonts: {
      title: 'Fonts & Typography',
      icon: Activity,
      data: {
        fonts: data.fonts,
      }
    },
    plugins: {
      title: 'Plugins & Extensions',
      icon: Plug,
      data: {
        plugins: data.plugins,
      }
    },
    device: {
      title: 'Device Information',
      icon: Smartphone,
      data: {
        device: data.device,
      }
    },
  }), [data]);

  // Filter data based on search term
  const filteredCategories = useMemo(() => {
    if (!searchTerm) return dataCategories;

    const filtered: typeof dataCategories = {};
    
    Object.entries(dataCategories).forEach(([key, category]) => {
      const filteredData: Record<string, any> = {};
      let hasMatchingData = false;

      Object.entries(category.data).forEach(([dataKey, dataObj]) => {
        const filteredObj: Record<string, any> = {};
        let hasMatchingFields = false;

        Object.entries(dataObj).forEach(([fieldKey, fieldValue]) => {
          const searchLower = searchTerm.toLowerCase();
          const fieldKeyLower = fieldKey.toLowerCase();
          const fieldValueStr = String(fieldValue).toLowerCase();

          if (fieldKeyLower.includes(searchLower) || fieldValueStr.includes(searchLower)) {
            filteredObj[fieldKey] = fieldValue;
            hasMatchingFields = true;
          }
        });

        if (hasMatchingFields) {
          filteredData[dataKey] = filteredObj;
          hasMatchingData = true;
        }
      });

      if (hasMatchingData) {
        filtered[key] = {
          ...category,
          data: filteredData,
        };
      }
    });

    return filtered;
  }, [dataCategories, searchTerm]);

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return 'Not available';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return value.length > 0 ? value.join(', ') : 'None';
      }
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  const getValueType = (value: any): string => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (Array.isArray(value)) return 'array';
    return typeof value;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const isSensitiveData = (key: string, value: any): boolean => {
    const sensitiveKeys = ['fingerprint', 'userAgent', 'canvasFingerprint', 'audioFingerprint', 'fontFingerprint'];
    const sensitiveValues = ['canvasFingerprint', 'audioFingerprint', 'fontFingerprint'];
    
    return sensitiveKeys.includes(key) || 
           (typeof value === 'string' && sensitiveValues.some(sv => value.includes(sv)));
  };

  const DataSection = ({ 
    title, 
    icon: Icon, 
    data, 
    categoryKey 
  }: { 
    title: string; 
    icon: any; 
    data: Record<string, any>;
    categoryKey: string;
  }) => (
    <AccordionItem value={categoryKey} className="border-honey-primary/20">
      <AccordionTrigger className="hover:bg-honey-primary/5 px-4 rounded-lg">
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-honey-primary" />
          <span className="font-semibold text-honey-primary">{title}</span>
          <Badge variant="outline" className="ml-auto">
            {Object.keys(data).length} items
          </Badge>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="space-y-4">
          {Object.entries(data).map(([dataKey, dataObj]) => (
            <Card key={dataKey} className="border-honey-secondary/10">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-honey-secondary capitalize">
                  {dataKey.replace(/([A-Z])/g, ' $1').trim()}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(dataObj).map(([key, value]) => {
                  const isSensitive = isSensitiveData(key, value);
                  const shouldShow = showSensitiveData || !isSensitive;
                  
                  return shouldShow ? (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {getValueType(value)}
                          </Badge>
                          {isSensitive && (
                            <Badge variant="destructive" className="text-xs">
                              Sensitive
                            </Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(formatValue(value))}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-md">
                        <pre className="text-sm font-mono break-all whitespace-pre-wrap">
                          {formatValue(value)}
                        </pre>
                      </div>
                      <Separator />
                    </div>
                  ) : (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive" className="text-xs">
                            Hidden
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowSensitiveData(true)}
                            className="h-6 px-2 text-xs"
                          >
                            Show
                          </Button>
                        </div>
                      </div>
                      <Separator />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-honey-primary">
            🔍 Data Explorer
          </h2>
          <p className="text-muted-foreground">
            Explore and search through all collected browser data
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSensitiveData(!showSensitiveData)}
          >
            {showSensitiveData ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {showSensitiveData ? 'Hide' : 'Show'} Sensitive Data
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const jsonData = JSON.stringify(data, null, 2);
              const blob = new Blob([jsonData], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `honeypot-data-${new Date().toISOString().split('T')[0]}.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-honey-primary/20">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search data fields and values..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {searchTerm && (
              <Button
                variant="outline"
                onClick={() => setSearchTerm('')}
              >
                Clear
              </Button>
            )}
          </div>
          {searchTerm && (
            <p className="text-sm text-muted-foreground mt-2">
              Found {Object.keys(filteredCategories).length} categories matching "{searchTerm}"
            </p>
          )}
        </CardContent>
      </Card>

      {/* Data Categories */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-honey-dark/20 border border-honey-primary/20">
          <TabsTrigger 
            value="overview"
            className="data-[state=active]:bg-honey-primary/20 data-[state=active]:text-honey-primary"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="detailed"
            className="data-[state=active]:bg-honey-secondary/20 data-[state=active]:text-honey-secondary"
          >
            Detailed View
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(filteredCategories).map(([key, category]) => (
              <Card key={key} className="border-honey-primary/20 hover:border-honey-primary/40 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-honey-primary">
                    <category.icon className="h-5 w-5" />
                    {category.title}
                  </CardTitle>
                  <CardDescription>
                    {Object.keys(category.data).length} data objects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(category.data).map(([dataKey, dataObj]) => (
                      <div key={dataKey} className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground capitalize">
                          {dataKey.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <Badge variant="outline">
                          {Object.keys(dataObj).length} fields
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="detailed" className="mt-6">
          <Accordion type="single" collapsible className="space-y-4">
            {Object.entries(filteredCategories).map(([key, category]) => (
              <DataSection
                key={key}
                title={category.title}
                icon={category.icon}
                data={category.data}
                categoryKey={key}
              />
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
};
