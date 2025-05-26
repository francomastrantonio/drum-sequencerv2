'use client'
import { Sequencer } from "@/components/Sequencer";
import { useState } from "react";
import { AudioSequencerProvider } from "@/contexts/AudioSequencerContext";
import libraryJSON from '@/library.json'

export default function Home() {
  const [samplesList, setSamplesList] = useState(libraryJSON.data)
  const [steps, setSteps] = useState(8)

  return (
    <div className="flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex-col">
        <h1 className="text-4xl font-semibold mb-4">Drum machine</h1>
        <AudioSequencerProvider totalPositions={steps}>
          <Sequencer steps={steps} samplesData={samplesList} setSteps={setSteps}/>
        </AudioSequencerProvider>
      </main>
    </div>
  );
}