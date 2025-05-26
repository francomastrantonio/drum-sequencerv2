export const getBPM = (inputBpm: number) => {
    return (60000 / inputBpm) / 4;
}