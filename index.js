/* Server-side javascript 
 * Updated node.js 
 * Now use imports instead of const with require('express');
 * This is where calls between client side connect here then go to the DB
 * API keys in env file
*/
import fetch from 'node-fetch';
import express, { response } from 'express';
import dotenv from 'dotenv';
import DbService from './database/database.js'
import DbLoginService from './database/loginDatabase.js';
import cors from 'cors';
import path from 'path';
import {fileURLToPath} from 'url';
import firebaseCreateUser from './routes/firebaseCreateUser.js';
import getDinoRoutes from './routes/getDinos.js';
import dinoNameRoutes from './routes/getDinoName.js';
import dinoImageRoutes from './routes/getDinoImage.js';
import insertDinoDataRoutes from './routes/insertDinoData.js';
import deleteAllDinoDataRoutes from './routes/deleteAllData.js';
import deleteDinoIdRoutes from './routes/deleteDinoId.js';
import updateDinoRoutes from './routes/updateDino.js';
import loginDinoRoutes from './routes/login.js';
import passwordReset from './routes/firebaseResetPass.js';
import loginCheck from './routes/firebaseLogin.js';
import checkLoginStatus from './routes/checkLoginStatus.js'
import signOutUser from './routes/signOutUser.js';
import insertUser from './routes/insertUser.js';
import getUserId from './routes/getUserId.js'
if(process.env.NODE_ENV != 'production') {
  dotenv.config();
  }

const getDirName = function (moduleUrl) {
  const filename = fileURLToPath(moduleUrl)
  return path.dirname(filename)
}
export const app = express();
const publicPath=path.join(getDirName(import.meta.url), 'public')
const port = 3000;

/* App uses */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public')); 
/* Routes */
app.use('/createNewUser',firebaseCreateUser);
app.use('/getData',getDinoRoutes);
app.use('/dinoname',dinoNameRoutes);
app.use('/dinoimage',dinoImageRoutes);
app.use('/insert',insertDinoDataRoutes);
app.use('/truncate',deleteAllDinoDataRoutes);
app.use('/delete',deleteDinoIdRoutes);
app.use('/update',updateDinoRoutes);
app.use('/login',loginDinoRoutes);
app.use('/resetPassword', passwordReset);
app.use('/loginCheck', loginCheck);
app.use('/checkLoginStatus', checkLoginStatus)
app.use('/signOutUser',signOutUser)
app.use('/insertUser',insertUser)
app.use('/getUserId',getUserId)

app.get('/',(request, response) => {
  response.redirect('/DinoGenerator');
});

app.get('/DinoGenerator',(request, response) => {
  response.sendFile(`${publicPath}/index.html`)
});

app.get('/Gallery',(request, response) => {
  response.sendFile(`${publicPath}/Gallery/gallery.html`)
});

app.get('/styles.css',(request, response) => {
  response.sendFile(`${publicPath}/styles.css`)
});

app.get('/scripts.js',(request, response) => {
  response.sendFile(`${publicPath}/scripts.js`)
});

app.get('/galleryStyles.css',(request, response) => {
  response.sendFile(`${publicPath}/Gallery/galleryStyles.css`)
});

app.get('/modelStyle.css',(request, response) => {
  response.sendFile(`${publicPath}/modelStyle.css`)
});

app.get('/loginStyles.css',(request, response) => {
  response.sendFile(`${publicPath}/Login/loginStyles.css`)
});


app.get('/gallery.js',(request, response) => {
  response.sendFile(`${publicPath}/Gallery/gallery.js`)
});
app.get('/Recaptcha.js',(request, response) => {
  response.sendFile(`${publicPath}/Recaptcha.js`)
});

app.get('/loginForm.js',(request, response) => {
  response.sendFile(`${publicPath}/Login/loginForm.js`)
});

app.get('/signUpForm.js',(request, response) => {
  response.sendFile(`${publicPath}/Login/signUpForm.js`)
});

app.get('/styleEffects.js',(request, response) => {
  response.sendFile(`${publicPath}/styleEffects.js`)
});

app.get('/casey-horner-1sim8ojvCbE-unsplash.jpg',(request, response) => {
  response.sendFile(`${publicPath}/Gallery/casey-horner-1sim8ojvCbE-unsplash.jpg`)
});

app.get('/myIcon.ico',(request, response) => {
  response.sendFile(`${publicPath}/myIcon.ico`)
});

app.get('/loginFeature.js',(request, response) => {
  response.sendFile(`${publicPath}/Login/loginFeature.js`)
});

app.get('/signOut.js',(request, response) => {
  response.sendFile(`${publicPath}/SignOut/signOut.js`)
});

app.get('/signOut.css',(request, response) => {
  response.sendFile(`${publicPath}/SignOut/signOut.css`)
});

app.get('/closeButtons.js',(request, response) => {
  response.sendFile(`${publicPath}/reusedFunctions/closeButtons.js`)
});

app.get('/getUserIdRequest.js',(request, response) => {
  response.sendFile(`${publicPath}/reusedFunctions/getUserIdRequest.js`)
});

app.get('/checkLoginStatusFunction.js',(request, response) => {
  response.sendFile(`${publicPath}/reusedFunctions/checkLoginStatusFunction.js`)
});

/* 404 error */
app.use((req,res,next) => {
  res.status(404).send("Sorry, page was not found");
});

/* Any error handling */
app.use((err,req,res,next) => {
  console.log(err.stack);
  res.status(500).send("Something went wrong!");
})

app.listen(port, function() {
  console.log(`Example app listening at http://localhost:${port}`);
});