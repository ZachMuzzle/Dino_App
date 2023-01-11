/* Server-side javascript 
 * Updated node.js 
 * Now use imports instead of const with require('express');
 * Stopped @47:19 in video: https://www.youtube.com/watch?v=wYALykLb5oY
 * API keys in env file
*/
import fetch from 'node-fetch';
import express from 'express';
import dotenv from 'dotenv';

if(process.env.NODE_ENV != 'production') {
dotenv.config();
}

const { request, response } = express;
const app = express();
const port = 3000;


app.use(express.static('public'));

app.listen(port, function() {
    console.log(`Example app listening at http://localhost:${port}`);
});
const api_key = process.env.API_KEY; // Used for API KEY instead of actual key in options
app.get('/dinoname', async(request,response) => {
    // RUN CODE HERE
    
    const fetchAPI = await fetch('https://dinoipsum.com/api/?format=json&words=2&paragraphs=1');

    const dinoNameResponse = await fetchAPI.json();
    console.log(dinoNameResponse); // writes to console
    response.json(dinoNameResponse); // responded to any client requests

});
const options  = {
    method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f9890be724msh2646fdfb051d29cp1ae4abjsna97db6f72c58',
		'X-RapidAPI-Host': 'bing-image-search1.p.rapidapi.com'
	}
};

app.get('/dinoimage', async(request,response) => {
    const fetchAPI = await fetch('https://bing-image-search1.p.rapidapi.com/images/search?q=dinosaur&count=10000', options);
    const dinoImageResponse = await fetchAPI.json();
    console.log(dinoImageResponse);
    response.json(dinoImageResponse);
});