import  express from 'express';
import DbLoginService from '../database/loginDatabase.js';
const router = express.Router();
router.post('/', (request,response) => {
    const {username} = request.body;
    const db = DbLoginService.getDbLoginServiceInstance();

    const result = db.getUser(username);

    result
    .then(data => response.status(200).json({"UserId": data}))
    .catch(err => {
        response.status(500).json({message: err.message});
    });
});

export default router;