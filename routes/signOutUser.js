import  express from 'express';
import firebaseService from '../firebase/firebaseApp.js'
const router = express.Router();
router.get('/', (request, response) => {
const firebaseObj = firebaseService.getFirebaseServiceInstance();
const result = firebaseObj.signOutUser();

result.then(function(result) {
    /* Build JSON */
    let signOutUser = {
        "userWasSignedOut": result
    }
    response.status(200).json(signOutUser);
}).catch(error => {
    response.status(500).json({message: error.message});
})
});

export default router;