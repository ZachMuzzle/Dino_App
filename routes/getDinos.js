import  express from 'express';
const router = express.Router();
import DbService from '../database/database.js'

router.get('/', (request, response) => {
    const db = DbService.getDbServiceInstance();

    const result = db.getAllData();
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
});

export default router;