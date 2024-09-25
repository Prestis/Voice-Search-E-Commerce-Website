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
        //console.log('Audio URL is:' + audioUrl)
        //setAudioBlob(audioBlob);
        //let audioFile = new File([audioUrl], "recorded_audio.mp3",{type:"audio/mp3", lastModified:new Date().getTime()});
        //console.log(file);
        //handleSubmitRecording;
        // Log blob size and type
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
    //audioForm.set('audio_data',audioBlob,audioUrl);
    formData.set('audio',audioBlob);
    //audioForm.append('type','mp3');
    
    // Log FormData contents
    formData.forEach((value, key) => {
        console.log(`${key}:`, value);
    });

    // const audioURLinJSON = {
    //     url: audioUrl
    // }

    // console.log('URL in JSON form is:' + audioURLinJSON)

    const options = {
        method: 'POST',
        // cache: 'no-cache',
        // headers: {
        //     'Content-Type': 'multipart/form-data'
        //     //"Content-Type": "audio/mp3"
        //     // 'multipart/form-data'            
        // },
        body: formData,
        //body: JSON.stringify(audioURLinJSON)
    };

    // // Send the FormData using fetch
    // fetch('/postAudio', {
    //     method: 'POST',
    //     body: formData,
    // })
    // .then(response => {
    //     if (!response.ok) {
    //         return response.json().then(errorData => {
    //           throw new Error(`Server error: ${response.status}, ${JSON.stringify(errorData)}`);
    //         });
    //       }
    //     return response.json();
    //   })
    // .then(data => console.log('Success:', data))
    // .catch(error => console.error('Error:', error));

    //Send audio form to backend
    try {
        voiceSearchResponse = await fetch('/postAudio',options);
        //console.log(response);
        if (voiceSearchResponse.ok) {
            console.log('Audio file uploaded successfully');
            console.log(voiceSearchResponse);
            window.location.href = "http://localhost:3000/product.html";
          } else {
            console.error('Failed to upload audio file');
          }
    }catch(error){
        console.error('Error uploading audio file:', error);
    }

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
