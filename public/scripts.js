/* Client side javascript */
const gallery_array_url = [];
const gallery_array_name = [];
console.log('Scripts.js loaded!');
let el = document.getElementById('button-load');  // Check before doing operation
if(el) {

    el.addEventListener('click', () => {
        if(document.querySelector('#dinoName') !== null) {
            document.querySelector('#dinoName').remove();
        }

        if(document.querySelector('#dinoImage') !== null) {
            document.querySelector('#dinoImage').remove();
        }
        getDinoName();
        getDinoImage();

    });
}

// getDinoName();

async function getDinoName() { // the keyword async before a function makes the function return a promise
    const response = await fetch('/dinoname'); //fetch data
    const data = await response.json(); //formate as json data
    let dinoname = data[0].join(' '); // name with spaces, first element
    console.log(dinoname);
    
    /* Div section */
    let dinoNameDiv = document.createElement('div');
    dinoNameDiv.id = 'dinoName';
    dinoNameDiv.textContent = dinoname;
    document.querySelector('#dinoWrapper').appendChild(dinoNameDiv);

    /* Gallery Section for name */
    gallery_array_name.push(dinoname);
    sessionStorage.setItem("dino-name", gallery_array_name);
}

async function getDinoImage() {
    const response = await fetch('/dinoimage');
    const data = await response.json(); // data length is whatever count is ?
    let dinoimage = data.value[Math.floor(Math.random() * data.value.length)]; // random dino image  from the length
    let dinoImageUrl = dinoimage.thumbnailUrl;
    let dinoAlt = dinoimage.name; 
    console.log(dinoimage);
    console.log(dinoImageUrl,dinoAlt);

    let img = document.createElement('img');
    img.id = 'dinoImage'; // set id of img created
    img.src = dinoImageUrl;
    img.alt = dinoAlt;
    document.querySelector('#dinoWrapper').appendChild(img); // put img element into body of html

    /* Gallery Section */
    
    gallery_array_url.push(dinoImageUrl);
    // gallery_array_name.push(dinoAlt);

    console.log("TESTING ARRAYS NOW: ")
    // console.log(gallery_array_name);
    console.log(gallery_array_url);

    sessionStorage.setItem("url-dino",gallery_array_url);
    // sessionStorage.setItem("url-name",gallery_array_name);
}