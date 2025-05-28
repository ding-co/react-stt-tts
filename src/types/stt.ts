export type STTModel = "web-speech" | "azure-speech-sdk" | "google-cloud-v2" | "return-zero";

export interface STTConfig {
  model: STTModel;
  apiKey?: string;
  region?: string;
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
}

export interface STTEngine {
  start(): Promise<void>;
  stop(): Promise<void>;
  onResult(cb: (result: STTResult) => void): void;
  onError(cb: (err: Error) => void): void;
}

export interface STTResult {
  text: string;
  isFinal: boolean;
  confidence?: number;
  alternatives?: string[];
}

export interface STTHookResult {
  start: () => Promise<void>;
  stop: () => Promise<void>;
  result: STTResult | null;
  isListening: boolean;
  error: Error | null;
}
