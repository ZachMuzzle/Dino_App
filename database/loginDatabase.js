import { reject } from 'async';
import { response } from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql'

if(process.env.NODE_ENV != 'production') {
    dotenv.config();
    }

let instance = null;
var connection = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
});    

connection.getConnection(function(err) {
    if(err) throw err;
    console.log('Database for logins is connected successfully!')
});

export default class DbLoginService {
    static getDbLoginServiceInstance() {
        return instance ? instance : new DbLoginService();
    }
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM dinoUserNameAndPasswordTable";

                connection.query(query, (err, results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response; 
        } catch(error) {
            console.log(error);
        }
    }
}