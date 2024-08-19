// var mysql = require('mysql');
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
    console.log('Database is connected successfully!')
});
// module.exports = connection;
/* Export class to be used in index.js */
export default class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM dino_table";

                connection.query(query, (err, results) => {
                    if(err) {
                        return reject(new Error(err.message));
                    }
                    resolve(results);
                })
            });
            return response; 
        } catch(error) {
            console.log(error);
        }
    }

    async insertDino(dino_name,dino_image_url,username) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO dino_table (dino_name, dino_image_url, date_added, user_id) VALUES (?,?,?,?);";
                connection.query(query, [dino_name,dino_image_url,dateAdded,username], (err, result) => {
                    if(err) return reject(new Error(err.message));
                    resolve(result.insertId)
                })
            });
            console.log(insertId)
            return {
                id: insertId,
                dino_name: dino_name,
                dino_image_url: dino_image_url,
                dateAdded: dateAdded,
                user_id: username
            }
        } catch(error) {
            console.log(error);
        }
    }

    async truncateAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "TRUNCATE TABLE dino_table";
                connection.query(query, (err, result) => {
                    if(err) return reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });

            return response === 0 ? true : false;
        } catch(error) {
            console.log(error)
        }
    }

    async deleteById(id) {
        try {
            id = parseInt(id,10);
            const response = await new Promise((resolve, reject) => {
            const query = "DELETE FROM dino_table WHERE id = ?";
            connection.query(query, [id], (err, result) => {
                if(err) return reject(new Error("Delete SQL ERROR " + err.message));
                resolve(result.affectedRows); //resolve sends back value after promise. Result is just an object
            })
        });
        console.log(response); 
        return response === 1 ? true : false;

        } catch(error) {
            console.log("DATABASE ERROR: " + error)
        }
    }

    async updateById(id, dino_name, dino_image_url, date_added) {
        try {
            id = parseInt(id,10);
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE dino_table set dino_name = ?, dino_image_url = ?, date_added = ? where id = ?;"
                connection.query(query, [dino_name, dino_image_url, date_added, id], (err, result) => {
                    if(err) return reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            console.log("RESPONSE: ", response)
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false
        }
    }
}

// module.exports =  DbService;