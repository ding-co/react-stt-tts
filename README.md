# react-stt-tts

React based Speech-to-Text and Text-to-Speech library with multiple engine support.

## Features

- Multiple STT (Speech-to-Text) engines support:
  - Web Speech API - Speech Recognition (Browser built-in) ✅
  - Microsoft Azure Speech SDK (Coming soon)
  - Microsoft Azure Realtime API (Coming soon)
  - Google Cloud STT (Coming soon)
  - Return Zero (Coming soon)
- Multiple TTS (Text-to-Speech) engines support:
  - Web Speech API - Speech Synthesis (Browser built-in) ✅
  - Microsoft Azure Speech SDK (Coming soon)
  - Google Cloud TTS (Coming soon)
  - Naver Clova (Coming soon)
- React hooks for easy integration
- TypeScript support
- Tree-shakeable

## Installation

```bash
npm install react-stt-tts
# or
yarn add react-stt-tts
# or
pnpm add react-stt-tts
```

## Samples - [StackBlitz](https://stackblitz.com/edit/vitejs-vite-luuiqllo?file=src%2FApp.tsx)

## Usage

### Basic Usage with Web Speech API

```tsx
import { VoiceProvider, useSTT, useTTS } from "react-stt-tts";

// STT Configuration
const sttConfig = {
  model: "web-speech-recognition",
  language: "ko-KR", // Korean
  continuous: true, // Continuous recognition
  interimResults: true, // Show interim results
};

// TTS Configuration
const ttsConfig = {
  model: "web-speech-synthesis",
  language: "ko-KR", // Korean
  rate: 1, // Speaking rate
  pitch: 1, // Pitch
  volume: 1, // Volume
};

function App() {
  return (
    <VoiceProvider sttConfig={sttConfig} ttsConfig={ttsConfig}>
      <YourComponent />
    </VoiceProvider>
  );
}

function YourComponent() {
  // Using STT hook
  const { start, stop, result, isListening, error } = useSTT();
  // Using TTS hook
  const { speak, stop: stopTTS, isSpeaking, error: ttsError } = useTTS();

  return (
    <div>
      {/* STT Controls */}
      <button onClick={start} disabled={isListening}>
        Start Speech Recognition
      </button>
      <button onClick={stop} disabled={!isListening}>
        Stop Speech Recognition
      </button>
      <div>Recognition Result: {result?.text}</div>

      {/* TTS Controls */}
      <button onClick={() => speak("Hello!")} disabled={isSpeaking}>
        Speak
      </button>
      <button onClick={stopTTS} disabled={!isSpeaking}>
        Stop
      </button>
    </div>
  );
}
```

## API Reference

### VoiceProvider Props

| Prop      | Type      | Description                      |
| --------- | --------- | -------------------------------- |
| sttConfig | STTConfig | STT initial engine configuration |
| ttsConfig | TTSConfig | TTS initial engine configuration |
| children  | ReactNode | React child components           |

### useVoiceConfig Hook

```typescript
const {
  sttConfig, // Current STT configuration
  ttsConfig, // Current TTS configuration
  setSTTConfig, // Function to update STT configuration
  setTTSConfig, // Function to update TTS configuration
} = useVoiceConfig();
```

### useSTTConfig Hook

```typescript
const {
  sttConfig, // Current STT configuration
  setSTTConfig, // Function to update STT configuration
} = useSTTConfig();
```

### useTTSConfig Hook

```typescript
const {
  ttsConfig, // Current TTS configuration
  setTTSConfig, // Function to update TTS configuration
} = useTTSConfig();
```

### useSTT Hook

```typescript
const {
  start, // Start speech recognition
  stop, // Stop speech recognition
  result, // Recognition result
  isListening, // Whether listening
  error, // Error
} = useSTT();
```

### useTTS Hook

```typescript
const {
  speak, // Read text
  stop, // Stop reading
  isSpeaking, // Whether speaking
  error, // Error
} = useTTS();
```

## License

MIT
