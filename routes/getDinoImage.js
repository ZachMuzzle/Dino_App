import  express from 'express';
const router = express.Router();
const api_key = process.env.API_KEY; // Used for API KEY instead of actual key in options
const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': api_key,
      'X-RapidAPI-Host': 'duckduckgo-image-search.p.rapidapi.com'
    }
  };
const url = 'https://duckduckgo-image-search.p.rapidapi.com/search/image?q=dinosaur';

router.get('/', async(request, response) => {
  try {
    const fetchAPI = await fetch(url, options);
    const dinoImageResponse = await fetchAPI.json();
    response.json(dinoImageResponse);
  } catch(error){
    response.status(500).json({message: error.message});
  }
});

export default router;