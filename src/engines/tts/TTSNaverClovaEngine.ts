import type { TTSEngine, TTSResult, TTSConfig } from "@/types/tts";

// TODO: Not implemented yet (Coming soon)
export default class TTSNaverClovaEngine implements TTSEngine {
  private config: TTSConfig;
  private errorCallback: ((err: Error) => void) | null = null;
  constructor(config: TTSConfig) {
    this.config = config;
  }

  speak(text: string): Promise<TTSResult> {
    return Promise.resolve({
      audio: new Blob(),
      text,
      duration: 0,
    });
  }

  stop(): Promise<void> {
    return Promise.resolve();
  }

  onError(cb: (err: Error) => void): void {
    this.errorCallback = cb;
  }
}
