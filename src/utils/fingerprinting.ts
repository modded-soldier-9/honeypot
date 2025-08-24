import type { ExtendedCollectedData } from '@/types/advanced';

/**
 * Generates a unique browser fingerprint from collected data
 */
export const generateFingerprint = (data: ExtendedCollectedData): string => {
  const fingerprintComponents = [
    // Browser information
    data.browser.userAgent,
    data.browser.language,
    data.browser.platform,
    data.browser.vendor,
    
    // Screen information
    data.screen.width,
    data.screen.height,
    data.screen.colorDepth,
    data.screen.pixelDepth,
    
    // Window information
    data.window.innerWidth,
    data.window.innerHeight,
    data.window.devicePixelRatio,
    
    // Hardware information
    data.hardware.hardwareConcurrency,
    data.hardware.deviceMemory,
    data.hardware.maxTouchPoints,
    
    // WebGL information
    data.webgl.vendor,
    data.webgl.renderer,
    data.webgl.version,
    
    // Font information
    data.fonts.fontFingerprint,
    
    // Plugin information
    data.plugins.pluginCount,
    data.plugins.mimeTypeCount,
    
    // Canvas fingerprint
    data.webgl.canvasFingerprint,
    
    // Audio fingerprint
    data.audio.audioFingerprint,
    
    // Timezone
    data.time.timezone,
  ];

  // Create a hash from the components
  const fingerprintString = fingerprintComponents
    .filter(component => component !== null && component !== undefined)
    .join('|');
  
  return btoa(fingerprintString).slice(0, 32);
};

/**
 * Calculates privacy score based on collected data
 * Higher score = more privacy (less unique fingerprint)
 */
export const calculatePrivacyScore = (data: ExtendedCollectedData): number => {
  let score = 100; // Start with perfect privacy score
  
  // Deduct points for unique identifiers
  if (data.webgl.canvasFingerprint) score -= 10;
  if (data.audio.audioFingerprint) score -= 5;
  if (data.fonts.fontFingerprint) score -= 5;
  
  // Deduct points for hardware information
  if (data.hardware.hardwareConcurrency) score -= 3;
  if (data.hardware.deviceMemory) score -= 3;
  if (data.hardware.maxTouchPoints) score -= 2;
  
  // Deduct points for WebGL information
  if (data.webgl.vendor) score -= 2;
  if (data.webgl.renderer) score -= 2;
  if (data.webgl.extensions.length > 0) score -= 1;
  
  // Deduct points for plugins
  if (data.plugins.pluginCount > 0) score -= 1;
  if (data.plugins.mimeTypeCount > 0) score -= 1;
  
  // Deduct points for fonts
  if (data.fonts.fontCount > 10) score -= 2;
  
  // Deduct points for timezone
  if (data.time.timezone) score -= 1;
  
  // Deduct points for screen resolution
  if (data.screen.width > 1920 || data.screen.height > 1080) score -= 1;
  
  // Ensure score doesn't go below 0
  return Math.max(0, Math.round(score));
};

/**
 * Calculates uniqueness score based on collected data
 * Higher score = more unique fingerprint
 */
export const calculateUniquenessScore = (data: ExtendedCollectedData): number => {
  let score = 0; // Start with no uniqueness
  
  // Add points for unique identifiers
  if (data.webgl.canvasFingerprint) score += 25;
  if (data.audio.audioFingerprint) score += 15;
  if (data.fonts.fontFingerprint) score += 15;
  
  // Add points for hardware information
  if (data.hardware.hardwareConcurrency) score += 10;
  if (data.hardware.deviceMemory) score += 10;
  if (data.hardware.maxTouchPoints) score += 5;
  
  // Add points for WebGL information
  if (data.webgl.vendor) score += 5;
  if (data.webgl.renderer) score += 5;
  if (data.webgl.extensions.length > 0) score += 2;
  
  // Add points for plugins
  if (data.plugins.pluginCount > 0) score += 3;
  if (data.plugins.mimeTypeCount > 0) score += 3;
  
  // Add points for fonts
  if (data.fonts.fontCount > 10) score += 5;
  
  // Add points for screen resolution
  if (data.screen.width > 1920 || data.screen.height > 1080) score += 2;
  
  // Ensure score doesn't exceed 100
  return Math.min(100, Math.round(score));
};

/**
 * Analyzes fingerprint uniqueness and provides recommendations
 */
