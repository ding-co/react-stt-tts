import { useState, useCallback, useRef, useEffect } from "react";
import { useSTTConfig } from "@/providers/VoiceProvider";
import STTFactory from "@/services/STTFactory";
import type { STTEngine, STTHookResult, STTResult } from "@/types/stt";

export const useSTT = (): STTHookResult => {
  const { sttConfig } = useSTTConfig();

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
    engineRef.current = STTFactory.create(sttConfig.model, sttConfig);
    engineRef.current.onResult(setResult);
    engineRef.current.onError(setError);
  }, [sttConfig.model, sttConfig]);

  return {
    start,
    stop,
    result,
    isListening,
    error,
  };
};
