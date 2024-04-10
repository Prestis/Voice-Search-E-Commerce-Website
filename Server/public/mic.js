//Voice recording 
const mic_btn = document.querySelector('#voiceButton');
//console.log(mic_btn.id);
mic_btn.addEventListener("click", ToggleMic);
let can_record = false;
let is_recording = false;
let recorder = null;
let chunks = [];
let audioBlob = '';
let transcribtion = '';


function SetupAudio() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({
                audio: true
            })
            .then(SetupStream)
            .catch(err => {
                console.error(err) 
            });
    }    
}

SetupAudio();

function SetupStream(stream) {
    console.log("Setup Stream");
    recorder = new MediaRecorder(stream);

    recorder.ondataavailable = e => {
        chunks.push(e.data);
    }
    
    recorder.onstop = e => {
        const audioBlob = new Blob(chunks, { type: "audio/mp4"});
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        let file = new File([audioUrl], "recorded_audio.mp3",{type:"audio/mp3", lastModified:new Date().getTime()});
        console.log(file);

        handleSubmitRecording;
        chunks = [];
    }


    const handleSubmitRecording = async () => {
        try{
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64String = reader.result.split(',')[1]; // Extract base64 data from the result
                const res = await fetch('http://localhost:3000/api/openai/transcriber',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ audioBuffer: base64String, lang: "en" })
                })
                const data = await res.json();
                setTranscription(data);
                console.log(transcribtion);
            };
            reader.readAsDataURL(audioBlob);
        }
        catch(error){
            console.log(error)
        }
    }

    console.log("Stream ready");
    can_record = 'true';
}


function ToggleMic(){
    console.log('Mic Pressed');
    if(!can_record) return;
    //let mic = document.querySelector('#voiceButton');
    is_recording = !is_recording;

    if(is_recording){
        recorder.start();
        //document.querySelector('#voiceButton').style.color = 'red'
        //Add css to show the recording started
    }else {
        recorder.stop();
        //document.querySelector('#voiceButton').style.color = 'blue'
        //Add css to show the recording has stopped
    }
}
