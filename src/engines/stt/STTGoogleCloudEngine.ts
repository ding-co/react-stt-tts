import type { STTEngine, STTResult, STTConfig } from "@/types/stt";

// TODO: Not implemented yet (Coming soon)
export default class STTGoogleCloudEngine implements STTEngine {
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
}
