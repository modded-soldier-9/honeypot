// Advanced browser capabilities and features
export interface WebGLData {
  vendor: string | null;
  renderer: string | null;
  version: string | null;
  shadingLanguageVersion: string | null;
  extensions: string[];
  parameters: Record<string, any>;
  canvasFingerprint: string | null;
  supported: boolean;
}

export interface AudioData {
  contextSupported: boolean;
  sampleRate: number | null;
  channelCount: number | null;
  audioFingerprint: string | null;
  audioWorkletSupported: boolean;
  mediaSessionSupported: boolean;
}

export interface NetworkData {
  connectionType: string | null;
  effectiveType: string | null;
  downlink: number | null;
  rtt: number | null;
  saveData: boolean | null;
  onLine: boolean;
  webRTCSupported: boolean;
  localIP: string | null;
}

export interface StorageData {
  localStorage: boolean;
  sessionStorage: boolean;
  indexedDB: boolean;
  webSQL: boolean;
  cacheAPI: boolean;
  quota: number | null;
  usage: number | null;
}

export interface PermissionData {
  geolocation: PermissionState | null;
  notifications: PermissionState | null;
  camera: PermissionState | null;
  microphone: PermissionState | null;
  clipboard: PermissionState | null;
  midi: PermissionState | null;
  persistentStorage: PermissionState | null;
  push: PermissionState | null;
}

export interface HardwareData {
  hardwareConcurrency: number | null;
  deviceMemory: number | null;
  maxTouchPoints: number | null;
  pointerSupport: boolean;
  gamepadSupport: boolean;
  vibrationSupport: boolean;
  batterySupported: boolean;
  batteryLevel: number | null;
  batteryCharging: boolean | null;
}

export interface SensorData {
  ambientLightSensor: boolean;
  proximitySensor: boolean;
  gyroscope: boolean;
  accelerometer: boolean;
  magnetometer: boolean;
  absoluteOrientation: boolean;
  relativeOrientation: boolean;
}

export interface PerformanceData {
  navigationTiming: Record<string, number> | null;
  memoryInfo: Record<string, number> | null;
  resourceTiming: boolean;
  performanceObserver: boolean;
  userTiming: boolean;
  markSupport: boolean;
  measureSupport: boolean;
}

export interface SecurityData {
  contentSecurityPolicy: string | null;
  featurePolicy: string | null;
  referrerPolicy: string | null;
  permissionsPolicy: string | null;
  secureContext: boolean;
  crossOriginIsolated: boolean;
  isSecureContext: boolean;
}

export interface FeatureData {
  serviceWorker: boolean;
  pushNotifications: boolean;
  webShare: boolean;
  webBluetooth: boolean;
  webUSB: boolean;
  webMIDI: boolean;
  webSerial: boolean;
  webHID: boolean;
  presentationAPI: boolean;
  wakeLock: boolean;
  screenWakeLock: boolean;
  clipboardAPI: boolean;
  paymentRequest: boolean;
  credentialManagement: boolean;
  webAuthn: boolean;
  trustedTypes: boolean;
  reportingAPI: boolean;
}

export interface FontData {
  availableFonts: string[];
  fontCount: number;
  fontFingerprint: string | null;
  fontList: string[];
}

export interface PluginData {
  plugins: Array<{
    name: string;
    description: string;
    filename: string;
    length: number;
  }>;
  pluginCount: number;
  mimeTypes: Array<{
    type: string;
    description: string;
    suffixes: string;
    enabledPlugin: any;
  }>;
  mimeTypeCount: number;
}

export interface CanvasData {
  canvas2D: boolean;
  canvasWebGL: boolean;
  canvasWebGL2: boolean;
  canvasBitmapRenderer: boolean;
  canvasImageBitmap: boolean;
  canvasOffscreen: boolean;
  canvasFingerprint: string | null;
  webGLFingerprint: string | null;
}

export interface MediaData {
  mediaDevices: boolean;
  getUserMedia: boolean;
  mediaRecorder: boolean;
  mediaSource: boolean;
  mediaSession: boolean;
  webCodecs: boolean;
  webRTC: boolean;
  peerConnection: boolean;
}

export interface DeviceData {
  devicePixelRatio: number;
  colorDepth: number;
  pixelDepth: number;
  screenOrientation: string | null;
  deviceOrientation: boolean;
  deviceMotion: boolean;
  maxTouchPoints: number;
  touchSupport: boolean;
  pointerSupport: boolean;
  hoverSupport: boolean;
}

// Extended collected data interface
export interface ExtendedCollectedData {
  // Original data
  browser: import('./index').BrowserData;
  screen: import('./index').ScreenData;
  window: import('./index').WindowData;
  location: import('./index').LocationData;
  time: import('./index').TimeData;
  
  // New advanced data
  webgl: WebGLData;
  audio: AudioData;
  network: NetworkData;
  storage: StorageData;
  permissions: PermissionData;
  hardware: HardwareData;
  sensors: SensorData;
  performance: PerformanceData;
  security: SecurityData;
  features: FeatureData;
  fonts: FontData;
  plugins: PluginData;
  canvas: CanvasData;
  media: MediaData;
  device: DeviceData;
  
  // Metadata
  collectedAt: string;
  sessionId: string;
  fingerprint: string | null;
  privacyScore: number;
  uniquenessScore: number;
}
