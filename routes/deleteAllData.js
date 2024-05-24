import  express from 'express';
import DbService from '../database/database.js';
const router = express.Router();
router.get('/', (request,response) => {
    const db = DbService.getDbServiceInstance();
    const result = db.truncateAllData();
    
    result
    .then(data => response.json({data:data}))
    .catch(err => console.log(err))
});

export default router;