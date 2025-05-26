import { Dispatch, SetStateAction } from "react"

export type SecuencerProps = {
    steps: number,
    samplesData: Array<SampleData>,
    setSteps: Dispatch<SetStateAction<number>>
}

export type SampleData = {
    sampleName: string,
    secuence?: Array<boolean> | Array<number> 
}

export type SequencerInputProps = {
    onChange: Function,
    inputType: string,
    inputParams: InputParams
}

export type InputParams = {
    defaultValue: number,
    minValue: number,
    maxValue: number
}