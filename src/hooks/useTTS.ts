import { useState, useCallback, useRef, useEffect } from "react";
import { useTTSConfig } from "../providers/TTSProvider";
import {
  TTSWebSynthesisEngine,
  TTSAzureSpeechSDKEngine,
  TTSGoogleCloudEngine,
  TTSNaverClovaEngine,
} from "@/engines/tts";
import type { TTSConfig, TTSEngine, TTSHookResult, TTSModel, TTSResult } from "@/types/tts";

const getEngine = (model: TTSModel, config: TTSConfig): TTSEngine => {
  switch (model) {
    case "web-synthesis":
      return new TTSWebSynthesisEngine(config);
    case "azure-speech-sdk":
      return new TTSAzureSpeechSDKEngine(config);
    case "google-cloud":
      return new TTSGoogleCloudEngine(config);
    case "naver-clova":
      return new TTSNaverClovaEngine(config);
    default:
      throw new Error("Not supported TTS model.");
  }
};

export const useTTS = (): TTSHookResult => {
  const { config } = useTTSConfig();

  const [isSpeaking, setSpeaking] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const engineRef = useRef<TTSEngine | null>(null);

  useEffect(() => {
    engineRef.current = getEngine(config.model, config);
    engineRef.current.onError(setError);
  }, [config.model, config]);

  const speak = useCallback(async (text: string): Promise<TTSResult> => {
    setSpeaking(true);
    const result = await engineRef.current?.speak(text);
    setSpeaking(false);
    if (!result) {
      throw new Error("Not existed TTS result.");
    }
    return result;
  }, []);

  const stop = useCallback(async () => {
    setSpeaking(false);
    await engineRef.current?.stop();
  }, []);

  return {
    speak,
    stop,
    isSpeaking,
    error,
  };
};
