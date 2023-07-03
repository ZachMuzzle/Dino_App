/* Server-side javascript 
 * Updated node.js 
 * Now use imports instead of const with require('express');
 * This is where calls between client side connect here then go to the DB
 * API keys in env file
*/
import fetch from 'node-fetch';
import express from 'express';
import dotenv from 'dotenv';
import DbService from './database/database.js'
import cors from 'cors';

dotenv.config();

const { request, response } = express;
const app = express();
const port = 3000;
/* App uses */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.listen(port, function() {
    console.log(`Example app listening at http://localhost:${port}`);
});
const api_key = process.env.API_KEY; // Used for API KEY instead of actual key in options
app.get('/dinoname', async(request,response) => {
    // RUN CODE HERE
    
    const fetchAPI = await fetch('https://dinoipsum.com/api/?format=json&words=2&paragraphs=1');

    const dinoNameResponse = await fetchAPI.json();
    // console.log(dinoNameResponse); // writes to console
    response.json(dinoNameResponse); // responded to any client requests

});
const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': api_key,
      'X-RapidAPI-Host': 'duckduckgo-image-search.p.rapidapi.com'
    }
  };
const url = 'https://duckduckgo-image-search.p.rapidapi.com/search/image?q=dinosaur';

app.get('/dinoimage', async(request,response) => {
    const fetchAPI = await fetch(url, options);
    const dinoImageResponse = await fetchAPI.json();
    // console.log(dinoImageResponse);
    response.json(dinoImageResponse);
});

/* Database Functionality */

app.post('/insert', (request, response) => {
  const {dino_name,dino_image_url} = request.body;
  console.log(request.body)
  const db = DbService.getDbServiceInstance();

  const result = db.insertDino(dino_name, dino_image_url);
  /* Need to add dino url */
  result
  .then(data => response.json({data: data}))
  .catch(err => console.log(err));
}); 

app.get('/getData', (request, response) => {
  const db = DbService.getDbServiceInstance();

  const result = db.getAllData();

  result
  .then(data => response.json({data: data}))
  .catch(err => console.log(err));
});

app.get('/truncate', (request, response) => {
  const db = DbService.getDbServiceInstance();
  const result = db.truncateAllData();

  result
  .then(data => response.json({data:data}))
  .catch(err => console.log(err))
});

app.delete('/delete/:id', (request, response) => {
  const {id} = request.params;
  const db = DbService.getDbServiceInstance();

  const result = db.deleteById(id);

  result
  .then(data => response.json({success:data}))
  .catch(err => console.log(err))
});

app.patch('/update', (request, response) => {
  const {id, dino_name, dino_image_url, date_added} = request.body;
  console.log(request.body);
  const db = DbService.getDbServiceInstance();

  const result = db.updateById(id, dino_name, dino_image_url, date_added);

  result
  .then(data => response.json({success: data}))
  .catch(err => console.log(err));
});

