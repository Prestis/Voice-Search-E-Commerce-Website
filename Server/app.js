const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const upload = multer({dest: '../uploads/' });

dotenv.config();

const databaseService = require('./dbService');


app.use(cors());
app.use(express.json());
app.use(express.static('public'));

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
})

app.get('/getSpecificItem',(request,response) =>{
    const db = databaseService.getDbServiceInstance();

    const result = db.getSpecificProduct(voiceSearchQuery);

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

//async (req,res)
app.post('/postAudio',upload.single('audio'), async (req,res)=> {
    const {buffer : recording} = req.file;

    try {
        if(!req.file){
            console.error('No file uploaded');
            return res.status(400).send('No file uploaded.');
        }

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

        axios.post('http://localhost:5000/transcriber', audioFormBack,{
            headers: {
            ...audioFormBack.getHeaders(),    
            },
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
    
});

app.listen(process.env.PORT,() => {
    
    console.log("App listening on port " + process.env.PORT)
})