/**
 * VALORAIPLUS Sovereign API Client
 * Universal client for all terminals to call the Sovereign API.
 * Supports fetch (REST) and WebSocket for real-time updates.
 * 
 * SGAU 7226.3461 // ZERO DRIFT PROTOCOL
 */

export interface SovereignStatus {
  ledger: string;
  greatWork: string;
  omegaZero: string;
  signalStrength: number;
  driftEvents: number;
  timestamp: string;
}

export interface CommandResult {
  result: string;
  id?: string;
  error?: string;
}

export class SovereignAPIClient {
  private baseUrl: string;
  private apiSecret: string;
  private socket?: WebSocket;

  constructor(baseUrl: string, apiSecret: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.apiSecret = apiSecret;
  }

  // Generic GET request
  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: { Authorization: `Bearer ${this.apiSecret}` },
    });
    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  }

  // Generic POST request
  async post<T>(path: string, body: Record<string, unknown>): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiSecret}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  }

  // Specific endpoints
  async getStatus(): Promise<SovereignStatus> {
    return this.get<SovereignStatus>('/status');
  }

  async executeCommand(cmd: string, params?: Record<string, unknown>): Promise<CommandResult> {
    return this.post<CommandResult>('/command', { cmd, params });
  }

  async releaseHold(): Promise<CommandResult> {
    return this.executeCommand('release_hold');
  }

  async openShort(asset: string, price: number, qty: number, leverage: number = 1): Promise<CommandResult> {
    return this.executeCommand('open_short', { asset, price, qty, leverage });
  }

  async verifyIdentity(claim: string): Promise<CommandResult> {
    return this.executeCommand('verify_identity', { claim });
  }

  async getDriftReport(): Promise<CommandResult> {
    return this.executeCommand('drift_report');
  }

  // Real-time WebSocket connection
  connectWebSocket(onMessage?: (data: unknown) => void): WebSocket | null {
    if (typeof window === 'undefined') return null;
    
    const wsUrl = this.baseUrl.replace(/^http/, 'ws').replace(/\/api$/, '/ws');
    this.socket = new WebSocket(wsUrl);
    
    this.socket.onopen = () => {
      console.log('[WS] Connected to Sovereign Nexus');
      this.socket?.send(JSON.stringify({ type: 'auth', token: this.apiSecret }));
    };
    
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('[WS] Event:', data);
      onMessage?.(data);
    };
    
    this.socket.onerror = (error) => {
      console.error('[WS] Error:', error);
    };
    
    this.socket.onclose = () => {
      console.log('[WS] Disconnected from Nexus');
    };
    
    return this.socket;
  }

  disconnect(): void {
    this.socket?.close();
  }
}

// Singleton instance for client-side usage
let clientInstance: SovereignAPIClient | null = null;

export function getSovereignClient(): SovereignAPIClient {
  if (!clientInstance) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
    const secret = process.env.NEXT_PUBLIC_API_SECRET || '';
    clientInstance = new SovereignAPIClient(baseUrl, secret);
  }
  return clientInstance;
}
