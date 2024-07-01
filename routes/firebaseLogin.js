import  express from 'express';
import firebaseService from '../firebase/firebaseApp.js'
const router = express.Router();

router.post('/', (request, response) => {
    const {email,password} = request.body;
    const firebaseObj = firebaseService.getFirebaseServiceInstance();
    const result = firebaseObj.signUserIn(email,password);
    result.then((result) => {
        // let jsonInit = {};
        // let passReset = [];
        // jsonInit.passReset = passReset;
        let messageJson = {
            "Email": result.email,
            "Password Match": true
        }
        // jsonInit.passReset.push(messageJson);
        response.json(messageJson);
        // response.send(messageJson);
    })
    .catch(error => {
        if(error.message.includes("auth/invalid-email")) {
            response.status(404).json({message: "Invalid email address"});
            console.log(error);
        }
        else if(error.message.includes("auth/invalid-credential")) {
            response.status(404).json({message: "Invalid credentials"});
            console.log(error);
        }
        else {
            response.status(500).json({message: "Error occurred with login"});
            console.log(error);
        }
    })
});

export default router;