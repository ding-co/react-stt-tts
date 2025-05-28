import type { TTSEngine, TTSResult, TTSConfig } from "@/types/tts";

export default class TTSWebSpeechEngine implements TTSEngine {
  private config: TTSConfig;
  private errorCallback: ((err: Error) => void) | null = null;
  constructor(config: TTSConfig) {
    this.config = config;
  }

  onError(cb: (err: Error) => void) {
    this.errorCallback = cb;
  }

  async speak(text: string): Promise<TTSResult> {
    if (!("speechSynthesis" in window)) {
      this.errorCallback?.(new Error("Speech synthesis is not supported in this browser."));
      throw new Error("Speech synthesis is not supported in this browser.");
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.config.language || "ko-KR";
    utterance.voice = this.config.voice
      ? window.speechSynthesis.getVoices().find((voice) => voice.name === this.config.voice) || null
      : null;
    utterance.pitch = this.config.pitch || 1;
    utterance.rate = this.config.rate || 1;
    utterance.volume = this.config.volume || 1;
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      utterance.onend = () => {
        resolve({
          audio: new Blob([], { type: "audio/wav" }),
          text,
          duration: Date.now() - startTime,
        });
      };
      utterance.onerror = (event) => {
        this.errorCallback?.(new Error("Speech synthesis error"));
        reject(new Error("Speech synthesis error"));
      };
      window.speechSynthesis.speak(utterance);
    });
  }

  async stop() {
    window.speechSynthesis.cancel();
  }
}
