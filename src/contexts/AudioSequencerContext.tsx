import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";

interface AudioSequencerContextProps {
  indexSeq: number;
  startSeq: () => void;
  pauseSeq: () => void;
  resetSeq: () => void;
  changeBPM: (value: number) => void;
  isRunningSeq: boolean;
}

const AudioSequencerContext = createContext<AudioSequencerContextProps | undefined>(undefined);

export const AudioSequencerProvider = ({ totalPositions, children }: { 
  totalPositions: number; 
  children: React.ReactNode; 
}) => {
  const [indexSeq, setIndexSeq] = useState(-1);
  const [isRunningSeq, setIsRunningSeq] = useState(false);
  const [intervalMs, setIntervalMs] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const changeBPM = (value: number) => {
    setIntervalMs(getBPM(value))
  }

  const startSeq = useCallback(() => {
    if (!isRunningSeq) setIsRunningSeq(true);
  }, [isRunningSeq]);

  const pauseSeq = useCallback(() => {
    if (isRunningSeq) setIsRunningSeq(false);
  }, [isRunningSeq]);

  const resetSeq = useCallback(() => {
    setIsRunningSeq(false);
    setIndexSeq(-1);
  }, []);

  useEffect(() => {
    if (isRunningSeq) {
      intervalRef.current = setInterval(() => {
        setIndexSeq((prev) => (prev + 1) % totalPositions);
      }, intervalMs);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunningSeq, totalPositions, intervalMs]);

  return (
    <AudioSequencerContext.Provider value={{ indexSeq, startSeq, pauseSeq, resetSeq, isRunningSeq, changeBPM }}>
      {children}
    </AudioSequencerContext.Provider>
  );
};

export const useAudioSequencer = () => {
  const context = useContext(AudioSequencerContext);
  if (!context) {
    throw new Error("useAudioSequencer debe usarse dentro de un AudioSequencerProvider");
  }
  return context;
};

const getBPM = (inputBpm: number) => {
  return (60000 / inputBpm) / 4;
}