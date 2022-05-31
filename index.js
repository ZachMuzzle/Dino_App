/* Server-side javascript 
 * Updated node.js 
 * Now use imports instead of const with require('express');
 * Stopped @19:34 in video: https://www.youtube.com/watch?v=wYALykLb5oY
*/
import fetch from 'node-fetch';
import express from 'express';
const { request, response } = express;
const app = express();
const port = 3000;


app.use(express.static('public'));

app.listen(port, function() {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/dinoname', async(request,response) => {
    // RUN CODE HERE
    
    const fetchAPI = await fetch('https://dinoipsum.com/api/?format=json&words=2&paragraphs=1');

    const dinoNameResponse = await fetchAPI.json();
    console.log(dinoNameResponse); // writes to console
    response.json(dinoNameResponse); // responded to any client requests

//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(err => console.error('Where did all the dinosaurs go?'))
});