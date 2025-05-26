import {
  TTSWebSpeechEngine,
  TTSAzureSpeechSDKEngine,
  TTSGoogleCloudEngine,
  TTSNaverClovaEngine,
} from "@/engines/tts";
import type { TTSConfig, TTSEngine, TTSModel } from "@/types/tts";

export default class TTSFactory {
  static create(model: TTSModel, config: TTSConfig): TTSEngine {
    switch (model) {
      case "web-speech-synthesis":
        return new TTSWebSpeechEngine(config);
      case "azure-speech-sdk":
        return new TTSAzureSpeechSDKEngine(config);
      case "google-cloud":
        return new TTSGoogleCloudEngine(config);
      case "naver-clova":
        return new TTSNaverClovaEngine(config);
      default:
        throw new Error("Not supported TTS model.");
    }
  }
}
