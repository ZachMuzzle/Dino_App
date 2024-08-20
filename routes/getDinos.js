import  express from 'express';
import DbService from '../database/database.js'
const router = express.Router();

router.post('/', (request, response) => {
    const {userId} = request.body;
    const db = DbService.getDbServiceInstance();

    const result = db.getAllData(userId);
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
});

export default router;