/* This service allows us to connect and make calls to our db */
const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
})


connection.connect((err) => {
    if (err){
        console.log(err.message);
    }
    console.log('db ' + connection.state);
})


class databaseService {
    static getDbServiceInstance(){
        return instance ? instance : new databaseService();

    }

    //SQL commands sent to back-end
    async getAllData(){
        try{
            const response = await new Promise((resolve, reject) =>{
                const query = "SELECT * FROM products"

                connection.query(query, (err,results) =>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                });
            });

            //console.log(response);
            return response;
        }catch(error){
            console.log(error);
        }
    }
    async getCasesData(){
        try{
            const response = await new Promise((resolve, reject) =>{
                const query = "SELECT * FROM products WHERE category = 'case'"

                connection.query(query, (err,results) =>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                });
            });

            //console.log(response);
            return response;
        }catch(error){
            console.log(error);
        }
    }
    async getCPUData(){
        try{
            const response = await new Promise((resolve, reject) =>{
                const query = "SELECT * FROM products WHERE category = 'cpu'"

                connection.query(query, (err,results) =>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                });
            });

            //console.log(response);
            return response;
        }catch(error){
            console.log(error);
        }
    }
    async getGPUData(){
        try{
            const response = await new Promise((resolve, reject) =>{
                const query = "SELECT * FROM products WHERE category = 'gpu'"

                connection.query(query, (err,results) =>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                });
            });

            //console.log(response);
            return response;
        }catch(error){
            console.log(error);
        }
    }
    async getMotherboardData(){
        try{
            const response = await new Promise((resolve, reject) =>{
                const query = "SELECT * FROM products WHERE category = 'motherboard'"

                connection.query(query, (err,results) =>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                });
            });

            //console.log(response);
            return response;
        }catch(error){
            console.log(error);
        }
    }
    async getPSUData(){
        try{
            const response = await new Promise((resolve, reject) =>{
                const query = "SELECT * FROM products WHERE category = 'psu'"

                connection.query(query, (err,results) =>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                });
            });

            //console.log(response);
            return response;
        }catch(error){
            console.log(error);
        }
    }
    async getRAMData(){
        try{
            const response = await new Promise((resolve, reject) =>{
                const query = "SELECT * FROM products WHERE category = 'ram'"

                connection.query(query, (err,results) =>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                });
            });

            //console.log(response);
            return response;
        }catch(error){
            console.log(error);
        }
    }
    async getSpecificProduct(voiceSearchQuery){
        try{
            const response = await new Promise((resolve, reject) =>{
                console.log(voiceSearchQuery);
                const query = voiceSearchQuery;
                connection.query(query, (err,results) =>{
                    if(err) reject(new Error(err.message));
                    resolve(results);
                });
            });

            //console.log(response);
            return response;
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = databaseService;