const express = require('express');
//const fileUpload = require('express-fileupload')
//const transcribe = require("./openai.js");
const fetch = require('node-fetch');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

//var database = require('')
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const upload = multer({dest: '../uploads/' });

dotenv.config();

//const dbService = require('./dbService');
const databaseService = require('./dbService');


app.use(cors());
app.use(express.json());
app.use(express.static('public'));
// Middleware to handle file uploads
//app.use(fileUpload());

let voiceSearchQuery = '';


//Read data from back-end  
app.get('/getAll',(request,response) =>{
    const db = databaseService.getDbServiceInstance();

    const result = db.getAllData();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));

    //console.log('test');
})
app.get('/getCases',(request,response) =>{
    const db = databaseService.getDbServiceInstance();

    const result = db.getCasesData();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));

    //console.log('test');
})
app.get('/getCPU',(request,response) =>{
    const db = databaseService.getDbServiceInstance();

    const result = db.getCPUData();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));

    //console.log('test');
})
app.get('/getGPU',(request,response) =>{
    const db = databaseService.getDbServiceInstance();

    const result = db.getGPUData();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));

    //console.log('test');
})
app.get('/getMotherboard',(request,response) =>{
    const db = databaseService.getDbServiceInstance();

    const result = db.getMotherboardData();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));

    //console.log('test');
})
app.get('/getPSU',(request,response) =>{
    const db = databaseService.getDbServiceInstance();

    const result = db.getPSUData();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));

    //console.log('test');
})
app.get('/getRAM',(request,response) =>{
    const db = databaseService.getDbServiceInstance();

    const result = db.getRAMData();

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));

    //console.log('test');
})

app.get('/getSpecificItem',(request,response) =>{
    const db = databaseService.getDbServiceInstance();

    const result = db.getSpecificProduct(voiceSearchQuery);

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));

    //console.log('test');
})

//async (req,res)
app.post('/postAudio',upload.single('audio'), async (req,res)=> {
    const {buffer : recording} = req.file;

    try {
        if(!req.file){
            console.error('No file uploaded');
            return res.status(400).send('No file uploaded.');
        }
        // // Log file details
        //console.log('File received:',req.file);
        
        // // Constructing the file path for the audio file
        // const filePath = path.join(__dirname,req.file.path);
        // const fileStream = fs.createReadStream(filePath)
        // console.log('The new filepath is ' + filePath);

        // Generate the file path with .mp3 extension
        const originalPath = req.file.path;
        const newFileName = `${req.file.filename}.mp3`;  // Add .mp3 extension
        const filePath = path.join(path.dirname(originalPath), newFileName);

        // Rename the file with the .mp3 extension
        fs.renameSync(originalPath, filePath);

        const fileStream = fs.createReadStream(filePath);

        // Making the audio form in the backend
        const audioFormBack = new FormData();
        audioFormBack.append('audio',fileStream,filePath);

        //console.log(audioFormBack.get('audio'));

        //res.json({message: 'File uploaded successfully', file: req.file});
        
        // //Checking file integrity
        // fs.readFile(filePath, (err, data) => {
        //     if (err) {
        //     console.error('Error reading file:', err);
        //     return res.status(500).json({ error: 'Error processing file.' });
        //     }
        //     // Clean up the uploaded file
        //     fs.unlink(filePath, (err) => {
        //         if (err) {
        //         console.error('Error deleting file:', err);
        //         }
        //     });
        //     // Respond with file details
        //     return res.json({ message: 'File uploaded and processed successfully', size: data.length });
        // });

        axios.post('http://localhost:5000/transcriber', audioFormBack,{
            headers: {//'Content-Type': 'multipart/form-data'
            ...audioFormBack.getHeaders(),    
            },
            // cache: false,
            // processData: false, // tell jQuery not to process the data
            // contentType: false // tell jQuery not to set contentType}
            // //, {headers: audioFormBack.getHeaders() }
            })
          .then(response => {
            // Clean up the uploaded file
            console.log('Good Response');
            console.log('Attempting to delete file at path:', filePath);
            fs.unlinkSync(filePath);
        
            console.log('Response from   Python API:', response.data);
            voiceSearchQuery = response.data;
            //Send res back to the client
            return res.json(response.data);
          })
          .catch(error => {
            console.log('Bad Response');
            console.log('Attempting to delete file at path:', filePath);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            console.error(error);
            res.status(500).send('Error processing audio file.');
          });

    }catch (error) {
        console.log('Unexpected error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
    


    


    //return res 


    // // Check if there are audio files checked
    // if (!req.files || Object.keys(req.files).length === 0) {
    //     console.log('No files uploaded');
    //     return res.status(400).send('No files were uploaded.');
    // }
    // else {
    //     console.log('Backend audio file: \n')
    //     console.log(req.files.audio_data)
    // }
    
    // // Log the uploaded file information
    // const audioFile = req.files.audio_data;
    // console.log('Received file:', audioFile);
    // //console.log(req.files)

    // let formData = new FormData();
    // formData = req.files.audio_data;
    // console.log('Received file into FormData:', formData.data);
    // // console.log(formData);

    // // Send data to Python API
    // try {
    //     // // Forward the file to the Python API
    //     // const formData = new FormData();
    //     // formData.set('audio', audioFile.data,audioFile.name
    //     //     // ,{
    //     //     // filename: audioFile.name,
    //     //     // contentType: audioFile.mimetype,
    //     //     // } 
    //     //     //audioFile.name
    //     // );
    //     //console.log(formData)
    //     const res = await fetch('http://localhost:5000/transcriber', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //         //"Content-Type": "audio/mp3"
    //         //'multipart/form-data'            
    //     },
    //       body: JSON.stringify(req.body)
    //       //headers: formData.getHeaders(), 
    //     });
    //     console.log(res);
    //     if (res.ok) {
    //         const data = await res.text();
    //         return res.send(`File uploaded and forwarded successfully: ${data}`);
    //       } else {
    //         console.log(res.statusText);
    //         return res.status(res.status).send(`Failed to forward file: ${res.statusText}`);
    //       }
    // } catch (error) {
    //   console.error('Error forwarding file:', error);
    //   return res.status(500).send('Internal Server Error');
    // }
    
   
});

app.listen(process.env.PORT,() => {
    
    console.log("App listening on port " + process.env.PORT)
})
// //Post method for Whisper transcriber
// app.post("/api/openai/transcriber",(req, res) => transcribe(req, res));