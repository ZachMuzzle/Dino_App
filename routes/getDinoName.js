import  express from 'express';
const router = express.Router();
router.get('/', async(request,response) => {
    // RUN CODE HERE
    
    const fetchAPI = await fetch('https://dinoipsum.com/api/?format=json&words=2&paragraphs=1');

    const dinoNameResponse = await fetchAPI.json();
    // console.log(dinoNameResponse); // writes to console
    response.json(dinoNameResponse); // responded to any client requests

});

export default router;