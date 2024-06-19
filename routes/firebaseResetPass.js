import  express from 'express';
import firebaseService from '../firebase/firebaseApp.js'
const router = express.Router();

router.post('/', (request, response) => {
    console.log("Router was called")
    const {email} = request.body;
    console.log("email: " + email);
    const firebaseObj = firebaseService.getFirebaseServiceInstance();
    const result = firebaseObj.passwordReset(email);
    result.then((result) => {
        let jsonInit = {};
        let passReset = [];
        jsonInit.passReset = passReset;
        let messageJson = {
            "Email": result.email,
            "Password Reset": true
        }
        jsonInit.passReset.push(messageJson);
        response.send(jsonInit);
    })
    .catch(error => {
        if(error.message.includes("auth/invalid-email")) {
           response.status(404).json({message: "Email doesn't exist in our system. Try again"});
           console.log(error)
        }
        else {
            response.status(500).json({message: "Error occurred while using this email"});
           console.log(error)
        }
        // response.send(error);
    });
});

export default router;