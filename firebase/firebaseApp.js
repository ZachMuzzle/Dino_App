// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
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
const auth = getAuth(app);
const instance = null;

/* 
!! Used as a listener whenever auth is called
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const userEmail = user.email;
    console.log("User was signed in: ", userEmail);
    console.log("Is user email verified?: ", user.emailVerified);
    // ...
  } else {
    console.log("User was signed out");
    // User is signed out
    // ...
  }
}); */

export default class firebaseService {
  static getFirebaseServiceInstance() {
    return instance ? instance : new firebaseService();
  }
  async createUser(email, password) {
    const promise = new Promise((resolve,reject) => {
      // console.log("AUTH: ", auth)
      createUserWithEmailAndPassword(auth,email,password)
      .then(async (userCredential) => {
        const userCred = userCredential.user;
        await sendEmailVerification(auth.currentUser)
        // console.log("USER: ", user)
        resolve(userCred); 
      }).catch((error) => {
        console.log(error)
        reject(new Error(error.message));
      });
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
      });
    });
    return promise;
  }

  async signUserIn(email, password)  {
    const promise = new Promise(async (resolve, reject) => {
      await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userCred = userCredential.user;
        if (auth.currentUser) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const user = auth.currentUser;
          console.log("User was signed in: ", user.email);
          console.log("Is user email verified?: ", user.emailVerified);
          // ...
          resolve(user);
        }
      })
      .catch((error) => {
        console.log(error);
        reject(new Error(error.message));
      });
    });
    return promise;
  }
}