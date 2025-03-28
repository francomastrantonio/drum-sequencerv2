const buttons = document.querySelectorAll("button");
buttons.forEach((button) => button.addEventListener("click", playSample));

const bpmElement = document.getElementById("bpm");
const bpmValue = bpmElement.addEventListener('change', modifyBPM);

export const getBPM = (inputBpm: number) => {
    return (60000 / inputBpm) / 4;
}

let kickArray = [0,0,0,0,0,0,0,0];
let clapArray = [0,0,0,0,0,0,0,0];
let tomLowArray = [0,0,0,0,0,0,0,0];
let hiHatArray = [0,0,0,0,0,0,0,0];
let shakeArray = [0,0,0,0,0,0,0,0];
let stepSequencer = 0;
let playing;
let kickInputs;
let stepCursor;

function modifyBPM(){
    if(bpm != (60000 / bpmElement['value']) / 4)
    bpm = (60000 / bpmElement['value']) / 4;
}

function cleanCheckbox(check){
    const deleteCheck = check;
    deleteCheck.checked = false;
}

function setDemo(){
    kickArray = [1,0,0,0,1,0,0,0];
    clapArray = [0,0,0,0,1,0,0,0];
    tomLowArray = [0,0,0,1,0,0,1,0];
    hiHatArray = [0,0,1,0,0,0,1,0];
    shakeArray = [0,1,0,1,0,1,0,1];

    for(let i=0 ; i < 8; i++){
        
        if(kickArray[i] == 1){
            const stepCheckbox = document.querySelector(`input[id='kickStep'][data-stepnum='${i+1}']`);            
            stepCheckbox.checked = true;
        }else{
            const stepCheckbox = document.querySelector(`input[id='kickStep'][data-stepnum='${i+1}']`);            
            stepCheckbox.checked = false;
        }
        
        if(clapArray[i] == 1){
            const stepCheckbox = document.querySelector(`input[id='clapStep'][data-stepnum='${i+1}']`);            
            stepCheckbox.checked = true;
        }else{
            const stepCheckbox = document.querySelector(`input[id='clapStep'][data-stepnum='${i+1}']`);            
            stepCheckbox.checked = false;
        }

        if(shakeArray[i] == 1){
            const stepCheckbox = document.querySelector(`input[id='shakeStep'][data-stepnum='${i+1}']`);            
            stepCheckbox.checked = true;
        }else{
            const stepCheckbox = document.querySelector(`input[id='shakeStep'][data-stepnum='${i+1}']`);            
            stepCheckbox.checked = false;
        }
        if(hiHatArray[i] == 1){
            const stepCheckbox = document.querySelector(`input[id='hiHatStep'][data-stepnum='${i+1}']`);            
            stepCheckbox.checked = true;
        }else{
            const stepCheckbox = document.querySelector(`input[id='hiHatStep'][data-stepnum='${i+1}']`);            
            stepCheckbox.checked = false;
        }

        if(tomLowArray[i] == 1){
            const stepCheckbox = document.querySelector(`input[id='tomLowStep'][data-stepnum='${i+1}']`);            
            stepCheckbox.checked = true;
        }else{
            const stepCheckbox = document.querySelector(`input[id='tomLowStep'][data-stepnum='${i+1}']`);            
            stepCheckbox.checked = false;
        }
        
    }
}

function playSample(event) {
    const button = event.target;
    const sample = button.dataset.sample;

    if(sample == 'sequencer'){
        clearInterval(playing);
        playing = setInterval(sequencer, bpm);
        stepSequencer = 0;
    }else if(sample == 'sequencerDemo'){
        clearInterval(playing);
        setDemo();
    }else if(sample == 'sequencerStop'){
        clearInterval(playing);
        stepSequencer = 0;
    }else if(sample == 'sequencerClean'){
        clearInterval(playing);
        stepSequencer = [];
        kickArray = [];
        clapArray = [];
        tomLowArray = [];
        hiHatArray = [];
        shakeArray = [];
        checkbox.forEach((check) => cleanCheckbox(check));
    }else{
        const sampleSound = document.getElementById(`sound${sample}`);
        sampleSound.currentTime = 0;
        sampleSound.play();
        console.log("Probando "+ sample);
    }
}

function playSampleSequence(sample) {
    const sampleSound = document.getElementById(`sound${sample}`);

    sampleSound.currentTime = 0;
    sampleSound.play();
}

function sequencer(){
        console.log("stepSequencer: ",stepSequencer+1);
        if(kickArray[stepSequencer] == 1){
        console.log("sondandoKick");
        playSampleSequence("kick");    
        }

        if(clapArray[stepSequencer] == 1){
        console.log("sondandoClap");
        playSampleSequence("clap");
        }

        if(hiHatArray[stepSequencer] == 1){
            console.log("sondandoHihat");
            playSampleSequence("hihat");
            }
            
        if(shakeArray[stepSequencer] == 1){
            console.log("sondandoShake");
            playSampleSequence("shake");
            }
            
        if(tomLowArray[stepSequencer] == 1){
            console.log("sondandoTomLow");
            playSampleSequence("tom_low");
            }

        if(stepSequencer <7)
        stepSequencer ++;
        else
        stepSequencer = 0;

}