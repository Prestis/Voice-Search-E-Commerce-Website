const express = require('express');

//var database = require('')
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const dbService = require('./dbService');
const databaseService = require('./dbService');


app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.listen(process.env.PORT,() => {
    
    console.log("App listening on port " + process.env.PORT)
})


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