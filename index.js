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
import DbLoginService from './database/loginDatabase.js';
import cors from 'cors';
import path from 'path';
import {fileURLToPath} from 'url';
dotenv.config();

const getDirName = function (moduleUrl) {
  const filename = fileURLToPath(moduleUrl)
  return path.dirname(filename)
}
const { request, response } = express;
const app = express();
const publicPath=path.join(getDirName(import.meta.url), 'public')
const port = 3000;
/* App uses */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(express.static('public')); 
app.get('',(response,request) => {
  request.sendFile(`${publicPath}/index.html`)
});

app.get('/DinoGenerator',(response,request) => {
  request.sendFile(`${publicPath}/index.html`)
});

app.get('/Gallery',(response,request) => {
  request.sendFile(`${publicPath}/gallery.html`)
});

app.get('/styles.css',(response,request) => {
  request.sendFile(`${publicPath}/styles.css`)
});

app.get('/scripts.js',(response,request) => {
  request.sendFile(`${publicPath}/scripts.js`)
});

app.get('/galleryStyles.css',(response,request) => {
  request.sendFile(`${publicPath}/galleryStyles.css`)
});

app.get('/modelStyle.css',(response,request) => {
  request.sendFile(`${publicPath}/modelStyle.css`)
});

app.get('/loginStyles.css',(response,request) => {
  request.sendFile(`${publicPath}/loginStyles.css`)
});


app.get('/gallery.js',(response,request) => {
  request.sendFile(`${publicPath}/gallery.js`)
});

app.get('/loginForm.js',(response,request) => {
  request.sendFile(`${publicPath}/loginForm.js`)
});

app.get('/casey-horner-1sim8ojvCbE-unsplash.jpg',(response,request) => {
  request.sendFile(`${publicPath}/casey-horner-1sim8ojvCbE-unsplash.jpg`)
});

app.get('/myIcon.ico',(response,request) => {
  request.sendFile(`${publicPath}/myIcon.ico`)
});

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

try {
app.get('/dinoimage', async(request,response) => {
    const fetchAPI = await fetch(url, options);
    const dinoImageResponse = await fetchAPI.json();
    // console.log(dinoImageResponse);
    response.json(dinoImageResponse);
});
} catch(error){
  console.log(error)
}

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

app.get('/getLoginData', (request, response) => {
  const db = DbLoginService.getDbLoginServiceInstance();
  const results = db.getAllData();

  results
  .then(data => response.json({data: data}))
  .catch(err => console.log(err));
})
