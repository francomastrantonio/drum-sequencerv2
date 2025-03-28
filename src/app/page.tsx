'use client'
import { Sequencer } from "@/components/Sequencer";
import { useState } from "react";
import { AudioSequencerProvider } from "@/contexts/AudioSequencerContext";

export default function Home() {
  const firstSample = { sampleName: 'kick', secuence: [true, true, true, true, true,false, true, false]}
  const secondSample = {sampleName: 'clap', secuence: [false, true, false, true, false, true,false, true]}
  const [samplesList, setSamplesList] = useState([firstSample, secondSample])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex-col">
        <h1>Drum machine</h1>
        <AudioSequencerProvider totalPositions={8}>
          <Sequencer steps={8} samplesData={samplesList} />
        </AudioSequencerProvider>
      </main>
    </div>
  );
}