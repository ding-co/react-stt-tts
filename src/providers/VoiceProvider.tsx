import { createContext, useContext, type ReactNode } from "react";
import type { STTConfig } from "@/types/stt";
import type { TTSConfig } from "@/types/tts";

interface VoiceContextType {
  sttConfig: STTConfig | null;
  ttsConfig: TTSConfig | null;
}

const VoiceContext = createContext<VoiceContextType | null>(null);

interface VoiceProviderProps {
  sttConfig?: STTConfig;
  ttsConfig?: TTSConfig;
  children: ReactNode;
}

export const VoiceProvider = ({ sttConfig, ttsConfig, children }: VoiceProviderProps) => {
  const value = {
    sttConfig: sttConfig ?? null,
    ttsConfig: ttsConfig ?? null,
  };

  return <VoiceContext.Provider value={value}>{children}</VoiceContext.Provider>;
};

export const useVoiceConfig = () => {
  const context = useContext(VoiceContext);

  if (!context) {
    throw new Error("useVoiceConfig must be used within a VoiceProvider.");
  }

  return context;
};

export const useSTTConfig = () => {
  const { sttConfig } = useVoiceConfig();

  if (!sttConfig) {
    throw new Error("STT config is not provided. Make sure to pass sttConfig to VoiceProvider.");
  }

  return sttConfig;
};

export const useTTSConfig = () => {
  const { ttsConfig } = useVoiceConfig();

  if (!ttsConfig) {
    throw new Error("TTS config is not provided. Make sure to pass ttsConfig to VoiceProvider.");
  }

  return ttsConfig;
};
