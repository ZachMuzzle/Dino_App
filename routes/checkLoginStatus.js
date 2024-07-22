import  express from 'express';
import firebaseService from '../firebase/firebaseApp.js'
const router = express.Router();
router.get('/', (request, response) => {
const firebaseObj = firebaseService.getFirebaseServiceInstance();
const result = firebaseObj.checkLoginStatus();
result.then(function(result) {
    let userCheckLogin = {
      
     "isUserSignedIn": result
    }
    console.log(userCheckLogin);
    response.status(200).json(userCheckLogin);
});
});

export default router;