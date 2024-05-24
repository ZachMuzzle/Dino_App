import  express from 'express';
import DbService from '../database/database.js';
const router = express.Router();

router.delete('/:id', (request, response) => {
    const {id} = request.params;
    console.log("ID IS: " + id);
    const db = DbService.getDbServiceInstance();
  
    const result = db.deleteById(id);
  
    result
    .then(data => response.json({success:data}))
    .catch(err => console.log(err))
  });

  export default router;