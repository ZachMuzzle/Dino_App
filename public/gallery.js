try {
    window.onload = function displayImage() {
        const dataUrl = sessionStorage.getItem("url-dino");
        const dataAlt = sessionStorage.getItem("dino-name");
        if(dataUrl == null) throw "Generate a dino image!"
        if(dataAlt == null) throw "Generate a dino name!";
        const urlArray = dataUrl.split(',');
        const nameArray = dataAlt.split(','); 
        for(let i = 0; i < urlArray.length; i++) {
        let img = document.createElement('img');
        img.className = 'dinoGalleryImage';
        img.src = urlArray[i];
        img.alt = nameArray[i];
        document.querySelector('#dinoWrapperGallery').appendChild(img);
        }
    }
} catch(err) {
    console.log(err);
    // document.getElementById("error").innerHTML = err;

}

/* MODEL FOR IMAGES */
let model = document.getElementById("myModal");
let images = document.getElementsByClassName("dinoGalleryImage");
let modalImg = document.getElementById("img-src");
let modalCaption = document.getElementById("caption");
// Loop through images
try {
    if(images.length == 0) throw "No images found!";

    for(let i = 0; i < images.length; i++) {
        let img = images[i];
    img.onclick = function(event) {
        model.style.display = "block";
        modalImg.src = this.src;
        modalCaption.alt = this.alt;
    }
}
} catch(err) {
    console.log(err);
    console.log("Length of images: " + images);
}

let span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    model.style.display = "none";
}
