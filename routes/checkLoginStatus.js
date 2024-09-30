import  express from 'express';
import firebaseService from '../firebase/firebaseApp.js'
const router = express.Router();
router.get('/', (request, response) => {
const firebaseObj = firebaseService.getFirebaseServiceInstance();
const result = firebaseObj.checkLoginStatus();
result.then(function(result) {
    let userCheckLogin = {
      
     "userSignedIn": result
    }
    console.log(userCheckLogin);
    if(userCheckLogin.userSignedIn !== false) {
        response.status(200).json(userCheckLogin);
    } else {
        response.status(201).json(userCheckLogin);
    }
});
});

export default router;