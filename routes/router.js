import  express from 'express';
import firebaseService from '../firebase/firebaseApp.js'
const router = express.Router();

router.post('/', (request, response) => {
  const {user,pass} = request.body;
  console.log(user + " " + pass)
  const firebaseObj = firebaseService.getFirebaseServiceInstance();
  console.log("Firebase Obj: ",firebaseObj);
  const result = firebaseObj.createUser(user,pass);
  result.then(function(result) {
    // console.log("Results from createUser: ",result);
    let jsonInit = {};
    let userCreated = [];
    jsonInit.userCreated = userCreated;
    let emailValue = {
      
     "email": result.email
    }
    jsonInit.userCreated.push(emailValue)
    console.log(jsonInit)
    response.send(jsonInit);
  });
});

export default router;

