/* Client side javascript */
console.log('Scripts.js loaded!');

document.getElementById('button-load').addEventListener('click', () => {
    if(document.querySelector('#dinoName') !== null) {
        document.querySelector('#dinoName').remove();
    }

    if(document.querySelector('#dinoImage') !== null) {
        document.querySelector('#dinoImage').remove();
    }
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
    let dinoNameDiv = document.createElement('div');
    dinoNameDiv.id = 'dinoName';
    dinoNameDiv.textContent = dinoname;
    document.querySelector('#dinoWrapper').appendChild(dinoNameDiv);
}

async function getDinoImage() {
    const response = await fetch('/dinoimage');
    const data = await response.json(); // data length is 10
    let dinoimage = data.value[Math.floor(Math.random() * data.value.length)]; // hard coded to get first value from json.
    let dinoImageUrl = dinoimage.thumbnailUrl;
    let dinoAlt = dinoimage.name; 
    console.log(dinoimage);
    console.log(dinoImageUrl,dinoAlt);

    let img = document.createElement('img');
    img.id = 'dinoImage'; // set id of img created
    img.src = dinoImageUrl;
    img.alt = dinoAlt;
    document.querySelector('#dinoWrapper').appendChild(img); // put img element into body of html
}