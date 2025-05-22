import type { STTEngine, STTResult, STTConfig } from "@/types/stt";

export default class STTWebSpeechEngine implements STTEngine {
  private recognition: SpeechRecognition | null = null;
  private resultCallback: ((result: STTResult) => void) | null = null;
  private errorCallback: ((err: Error) => void) | null = null;
  private config: STTConfig;

  constructor(config: STTConfig) {
    this.config = config;
  }

  onResult(cb: (result: STTResult) => void) {
    this.resultCallback = cb;
  }

  onError(cb: (err: Error) => void) {
    this.errorCallback = cb;
  }

  async start() {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      this.errorCallback?.(new Error("Speech recognition is not supported in this browser."));
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();

    if (!this.recognition) {
      this.errorCallback?.(new Error("Speech recognition is not supported in this browser."));
      return;
    }

    this.recognition.lang = this.config.language || "ko-KR";
    this.recognition.continuous = this.config.continuous || false;
    this.recognition.interimResults = this.config.interimResults || false;
    this.recognition.maxAlternatives = this.config.maxAlternatives || 1;
    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      const last = event.results.length - 1;
      const transcript = event.results[last][0].transcript;
      const confidence = event.results[last][0].confidence;
      const isFinal = event.results[last].isFinal;
      this.resultCallback?.({
        text: transcript,
        isFinal,
        confidence,
        alternatives: Array.from(event.results[last]).map(
          (result: SpeechRecognitionAlternative) => result.transcript,
        ),
      });
    };
    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      this.errorCallback?.(new Error(`Speech recognition error: ${event.error}`));
    };
    this.recognition.start();
  }

  async stop() {
    this.recognition?.stop();
  }
}
