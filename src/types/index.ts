// Core data types
export interface BrowserData {
  userAgent: string;
  language: string;
  languages: string[];
  cookieEnabled: boolean;
  doNotTrack: string | null;
  onLine: boolean;
  platform: string;
  vendor: string;
}

export interface ScreenData {
  width: number;
  height: number;
  availWidth: number;
  availHeight: number;
  colorDepth: number;
  pixelDepth: number;
  orientation: ScreenOrientation | null;
}

export interface WindowData {
  innerWidth: number;
  innerHeight: number;
  outerWidth: number;
  outerHeight: number;
  devicePixelRatio: number;
  screenX: number;
  screenY: number;
}

export interface LocationData {
  href: string;
  origin: string;
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
}

export interface TimeData {
  timezone: string;
  timezoneOffset: number;
  currentTime: string;
  timestamp: number;
}

export interface CollectedData {
  browser: BrowserData;
  screen: ScreenData;
  window: WindowData;
  location: LocationData;
  time: TimeData;
  collectedAt: string;
}

// Export advanced types
export * from './advanced';

// Component props types
export interface DataDisplayProps {
  data: CollectedData;
}

export interface HoneypotHeaderProps {
  title?: string;
  subtitle?: string;
}

// Toast types
export interface ToastProps {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

// Hook return types
export interface UseDataCollectionReturn {
  collectedData: CollectedData | null;
  isCollecting: boolean;
  refreshData: () => void;
  error: string | null;
}

export interface UseToastReturn {
  toast: (props: ToastProps) => void;
  dismiss: (toastId?: string) => void;
}
