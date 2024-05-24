import  express from 'express';
const router = express.Router();
router.post('/', (request, response) => {
    const params = new URLSearchParams({
      secret: process.env.GOOGLE_RECAP_SECERT,
      response:request.body['g-recaptcha-response'],
      remoteip: request.ip,
    });
  
    console.log(params)
    // console.log(params['secret'])
    
    fetch('https://www.google.com/recaptcha/api/siteverify', {
      method:"POST",
      body: params,
    })
    .then(response => response.json())
    .then(data => {
      if(data.success) {
        response.json({captchaSuccess: true});
      } else {
        response.json({ captchaSuccess: false});
      }
    })
  });

export default router;