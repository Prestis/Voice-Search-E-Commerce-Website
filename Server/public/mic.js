//Voice recording 
const mic_btn = document.querySelector('#voiceButton');
mic_btn.addEventListener("click", ToggleMic);
let can_record = false;
let is_recording = false;
let recorder = null;
let chunks = [];
let audioBlob = '';
let transcribtion = '';
let voiceSearchResponse = '';


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
        const audioBlob = new Blob(chunks, { type: 'audio/mp3'});
        const audioUrl = window.URL.createObjectURL(audioBlob);
        console.log('Blob size:', audioBlob.size);
        console.log('Blob type:', audioBlob.type);
        chunks = [];
        transcribeRecording(audioBlob, audioUrl);
        
    }


    console.log("Stream ready");
    can_record = 'true';
}

async function transcribeRecording(audioBlob,audioUrl){
    console.log('Posting audio');

    const formData = new FormData();
    formData.set('audio',audioBlob);
    
    // Log FormData contents
    formData.forEach((value, key) => {
        console.log(`${key}:`, value);
    });

    const options = {
        method: 'POST',
        body: formData,
    };

    console.time('Request Duration'); // Start timing
    //Send audio form to backend
    try {
        voiceSearchResponse = await fetch('/postAudio',options);
        //console.log(response);
        if (voiceSearchResponse.ok) {
            console.log('Audio file uploaded successfully');
            //console.log(voiceSearchResponse);
            window.location.href = "http://localhost:3000/product.html";
          } else {
            console.error('Failed to upload audio file');
          }
    }catch(error){
        console.error('Error uploading audio file:', error);
    }
    console.timeEnd('Request Duration'); // End timing and log the result
}

function ToggleMic(){
    console.log('Mic Pressed');
    if(!can_record) return;
    is_recording = !is_recording;

    if(is_recording){
        recorder.start();
    }else {
        recorder.stop();
    }
}
