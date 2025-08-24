import type { 
  WebGLData, AudioData, NetworkData, StorageData, PermissionData, 
  HardwareData, SensorData, PerformanceData, SecurityData, FeatureData,
  FontData, PluginData, CanvasData, MediaData, DeviceData 
} from '@/types/advanced';

/**
 * Collects WebGL information and generates canvas fingerprint
 */
export const collectWebGLData = (): WebGLData => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      return {
        vendor: null,
        renderer: null,
        version: null,
        shadingLanguageVersion: null,
        extensions: [],
        parameters: {},
        canvasFingerprint: null,
        supported: false,
      };
    }

    // Get WebGL parameters
    const parameters = {
      'MAX_TEXTURE_SIZE': gl.getParameter(gl.MAX_TEXTURE_SIZE),
      'MAX_VIEWPORT_DIMS': gl.getParameter(gl.MAX_VIEWPORT_DIMS),
      'MAX_VERTEX_UNIFORM_VECTORS': gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS),
      'MAX_FRAGMENT_UNIFORM_VECTORS': gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS),
      'MAX_VERTEX_ATTRIBS': gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
      'MAX_VERTEX_UNIFORM_COMPONENTS': gl.getParameter(gl.MAX_VERTEX_UNIFORM_COMPONENTS),
      'MAX_FRAGMENT_UNIFORM_COMPONENTS': gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_COMPONENTS),
      'MAX_VARYING_VECTORS': gl.getParameter(gl.MAX_VARYING_VECTORS),
      'MAX_COMBINED_TEXTURE_IMAGE_UNITS': gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
      'MAX_VERTEX_TEXTURE_IMAGE_UNITS': gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
      'MAX_TEXTURE_IMAGE_UNITS': gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS),
      'MAX_CUBE_MAP_TEXTURE_SIZE': gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE),
      'ALIASED_LINE_WIDTH_RANGE': gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE),
      'ALIASED_POINT_SIZE_RANGE': gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE),
      'MAX_VIEWPORT_DIMS': gl.getParameter(gl.MAX_VIEWPORT_DIMS),
      'MAX_RENDERBUFFER_SIZE': gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
    };

    // Generate canvas fingerprint
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('Browser fingerprinting test 🍯', 2, 2);
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
      ctx.fillText('Browser fingerprinting test 🍯', 4, 4);
      
      const canvasFingerprint = canvas.toDataURL();
      
      return {
        vendor: gl.getParameter(gl.VENDOR),
        renderer: gl.getParameter(gl.RENDERER),
        version: gl.getParameter(gl.VERSION),
        shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
        extensions: Array.from(gl.getSupportedExtensions() || []),
        parameters,
        canvasFingerprint,
        supported: true,
      };
    }

    return {
      vendor: gl.getParameter(gl.VENDOR),
      renderer: gl.getParameter(gl.RENDERER),
      version: gl.getParameter(gl.VERSION),
      shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
      extensions: Array.from(gl.getSupportedExtensions() || []),
      parameters,
      canvasFingerprint: null,
      supported: true,
    };
  } catch (error) {
    return {
      vendor: null,
      renderer: null,
      version: null,
      shadingLanguageVersion: null,
      extensions: [],
      parameters: {},
      canvasFingerprint: null,
      supported: false,
    };
  }
};

/**
 * Collects audio context information
 */
export const collectAudioData = (): AudioData => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContext();
    
    return {
      contextSupported: true,
      sampleRate: audioContext.sampleRate,
      channelCount: audioContext.destination.channelCount,
      audioFingerprint: `${audioContext.sampleRate}-${audioContext.destination.channelCount}-${audioContext.destination.maxChannelCount}`,
      audioWorkletSupported: 'audioWorklet' in audioContext,
      mediaSessionSupported: 'mediaSession' in navigator,
    };
  } catch (error) {
    return {
      contextSupported: false,
      sampleRate: null,
      channelCount: null,
      audioFingerprint: null,
      audioWorkletSupported: false,
      mediaSessionSupported: 'mediaSession' in navigator,
    };
  }
};

/**
 * Collects network information
 */
export const collectNetworkData = (): NetworkData => {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  return {
    connectionType: connection?.type || null,
    effectiveType: connection?.effectiveType || null,
    downlink: connection?.downlink || null,
    rtt: connection?.rtt || null,
    saveData: connection?.saveData || null,
    onLine: navigator.onLine,
    webRTCSupported: 'RTCPeerConnection' in window,
    localIP: null, // Will be populated by WebRTC if needed
  };
};

/**
 * Collects storage API information
 */
export const collectStorageData = (): StorageData => {
  return {
    localStorage: 'localStorage' in window,
    sessionStorage: 'sessionStorage' in window,
    indexedDB: 'indexedDB' in window,
    webSQL: 'openDatabase' in window,
    cacheAPI: 'caches' in window,
    quota: null, // Would need StorageManager API
    usage: null, // Would need StorageManager API
  };
};

