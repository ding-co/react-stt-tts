export type TTSModel = "web-synthesis" | "azure-speech-sdk" | "google-cloud" | "naver-clova";

export interface TTSConfig {
  model: TTSModel;
  apiKey?: string;
  voice?: string;
  language?: string;
  pitch?: number;
  rate?: number;
  volume?: number;
}

export interface TTSEngine {
  speak(text: string): Promise<TTSResult>;
  stop(): Promise<void>;
  onError(cb: (err: Error) => void): void;
}

export interface TTSResult {
  audio: Blob;
  text: string;
  duration: number;
}

export interface TTSHookResult {
  speak: (text: string) => Promise<TTSResult>;
  stop: () => Promise<void>;
  isSpeaking: boolean;
  error: Error | null;
}
