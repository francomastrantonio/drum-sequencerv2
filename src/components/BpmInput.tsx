import { useAudioSequencer } from "@/contexts/AudioSequencerContext";
import { useEffect, useState } from "react";

const BpmInput = ({ onChange }: { onChange: (bpm: number) => void }) => {
  const [bpm, setBpm] = useState(120); // Valor inicial
  const { changeBPM } = useAudioSequencer()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);

    // Restringe el valor dentro del rango 0 - 999
    if (isNaN(value)) value = 0;
    if (value > 999) value = 999;
    if (value < 0) value = 0;

    setBpm(value);
    onChange(value);
  };

  useEffect(()=> {
    changeBPM(bpm)
  }, [bpm])

  return (
    <div className="flex flex-row items-center gap-2 rounded-lg border-2 h-[40px] border-gray-500">
      <label htmlFor="bpm" className="text-lg text-gray-500 ml-2">
        BPM
      </label>
      <input
        id="bpm"
        type="number"
        value={bpm}
        onChange={handleChange}
        min="0"
        max="999"
        className="w-[50px] text-center rounded-md p-2 focus:outline-none text-lg text-gray-500
          [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
    </div>
  );
};

export default BpmInput;
