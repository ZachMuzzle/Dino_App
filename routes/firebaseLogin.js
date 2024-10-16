import  express from 'express';
import firebaseService from '../firebase/firebaseApp.js'
const router = express.Router();

router.post('/', (request, response) => {
    const {email,password} = request.body;
    console.log("email and password: ", email, password);
    const firebaseObj = firebaseService.getFirebaseServiceInstance();
    const result = firebaseObj.signUserIn(email,password);
    console.log("Result: ", result);
    result.then((result) => {
        // let jsonInit = {};
        // let passReset = [];
        // jsonInit.passReset = passReset;
        let messageJson = {
            "Email": result.email,
            "Password Match": true
        }
        console.log("JSON: ", messageJson);
        // jsonInit.passReset.push(messageJson);
        response.status(200).json(messageJson);
        // response.send(messageJson);
    })
    .catch(error => {
        if(error.message.includes("auth/invalid-email")) {
            response.status(400).json({message: "Invalid email address"});
            console.log(error);
        }
        else if(error.message.includes("auth/invalid-credential")) {
            response.status(401).json({message: "Invalid credentials"});
            console.log(error);
        }
        else {
            response.status(500).json({message: "Error occurred with login"});
            console.log(error);
        }
    })
});

export default router;