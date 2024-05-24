import  express from 'express';
import DbService from '../database/database.js';
const router = express.Router();

router.patch('/', (request, response) => {
    const {id, dino_name, dino_image_url, date_added} = request.body;
    console.log(request.body);
    const db = DbService.getDbServiceInstance();
  
    const result = db.updateById(id, dino_name, dino_image_url, date_added);
  
    result
    .then(data => response.json({success: data}))
    .catch(err => console.log(err));
  });

  export default router;