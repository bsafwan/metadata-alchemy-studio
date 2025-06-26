
interface DeviceInfo {
  deviceId: string;
  fingerprint: string;
  userAgent: string;
  screen: string;
  timezone: string;
  language: string;
  createdAt: string;
}

class DeviceIdentifierManager {
  private dbName = 'ElismetDeviceDB';
  private version = 1;
  private db: IDBDatabase | null = null;

  // Generate unique device fingerprint
  private generateDeviceFingerprint(): string {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('Device fingerprint', 2, 2);
    }
    
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      screen.colorDepth,
      new Date().getTimezoneOffset(),
      !!window.sessionStorage,
      !!window.localStorage,
      canvas.toDataURL()
    ].join('|');
    
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString(36).toUpperCase();
  }

  // Generate unique device ID
  private generateDeviceId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 8);
    const fingerprint = this.generateDeviceFingerprint().substr(0, 6);
    return `DEV-${timestamp}-${fingerprint}-${random}`.toUpperCase();
  }

  // Initialize IndexedDB
  private async initDB(): Promise<void> {
    if (this.db) return;
    
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        if (!db.objectStoreNames.contains('device_info')) {
          db.createObjectStore('device_info', { keyPath: 'deviceId' });
        }
        
        if (!db.objectStoreNames.contains('subscription_data')) {
          db.createObjectStore('subscription_data', { keyPath: 'deviceId' });
        }
      };
    });
  }

  // Get or create device info
  async getOrCreateDeviceInfo(): Promise<DeviceInfo> {
    // Try localStorage first
    const stored = localStorage.getItem('elismet_device_info');
    if (stored) {
      try {
        const deviceInfo = JSON.parse(stored);
        // Verify it's still valid
        if (deviceInfo.deviceId && deviceInfo.fingerprint) {
          return deviceInfo;
        }
      } catch (error) {
        console.warn('Invalid stored device info, generating new one');
      }
    }

    // Generate new device info
    const deviceInfo: DeviceInfo = {
      deviceId: this.generateDeviceId(),
      fingerprint: this.generateDeviceFingerprint(),
      userAgent: navigator.userAgent,
      screen: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      createdAt: new Date().toISOString()
    };

    // Store in localStorage
    localStorage.setItem('elismet_device_info', JSON.stringify(deviceInfo));

    // Store in IndexedDB
    try {
      await this.initDB();
      await this.storeInIndexedDB('device_info', deviceInfo);
    } catch (error) {
      console.warn('Failed to store in IndexedDB:', error);
    }

    return deviceInfo;
  }

  // Store data in IndexedDB
  private async storeInIndexedDB(storeName: string, data: any): Promise<void> {
    if (!this.db) await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  // Get data from IndexedDB
  private async getFromIndexedDB(storeName: string, key: string): Promise<any> {
    if (!this.db) await this.initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  // Store subscription data
  async storeSubscriptionData(deviceId: string, subscriptionData: any): Promise<void> {
    const data = {
      deviceId,
      subscription: subscriptionData,
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString()
    };

    localStorage.setItem('elismet_push_subscription', JSON.stringify(data));
    
    try {
      await this.storeInIndexedDB('subscription_data', data);
    } catch (error) {
      console.warn('Failed to store subscription in IndexedDB:', error);
    }
  }

  // Get subscription data
  async getSubscriptionData(deviceId: string): Promise<any> {
    // Try localStorage first
    const stored = localStorage.getItem('elismet_push_subscription');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data.deviceId === deviceId) {
          return data;
        }
      } catch (error) {
        console.warn('Invalid stored subscription data');
      }
    }

    // Try IndexedDB
    try {
      return await this.getFromIndexedDB('subscription_data', deviceId);
    } catch (error) {
      console.warn('Failed to get subscription from IndexedDB:', error);
      return null;
    }
  }

  // Get current page context for subscription
  getCurrentPageContext(): any {
    const urlParams = new URLSearchParams(window.location.search);
    const context = {
      page: window.location.pathname,
      params: Object.fromEntries(urlParams.entries()),
      referrer: document.referrer,
      timestamp: new Date().toISOString()
    };

    return context;
  }
}

export const deviceManager = new DeviceIdentifierManager();
export type { DeviceInfo };
