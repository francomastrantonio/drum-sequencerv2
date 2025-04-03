'use client'
import { Sequencer } from "@/components/Sequencer";
import { useState } from "react";
import { AudioSequencerProvider } from "@/contexts/AudioSequencerContext";
import libraryJSON from '@/library.json'

export default function Home() {
  const [samplesList, setSamplesList] = useState(libraryJSON.data)

  return (
    <div className="flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex-col">
        <h1>Drum machine</h1>
        <AudioSequencerProvider totalPositions={8}>
          <Sequencer steps={8} samplesData={samplesList} />
        </AudioSequencerProvider>
      </main>
    </div>
  );
}