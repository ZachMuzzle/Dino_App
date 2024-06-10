// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
// import dotenv from 'dotenv';
// import {app as appExpress} from '../index.js'
// import { request } from "http";
// import { response } from "express";
// import { reject } from "async";
// import { error } from "console";
// import { resolve } from "path";
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
      // console.log("AUTH: ", auth)
      createUserWithEmailAndPassword(auth,email,password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await sendEmailVerification(auth.currentUser)
        // console.log("USER: ", user)
        resolve(user); 
      }).catch((error) => {
        console.log(error)
        reject(new Error(error.message));
      })
    });
    return promise;
  }

  async passwordReset(email) {
    const promise = new Promise(async (resolve,reject) => {
      await sendPasswordResetEmail(auth,email)
      .then(() => {
        // console.log("AUTH: ", auth)
        console.log("Password reset link was sent if email is valid")
        resolve(email);
      }).catch((error) => {
        console.log(error)
        reject(new Error(error.message));
      })
    });
    return promise
  }
}