// Application constants
export const APP_CONFIG = {
  name: 'Honeypot Data Collector',
  version: '1.0.0',
  description: 'Ethical demonstration of browser data collection capabilities',
} as const;

// UI constants
export const UI_CONSTANTS = {
  toastDuration: 3000, // ms
  animationDuration: 300, // ms
} as const;

// Data collection constants
export const DATA_COLLECTION = {
  refreshInterval: 5000, // ms
  maxRetries: 3,
  timeout: 10000, // ms
  loadingDelay: 1500, // ms
} as const;

// File constants
export const FILE_CONSTANTS = {
  defaultFilename: 'honeypot-data',
  fileExtension: '.json',
  mimeType: 'application/json',
} as const;

// Theme constants
export const THEME_CONSTANTS = {
  honeyPrimary: 'honey-primary',
  honeySecondary: 'honey-secondary',
  honeyDark: 'honey-dark',
  honeyLight: 'honey-light',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  dataCollectionFailed: 'Unable to collect data. Please try refreshing the page or check your browser settings.',
  downloadFailed: 'Failed to download data. Please try again.',
  refreshFailed: 'Failed to refresh data. Please try again.',
  networkError: 'Network error occurred. Please check your connection.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  dataDownloaded: 'Your collected data has been downloaded as a JSON file.',
  dataRefreshed: 'Collecting updated information from your browser.',
} as const;