/**
 * Collects permission information
 */
export const collectPermissionData = async (): Promise<PermissionData> => {
  const permissions = navigator.permissions;
  
  if (!permissions) {
    return {
      geolocation: null,
      notifications: null,
      camera: null,
      microphone: null,
      clipboard: null,
      midi: null,
      persistentStorage: null,
      push: null,
    };
  }

  const getPermission = async (name: PermissionName): Promise<PermissionState | null> => {
    try {
      const result = await permissions.query({ name } as any);
      return result.state;
    } catch {
      return null;
    }
  };

  return {
    geolocation: await getPermission('geolocation'),
    notifications: await getPermission('notifications'),
    camera: await getPermission('camera'),
    microphone: await getPermission('microphone'),
    clipboard: await getPermission('clipboard-read'),
    midi: await getPermission('midi'),
    persistentStorage: await getPermission('persistent-storage'),
    push: await getPermission('push'),
  };
};

/**
 * Collects hardware information
 */
export const collectHardwareData = (): HardwareData => {
  return {
    hardwareConcurrency: navigator.hardwareConcurrency || null,
    deviceMemory: (navigator as any).deviceMemory || null,
    maxTouchPoints: navigator.maxTouchPoints || null,
    pointerSupport: 'PointerEvent' in window,
    gamepadSupport: 'getGamepads' in navigator,
    vibrationSupport: 'vibrate' in navigator,
    batterySupported: 'getBattery' in navigator,
    batteryLevel: null,
    batteryCharging: null,
  };
};

/**
 * Collects sensor information
 */
export const collectSensorData = (): SensorData => {
  return {
    ambientLightSensor: 'AmbientLightSensor' in window,
    proximitySensor: 'ProximitySensor' in window,
    gyroscope: 'Gyroscope' in window,
    accelerometer: 'Accelerometer' in window,
    magnetometer: 'Magnetometer' in window,
    absoluteOrientation: 'AbsoluteOrientationSensor' in window,
    relativeOrientation: 'RelativeOrientationSensor' in window,
  };
};

/**
 * Collects performance information
 */
export const collectPerformanceData = (): PerformanceData => {
  const performance = window.performance;
  
  let navigationTiming = null;
  if (performance && performance.timing) {
    const timing = performance.timing;
    navigationTiming = {
      navigationStart: timing.navigationStart,
      loadEventEnd: timing.loadEventEnd,
      domContentLoadedEventEnd: timing.domContentLoadedEventEnd,
      responseEnd: timing.responseEnd,
      responseStart: timing.responseStart,
      requestStart: timing.requestStart,
      domainLookupEnd: timing.domainLookupEnd,
      domainLookupStart: timing.domainLookupStart,
      connectEnd: timing.connectEnd,
      connectStart: timing.connectStart,
    };
  }

  let memoryInfo = null;
  if (performance && (performance as any).memory) {
    const memory = (performance as any).memory;
    memoryInfo = {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
    };
  }

  return {
    navigationTiming,
    memoryInfo,
    resourceTiming: 'getEntriesByType' in performance,
    performanceObserver: 'PerformanceObserver' in window,
    userTiming: 'mark' in performance,
    markSupport: 'mark' in performance,
    measureSupport: 'measure' in performance,
  };
};

/**
 * Collects security information
 */
export const collectSecurityData = (): SecurityData => {
  return {
    contentSecurityPolicy: document.querySelector('meta[http-equiv="Content-Security-Policy"]')?.getAttribute('content') || null,
    featurePolicy: document.querySelector('meta[http-equiv="Feature-Policy"]')?.getAttribute('content') || null,
    referrerPolicy: document.querySelector('meta[name="referrer"]')?.getAttribute('content') || null,
    permissionsPolicy: document.querySelector('meta[http-equiv="Permissions-Policy"]')?.getAttribute('content') || null,
    secureContext: window.isSecureContext,
    crossOriginIsolated: window.crossOriginIsolated,
    isSecureContext: window.isSecureContext,
  };
};

/**
 * Collects feature support information
 */
export const collectFeatureData = (): FeatureData => {
  return {
    serviceWorker: 'serviceWorker' in navigator,
    pushNotifications: 'PushManager' in window,
    webShare: 'share' in navigator,
    webBluetooth: 'bluetooth' in navigator,
    webUSB: 'usb' in navigator,
    webMIDI: 'requestMIDIAccess' in navigator,
    webSerial: 'serial' in navigator,
    webHID: 'hid' in navigator,
    presentationAPI: 'presentation' in navigator,
    wakeLock: 'wakeLock' in navigator,
    screenWakeLock: 'wakeLock' in navigator,
    clipboardAPI: 'clipboard' in navigator,
    paymentRequest: 'PaymentRequest' in window,
    credentialManagement: 'credentials' in navigator,
    webAuthn: 'PublicKeyCredential' in window,
    trustedTypes: 'trustedTypes' in window,
    reportingAPI: 'ReportingObserver' in window,
  };
};

