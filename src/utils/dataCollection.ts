import type { CollectedData, BrowserData, ScreenData, WindowData, LocationData, TimeData } from '@/types';
import type { ExtendedCollectedData } from '@/types/advanced';
import { 
  collectWebGLData, collectAudioData, collectNetworkData, collectStorageData,
  collectPermissionData, collectHardwareData, collectSensorData, collectPerformanceData,
  collectSecurityData, collectFeatureData, collectFontData, collectPluginData,
  collectCanvasData, collectMediaData, collectDeviceData
} from './advancedDataCollection';
import { generateSessionId, generateFingerprint, calculatePrivacyScore, calculateUniquenessScore } from './fingerprinting';

/**
 * Collects browser information
 */
export const collectBrowserData = (): BrowserData => {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    languages: navigator.languages || [],
    cookieEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack,
    onLine: navigator.onLine,
    platform: navigator.platform,
    vendor: navigator.vendor,
  };
};

/**
 * Collects screen information
 */
export const collectScreenData = (): ScreenData => {
  return {
    width: screen.width,
    height: screen.height,
    availWidth: screen.availWidth,
    availHeight: screen.availHeight,
    colorDepth: screen.colorDepth,
    pixelDepth: screen.pixelDepth,
    orientation: screen.orientation || null,
  };
};

/**
 * Collects window information
 */
export const collectWindowData = (): WindowData => {
  return {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    outerWidth: window.outerWidth,
    outerHeight: window.outerHeight,
    devicePixelRatio: window.devicePixelRatio,
    screenX: window.screenX,
    screenY: window.screenY,
  };
};

/**
 * Collects location information
 */
export const collectLocationData = (): LocationData => {
  return {
    href: window.location.href,
    origin: window.location.origin,
    protocol: window.location.protocol,
    host: window.location.host,
    hostname: window.location.hostname,
    port: window.location.port,
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  };
};

/**
 * Collects time and timezone information
 */
export const collectTimeData = (): TimeData => {
  const now = new Date();
  return {
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: now.getTimezoneOffset(),
    currentTime: now.toISOString(),
    timestamp: now.getTime(),
  };
};

/**
 * Collects all available data from the browser (original version)
 */
export const collectAllData = (): CollectedData => {
  return {
    browser: collectBrowserData(),
    screen: collectScreenData(),
    window: collectWindowData(),
    location: collectLocationData(),
    time: collectTimeData(),
    collectedAt: new Date().toISOString(),
  };
};

/**
 * Collects all available data from the browser (extended version)
 */
export const collectAllExtendedData = async (): Promise<ExtendedCollectedData> => {
  const sessionId = generateSessionId();
  
  // Collect basic data
  const basicData = collectAllData();
  
  // Collect advanced data
  const webgl = collectWebGLData();
  const audio = collectAudioData();
  const network = collectNetworkData();
  const storage = collectStorageData();
  const permissions = await collectPermissionData();
  const hardware = collectHardwareData();
  const sensors = collectSensorData();
  const performance = collectPerformanceData();
  const security = collectSecurityData();
  const features = collectFeatureData();
  const fonts = collectFontData();
  const plugins = collectPluginData();
  const canvas = collectCanvasData();
  const media = collectMediaData();
  const device = collectDeviceData();
  
  // Create extended data object
  const extendedData: ExtendedCollectedData = {
    ...basicData,
    webgl,
    audio,
    network,
    storage,
    permissions,
    hardware,
    sensors,
    performance,
    security,
    features,
    fonts,
    plugins,
    canvas,
    media,
    device,
    sessionId,
    fingerprint: null,
    privacyScore: 0,
    uniquenessScore: 0,
  };
  
  // Generate fingerprint and scores
  extendedData.fingerprint = generateFingerprint(extendedData);
  extendedData.privacyScore = calculatePrivacyScore(extendedData);
  extendedData.uniquenessScore = calculateUniquenessScore(extendedData);
  
  return extendedData;
};

/**
 * Downloads collected data as a JSON file
 */
export const downloadDataAsJson = (data: CollectedData, filename?: string): void => {
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `honeypot-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
