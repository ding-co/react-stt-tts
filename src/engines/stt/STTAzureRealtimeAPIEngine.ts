import type { STTEngine, STTResult, STTConfig } from "@/types/stt";

// TODO: Not implemented yet (Coming soon)
export default class STTAzureRealtimeAPIEngine implements STTEngine {
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
    // Actual Azure Realtime API integration will be implemented later
    setTimeout(() => {
      this.resultCallback?.({
        text: "Azure Realtime API mock result",
        isFinal: true,
      });
    }, 1000);
  }

  async stop() {
    // Actual Azure Realtime API stop logic
    console.log("Azure Realtime API stop");
  }
}
