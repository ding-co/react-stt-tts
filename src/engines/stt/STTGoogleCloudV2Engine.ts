import type { STTEngine, STTResult, STTConfig } from "@/types/stt";

// TODO: Not implemented yet (Coming soon)
export default class STTGoogleCloudV2Engine implements STTEngine {
  private config: STTConfig;
  private resultCallback: ((result: STTResult) => void) | null = null;
  private errorCallback: ((err: Error) => void) | null = null;

  constructor(config: STTConfig) {
    this.config = config;
  }

  async start() {
    // Actual Google Cloud STT integration will be implemented later
    setTimeout(() => {
      this.resultCallback?.({
        text: "Google Cloud STT mock result",
        isFinal: true,
      });
    }, 1000);
  }

  async stop() {
    // Actual Google Cloud STT stop logic
    console.log("Google Cloud STT stop");
  }

  onResult(cb: (result: STTResult) => void) {
    this.resultCallback = cb;
  }

  onError(cb: (err: Error) => void) {
    this.errorCallback = cb;
  }
}
