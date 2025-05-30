'use client'
import { useEffect, useRef, useState } from "react"
import { SecuencerProps } from "@/types";
import { useAudioSequencer } from "@/contexts/AudioSequencerContext";
import { SequencerInput } from "./SequencerInput";

export const Sequencer: React.FC<SecuencerProps> = ({ steps, samplesData, setSteps}) =>{
    const { startSeq, resetSeq, pauseSeq, isRunningSeq, indexSeq } = useAudioSequencer()
    const [bpm, setBpm] = useState(120)
    let arraySteps = new Array(steps)
    for(let i=0 ; i < arraySteps.length ; i++){
        arraySteps[i] = i+1
    }

    return (
    <div className="flex-col bg-gray-300 p-4 rounded-lg">
        <div id='controller' className="flex flex-row items-center">
            <button className="bg-slate-500 p-2 rounded-lg my-4 mr-4" onClick={isRunningSeq ? ()=> pauseSeq() : ()=>startSeq()}>
                {isRunningSeq ? 'Pause' : 'Play'}</button>
            <button className="bg-slate-500 p-2 rounded-lg my-4 mr-4" onClick={()=>resetSeq()}>
                Stop
            </button>
            <div className="flex flex-row gap-4">
                <SequencerInput 
                    inputType="BPM" 
                    onChange={(value: number) => setBpm(value)} 
                    inputParams={{ defaultValue: 120, minValue: 0, maxValue: 999}}/>
                <SequencerInput 
                    inputType="Steps"
                    onChange={setSteps} 
                    inputParams={{ defaultValue: 8, minValue: 8, maxValue: 64}}/>
            </div>
        </div>
        <div>
            <div className="flex flex-row ml-[84px]">
            {
                arraySteps.map((step, key)=>{
                    return (
                        <div key={key} className="h-[50px] w-[50px] flex items-center justify-center mr-2">
                            <span className={`font-bold text-xl ${indexSeq +1 === step ? 'text-amber-600' : 'text-black'}`}>{step}</span>
                        </div>
                        )
                })
            }
            </div>
            {
                samplesData.map((sample)=>{
                    return(
                        <SequencerChannel key={sample.sampleName} steps={steps} sampleInfo={sample} />
                    )
                })
            }
        </div>
    </div>   
    )
}

const SequencerChannel = (props: any) => {
    const { indexSeq } = useAudioSequencer()
    const audioRef = useRef<HTMLAudioElement | null>(null);
    function repetirArray(arr: Array<number>, n: number) {
        return [].concat(...Array(n).fill(arr));
    }
      
    const miArray = props.sampleInfo.secuence;
    const veces = props.steps / props.sampleInfo.secuence.length;
    
    const handlePlay = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }

    return (
        <div className="flex flex-row mb-4">
            <audio ref={audioRef} src={`/samples/${props.sampleInfo.sampleName}.wav`} />
            <div className="flex flex-row items-center">
                <span className="mr-4 text-black w-[70px]">{props.sampleInfo.sampleName}</span>
                {
                    repetirArray(miArray, veces).map((step: boolean, index: number) => {
                        return <StepSequencer index={index} key={`${props.sampleInfo.sampleName}-step${index}`} pressed={step} actualStep={index === indexSeq} handlePlay={handlePlay} />
                    })
                }
                </div>
        </div>
    )
}

const StepSequencer = (props: any) => {
    const [pressed, setPressed] = useState(props.pressed)
    
    useEffect(()=>{
        (props.actualStep && pressed) && props.handlePlay()
    }, [props.actualStep])

    return (
        <div id={`step${props.index}`} className={`h-[50px] w-[50px] flex items-center justify-center mr-2 rounded-sm hover:opacity-90 
            ${pressed ? 'border-t-4 border-l-4 border-gray-700 bg-blue-400' : 'bg-blue-700 border-r-4 border-b-4 border-gray-500'}`
            } onClick={()=>setPressed(!pressed)}>
                {
                    props.actualStep && <div className="flex rounded-full h-[40px] w-[40px] bg-[radial-gradient(circle,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0)_70%)]" />
                }
        </div>    
        )
}

