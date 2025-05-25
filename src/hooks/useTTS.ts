import { useState, useCallback, useRef, useEffect } from "react";
import { useTTSConfig } from "@/providers/VoiceProvider";
import TTSFactory from "@/services/TTSFactory";
import type { TTSEngine, TTSHookResult, TTSResult } from "@/types/tts";

export const useTTS = (): TTSHookResult => {
  const { ttsConfig } = useTTSConfig();

  const [isSpeaking, setSpeaking] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const engineRef = useRef<TTSEngine | null>(null);

  useEffect(() => {
    engineRef.current = TTSFactory.create(ttsConfig.model, ttsConfig);
    engineRef.current.onError(setError);
  }, [ttsConfig.model, ttsConfig]);

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
