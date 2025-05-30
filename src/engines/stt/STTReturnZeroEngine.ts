import type { STTEngine, STTResult, STTConfig } from "@/types/stt";

// TODO: Not implemented yet (Coming soon)
export default class STTReturnZeroEngine implements STTEngine {
  private config: STTConfig;
  private resultCallback: ((result: STTResult) => void) | null = null;
  private errorCallback: ((err: Error) => void) | null = null;

  constructor(config: STTConfig) {
    this.config = config;
  }

  async start() {
    // Actual Return Zero integration will be implemented later
    setTimeout(() => {
      this.resultCallback?.({
        text: "Return Zero mock result",
        isFinal: true,
      });
    }, 1000);
  }

  async stop() {
    // Actual Return Zero stop logic will be implemented later
    console.log("Return Zero stop");
  }

  onResult(cb: (result: STTResult) => void) {
    this.resultCallback = cb;
  }

  onError(cb: (err: Error) => void) {
    this.errorCallback = cb;
  }
}
