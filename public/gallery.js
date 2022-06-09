
window.onload = function displayImage() {
    const dataUrl = sessionStorage.getItem("url-dino");
    const dataAlt = sessionStorage.getItem("dino-name");
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
