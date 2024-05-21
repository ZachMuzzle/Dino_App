// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import dotenv from 'dotenv';
import {app as appExpress} from '../index.js'
import { request } from "http";
import { response } from "express";
import { reject } from "async";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY_FIRE,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

// express call
let instance = null;
export default class firebaseService {
  static getFirebaseServiceInstance() {
    return instance ? instance : new firebaseService();
  }
  async createUser(email, password) {
    const promise = new Promise((resolve,reject) => {
      createUserWithEmailAndPassword(auth,email,password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await sendEmailVerification(auth.currentUser)
        // console.log("USER: ", user)
        resolve(user); 
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(new Error(error.message));
      })
    });
    return promise;
  }

  async verifyUser() {
    const promise = new Promise((resolve, reject) => {
      sendEmailVerification(auth.currentUser)
      .then(() => {
        resolve("Email verification was sent!")
        // Email verification sent!
        // ...
      }).catch((error) => {
        reject(new Error(error.message));
      })
    });
    return promise;
  }
}
// appExpress.post('/createNewUser', (request, response) => {
//   const {user,pass} = req.body;
//   const result = createUserWithEmailAndPassword(auth,user,pass);
//   response.send(result);
// });

// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed up 
//     const user = userCredential.user;
//     return user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });