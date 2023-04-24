/* Client side javascript */
const gallery_array_url = [];
const gallery_array_name = [];
console.log('Scripts.js loaded!');

let el = document.getElementById('button-load');  // Check before doing operation
if(el) {

    el.addEventListener('click', async () => {
        el.disabled = true;
            if(document.querySelector('#dinoName') !== null) {
                document.querySelector('#dinoName').remove();
            }
            
            if(document.querySelector('#dinoImage') !== null) {
                document.querySelector('#dinoImage').remove();
            }
            await getDinoName();
            // getDinoImage(dinoName);
            setTimeout(function() {
                el.disabled = false;
            },1000);
    });
    
}

async function getDinoName() { // the keyword async before a function makes the function return a promise
    const response = await fetch('/dinoname'); //fetch data
    const data = await response.json(); //formate as json data
    let dinoname = data[0].join(' '); // name with spaces, first element
    
    /* Div section */
    let dinoNameDiv = document.createElement('div');
    dinoNameDiv.id = 'dinoName';
    dinoNameDiv.textContent = dinoname;
    document.querySelector('#dinoWrapper').appendChild(dinoNameDiv);

   await getDinoImage(dinoname)
}

async function getDinoImage(dinoName) {
    const response = await fetch('/dinoimage');
    const data = await response.json(); // data length is whatever count is ?
    console.log("DATA CALL AFTER BUTTON CLICK: ", data.results)
    let dinoimage = data.results[Math.floor(Math.random() * data.results.length)]; // random dino image  from the length
    let dinoImageUrl = dinoimage.image;
    let dinoAlt = dinoimage.title; 
    console.log(dinoimage);
    console.log(dinoImageUrl,dinoAlt);

    let img = document.createElement('img');
    img.id = 'dinoImage'; // set id of img created
    img.src = dinoImageUrl;
    img.alt = dinoAlt;
    document.querySelector('#dinoWrapper').appendChild(img); // put img element into body of html

    await insert(dinoName, dinoImageUrl);
   
}

async function insert(dinoName, dinoImageUrl) {
    return new Promise((resolve) => {

        fetch('http://localhost:3000/insert', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({dino_name: dinoName,
                dino_image_url: dinoImageUrl
            })
        })
        .then(response => response.json)
        resolve()
    })
}