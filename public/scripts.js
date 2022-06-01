/* Client side javascript */
console.log('Scripts.js loaded!');

document.getElementById('button-load').addEventListener('click', () => {
    getDinoName();
    getDinoImage();
})

// getDinoName();

async function getDinoName() { 
    const response = await fetch('/dinoname'); //fetch data
    const data = await response.json(); //formate as json data
    let dinoname = data[0].join(' '); // name with spaces, first element
    console.log(dinoname);
    
    /* Div section */
    document.getElementById("dinoName").textContent = dinoname;
}

async function getDinoImage() {
    const response = await fetch('/dinoimage');
    const data = await response.json(); // data length is 10
    let dinoimage = data.value[Math.floor(Math.random() * data.value.length)]; // hard coded to get first value from json.
    let dinoImageUrl = dinoimage.thumbnailUrl;
    let dinoAlt = dinoimage.name; 
    console.log(dinoimage);
    console.log(dinoImageUrl,dinoAlt);

    if(document.querySelector('#dinoImage') !== null) {
        document.querySelector('#dinoImage').remove();
    }
    
    let img = document.createElement('img');
    img.id = 'dinoImage'; // set id of img created
    img.src = dinoImageUrl;
    img.alt = dinoAlt;
    document.querySelector('body').appendChild(img); // put img element into body of html
}