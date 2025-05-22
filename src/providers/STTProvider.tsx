import { createContext, useContext, type ReactNode } from "react";
import type { STTConfig } from "@/types/stt";

interface STTContextType {
  config: STTConfig;
}

const STTContext = createContext<STTContextType | null>(null);

interface STTProviderProps {
  config: STTConfig;
  children: ReactNode;
}

export const STTProvider = ({ config, children }: STTProviderProps) => {
  return <STTContext.Provider value={{ config }}>{children}</STTContext.Provider>;
};

export const useSTTConfig = () => {
  const context = useContext(STTContext);

  if (!context) {
    throw new Error("useSTTConfig must be used within a STTProvider");
  }

  return context;
};
