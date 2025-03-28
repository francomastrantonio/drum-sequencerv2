export type SecuencerProps = {
    steps: number;
    samplesData: Array<SampleData>;
}

export type SampleData = {
    sampleName: string,
    secuence?: Array<boolean>
}
