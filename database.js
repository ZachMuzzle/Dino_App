// var mysql = require('mysql');
import { reject } from 'async';
import { response } from 'express';
import mysql from 'mysql'
let instance = null;
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Bacon123!',
    database: 'dino_database'
});

connection.connect(function(err) {
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
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response; 
        } catch(error) {
            console.log(error);
        }
    }

    async insertDino(dino_name,dino_image_url) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO dino_table (dino_name, dino_image_url, date_added) VALUES (?,?,?);";
                connection.query(query, [dino_name,dino_image_url,dateAdded], (err, result) => {
                    if(err) reject(new Error(err.message));
                    resolve(result.insertId)
                })
            });
            console.log(insertId)
            return {
                id: insertId,
                dino_name: dino_name,
                dino_image_url: dino_image_url,
                dateAdded: dateAdded
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
                    if(err) reject(new Error(err.message));
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
                if(err) reject(new Error(err.message));
                resolve(result.affectedRows); //resolve sends back value after promise. Result is just an object
            })
        });
        console.log(response); 
        return response === 1 ? true : false;

        } catch(error) {
            console.log(error)
        }
    }

    async updateById(id, dino_name, dino_image_url, date_added) {
        try {
            id = parseInt(id,10);
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE dino_table set dino_name = ?, dino_image_url = ?, date_added = ? where id = ?;"
                connection.query(query, [dino_name, dino_image_url, date_added, id], (err, result) => {
                    if(err) reject(new Error(err.message));
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