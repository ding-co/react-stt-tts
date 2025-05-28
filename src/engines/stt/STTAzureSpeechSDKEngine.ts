import type { STTEngine, STTResult, STTConfig } from "@/types/stt";

// TODO: Not implemented yet (Coming soon)
export default class STTAzureSpeechSDKEngine implements STTEngine {
  private config: STTConfig;
  private resultCallback: ((result: STTResult) => void) | null = null;
  private errorCallback: ((err: Error) => void) | null = null;

  constructor(config: STTConfig) {
    this.config = config;
  }

  async start() {
    // Actual Azure Speech SDK integration will be implemented later
    setTimeout(() => {
      this.resultCallback?.({
        text: "Azure Speech SDK mock result",
        isFinal: true,
      });
    }, 1000);
  }

  async stop() {
    // Actual Azure Speech SDK stop logic
    console.log("Azure Speech SDK stop");
  }

  onResult(cb: (result: STTResult) => void) {
    this.resultCallback = cb;
  }

  onError(cb: (err: Error) => void) {
    this.errorCallback = cb;
  }
}