export const analyzeFingerprint = (data: ExtendedCollectedData) => {
  const privacyScore = calculatePrivacyScore(data);
  const uniquenessScore = calculateUniquenessScore(data);
  const fingerprint = generateFingerprint(data);
  
  // Determine privacy level
  let privacyLevel: 'High' | 'Medium' | 'Low';
  if (privacyScore >= 80) privacyLevel = 'High';
  else if (privacyScore >= 50) privacyLevel = 'Medium';
  else privacyLevel = 'Low';
  
  // Determine uniqueness level
  let uniquenessLevel: 'Low' | 'Medium' | 'High';
  if (uniquenessScore <= 20) uniquenessLevel = 'Low';
  else if (uniquenessScore <= 60) uniquenessLevel = 'Medium';
  else uniquenessLevel = 'High';
  
  // Generate recommendations
  const recommendations: string[] = [];
  
  if (data.webgl.canvasFingerprint) {
    recommendations.push('Consider using a canvas fingerprinting blocker');
  }
  
  if (data.audio.audioFingerprint) {
    recommendations.push('Consider using an audio fingerprinting blocker');
  }
  
  if (data.fonts.fontCount > 15) {
    recommendations.push('Consider limiting font enumeration');
  }
  
  if (data.plugins.pluginCount > 5) {
    recommendations.push('Consider disabling unnecessary browser plugins');
  }
  
  if (privacyScore < 50) {
    recommendations.push('Consider using privacy-focused browser extensions');
  }
  
  return {
    fingerprint,
    privacyScore,
    uniquenessScore,
    privacyLevel,
    uniquenessLevel,
    recommendations,
  };
};

/**
 * Generates a session ID for tracking data collection sessions
 */
export const generateSessionId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${random}`;
};

/**
 * Compares two fingerprints and returns similarity percentage
 */
export const compareFingerprints = (fingerprint1: string, fingerprint2: string): number => {
  if (fingerprint1 === fingerprint2) return 100;
  
  const length = Math.max(fingerprint1.length, fingerprint2.length);
  let matches = 0;
  
  for (let i = 0; i < length; i++) {
    if (fingerprint1[i] === fingerprint2[i]) {
      matches++;
    }
  }
  
  return Math.round((matches / length) * 100);
};

/**
 * Detects if the browser is using privacy protection features
 */
export const detectPrivacyFeatures = (data: ExtendedCollectedData) => {
  const features = {
    canvasBlocked: !data.webgl.canvasFingerprint,
    audioBlocked: !data.audio.audioFingerprint,
    fontsLimited: data.fonts.fontCount < 10,
    pluginsLimited: data.plugins.pluginCount < 3,
    webGLBlocked: !data.webgl.supported,
    doNotTrack: data.browser.doNotTrack === '1',
    privateMode: detectPrivateMode(),
  };
  
  return features;
};

/**
 * Detects if browser is in private/incognito mode
 */
const detectPrivateMode = (): boolean => {
  try {
    // Try to access indexedDB
    const db = indexedDB.open('test');
    return false;
  } catch {
    return true;
  }
};

/**
 * Generates a comprehensive fingerprint report
 */
export const generateFingerprintReport = (data: ExtendedCollectedData) => {
  const analysis = analyzeFingerprint(data);
  const privacyFeatures = detectPrivacyFeatures(data);
  
  return {
    ...analysis,
    privacyFeatures,
    dataPoints: {
      total: Object.keys(data).length - 3, // Exclude metadata fields
      categories: {
        browser: Object.keys(data.browser).length,
        screen: Object.keys(data.screen).length,
        window: Object.keys(data.window).length,
        location: Object.keys(data.location).length,
        time: Object.keys(data.time).length,
        webgl: Object.keys(data.webgl).length,
        audio: Object.keys(data.audio).length,
        network: Object.keys(data.network).length,
        storage: Object.keys(data.storage).length,
        permissions: Object.keys(data.permissions).length,
        hardware: Object.keys(data.hardware).length,
        sensors: Object.keys(data.sensors).length,
        performance: Object.keys(data.performance).length,
        security: Object.keys(data.security).length,
        features: Object.keys(data.features).length,
        fonts: Object.keys(data.fonts).length,
        plugins: Object.keys(data.plugins).length,
        canvas: Object.keys(data.canvas).length,
        media: Object.keys(data.media).length,
        device: Object.keys(data.device).length,
      },
    },
    timestamp: new Date().toISOString(),
  };
};