/**
 * Collects font information
 */
export const collectFontData = (): FontData => {
  const baseFonts = ['monospace', 'sans-serif', 'serif'];
  const testString = 'mmmmmmmmmmlli';
  const testSize = '72px';
  const h = document.getElementsByTagName('body')[0];
  
  const s = document.createElement('span');
  s.style.fontSize = testSize;
  s.innerHTML = testString;
  h.appendChild(s);
  
  const defaultWidth: { [key: string]: number } = {};
  const defaultHeight: { [key: string]: number } = {};
  
  for (const baseFont of baseFonts) {
    s.style.fontFamily = baseFont;
    defaultWidth[baseFont] = s.offsetWidth;
    defaultHeight[baseFont] = s.offsetHeight;
  }
  
  const fonts = [
    'Arial', 'Verdana', 'Helvetica', 'Times New Roman', 'Courier New',
    'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS',
    'Trebuchet MS', 'Arial Black', 'Impact', 'Lucida Console',
    'Tahoma', 'Geneva', 'Lucida Sans Unicode', 'Franklin Gothic Medium',
    'Arial Narrow', 'Brush Script MT'
  ];
  
  const availableFonts: string[] = [];
  
  for (const font of fonts) {
    let detected = false;
    for (const baseFont of baseFonts) {
      s.style.fontFamily = `${font},${baseFont}`;
      if (s.offsetWidth !== defaultWidth[baseFont] || s.offsetHeight !== defaultHeight[baseFont]) {
        detected = true;
        break;
      }
    }
    if (detected) {
      availableFonts.push(font);
    }
  }
  
  h.removeChild(s);
  
  return {
    availableFonts,
    fontCount: availableFonts.length,
    fontFingerprint: availableFonts.sort().join(','),
    fontList: availableFonts,
  };
};

/**
 * Collects plugin information
 */
export const collectPluginData = (): PluginData => {
  const plugins = Array.from(navigator.plugins).map(plugin => ({
    name: plugin.name,
    description: plugin.description,
    filename: plugin.filename,
    length: plugin.length,
  }));
  
  const mimeTypes = Array.from(navigator.mimeTypes).map(mimeType => ({
    type: mimeType.type,
    description: mimeType.description,
    suffixes: mimeType.suffixes,
    enabledPlugin: mimeType.enabledPlugin,
  }));
  
  return {
    plugins,
    pluginCount: plugins.length,
    mimeTypes,
    mimeTypeCount: mimeTypes.length,
  };
};

/**
 * Collects canvas information
 */
export const collectCanvasData = (): CanvasData => {
  const canvas = document.createElement('canvas');
  
  return {
    canvas2D: !!canvas.getContext('2d'),
    canvasWebGL: !!canvas.getContext('webgl'),
    canvasWebGL2: !!canvas.getContext('webgl2'),
    canvasBitmapRenderer: !!canvas.getContext('bitmaprenderer'),
    canvasImageBitmap: 'createImageBitmap' in window,
    canvasOffscreen: 'OffscreenCanvas' in window,
    canvasFingerprint: null, // Will be set by WebGL collection
    webGLFingerprint: null, // Will be set by WebGL collection
  };
};

/**
 * Collects media information
 */
export const collectMediaData = (): MediaData => {
  return {
    mediaDevices: 'mediaDevices' in navigator,
    getUserMedia: 'getUserMedia' in navigator,
    mediaRecorder: 'MediaRecorder' in window,
    mediaSource: 'MediaSource' in window,
    mediaSession: 'mediaSession' in navigator,
    webCodecs: 'VideoEncoder' in window,
    webRTC: 'RTCPeerConnection' in window,
    peerConnection: 'RTCPeerConnection' in window,
  };
};

/**
 * Collects device information
 */
export const collectDeviceData = (): DeviceData => {
  return {
    devicePixelRatio: window.devicePixelRatio,
    colorDepth: screen.colorDepth,
    pixelDepth: screen.pixelDepth,
    screenOrientation: screen.orientation?.type || null,
    deviceOrientation: 'DeviceOrientationEvent' in window,
    deviceMotion: 'DeviceMotionEvent' in window,
    maxTouchPoints: navigator.maxTouchPoints || 0,
    touchSupport: 'ontouchstart' in window,
    pointerSupport: 'PointerEvent' in window,
    hoverSupport: window.matchMedia('(hover: hover)').matches,
  };
};
