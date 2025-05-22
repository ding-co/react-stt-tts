import { createContext, useContext, type ReactNode } from "react";
import type { TTSConfig } from "@/types/tts";

interface TTSContextType {
  config: TTSConfig;
}

const TTSContext = createContext<TTSContextType | null>(null);

interface TTSProviderProps {
  config: TTSConfig;
  children: ReactNode;
}

export const TTSProvider = ({ config, children }: TTSProviderProps) => {
  return <TTSContext.Provider value={{ config }}>{children}</TTSContext.Provider>;
};

export const useTTSConfig = () => {
  const context = useContext(TTSContext);

  if (!context) {
    throw new Error("useTTSConfig must be used within a TTSProvider");
  }

  return context;
};
