import { useState, useCallback, useRef, useEffect } from "react";
import { useSTTConfig } from "../providers/STTProvider";
import {
  STTWebSpeechEngine,
  STTAzureSpeechSDKEngine,
  STTAzureRealtimeAPIEngine,
  STTGoogleCloudEngine,
  STTReturnZeroEngine,
} from "@/engines/stt";
import type { STTConfig, STTEngine, STTHookResult, STTModel, STTResult } from "@/types/stt";

const getEngine = (model: STTModel, config: STTConfig): STTEngine => {
  switch (model) {
    case "web-speech":
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
};

export const useSTT = (): STTHookResult => {
  const { config } = useSTTConfig();

  const [result, setResult] = useState<STTResult | null>(null);
  const [isListening, setListening] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const engineRef = useRef<STTEngine | null>(null);

  const start = useCallback(async () => {
    setListening(true);
    await engineRef.current?.start();
  }, []);

  const stop = useCallback(async () => {
    setListening(false);
    await engineRef.current?.stop();
  }, []);

  useEffect(() => {
    engineRef.current = getEngine(config.model, config);
    engineRef.current.onResult(setResult);
    engineRef.current.onError(setError);
  }, [config.model, config]);

  return {
    start,
    stop,
    result,
    isListening,
    error,
  };
};
