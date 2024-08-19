import  express from 'express';
import DbService from '../database/database.js';
const router = express.Router();
router.post('/', (request,response) => {

    const {dino_name,dino_image_url,username} = request.body;
    console.log("Request body: ",request.body)
    const db = DbService.getDbServiceInstance();
    
    const result = db.insertDino(dino_name, dino_image_url,username);
    /* Need to add dino url */
    result
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
});

export default router;