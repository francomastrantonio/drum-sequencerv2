import { useAudioSequencer } from "@/contexts/AudioSequencerContext";
import { InputParams, SequencerInputProps } from "@/types";
import { useEffect, useState } from "react";

const STEPS_OPTIONS = [8, 16, 32, 64];

export const SequencerInput = (props: SequencerInputProps) => {
  const { minValue, maxValue, defaultValue }: InputParams = props.inputParams
  const { changeBPM } = useAudioSequencer()
  const typeInput = props.inputType
  const [inputValue, setInputValue] = useState(defaultValue); // Valor inicial


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10)

    if (isNaN(value)) value = 0
    if (value > maxValue) value = maxValue
    if (value < minValue) value = minValue

    setInputValue(value)
    props.onChange(value)
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10)
    setInputValue(value)
    props.onChange(value)
  }

  useEffect(()=> {
    if (typeInput === "BPM") {
      changeBPM(inputValue);
    }
  }, [inputValue])
  
  return (
    <div className="flex flex-row items-center gap-2 rounded-lg border-2 h-[40px] border-gray-500">
      <label htmlFor={typeInput} className="text-lg text-gray-500 ml-2">
        {typeInput}
      </label>
      {typeInput === "Steps" ? (
        <select
          id={`${typeInput}Input`}
          value={inputValue}
          onChange={handleSelectChange}
          className="w-[70px] text-center rounded-md p-2 focus:outline-none text-lg text-gray-500"
        >
          {STEPS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={`${typeInput}-input`}
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          min={minValue}
          max={maxValue}
          className="w-[50px] text-center rounded-md p-2 focus:outline-none text-lg text-gray-500
            [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      )}
    </div>
  );
};

