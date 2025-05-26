import {
  STTWebSpeechEngine,
  STTAzureSpeechSDKEngine,
  STTAzureRealtimeAPIEngine,
  STTGoogleCloudEngine,
  STTReturnZeroEngine,
} from "@/engines/stt";
import type { STTConfig, STTEngine, STTModel } from "@/types/stt";

export default class STTFactory {
  static create(model: STTModel, config: STTConfig): STTEngine {
    switch (model) {
      case "web-speech-recognition":
        return new STTWebSpeechEngine(config);
      case "azure-speech-sdk":
        return new STTAzureSpeechSDKEngine(config);
      case "azure-realtime-api":
        return new STTAzureRealtimeAPIEngine(config);
      case "google-cloud":
        return new STTGoogleCloudEngine(config);
      case "return-zero":
        return new STTReturnZeroEngine(config);
      default:
        throw new Error("Not supported STT model.");
    }
  }
}
