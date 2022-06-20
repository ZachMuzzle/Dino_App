try {
    window.onload = function displayImage() {

        const dataUrl = sessionStorage.getItem("url-dino");
        const dataAlt = sessionStorage.getItem("dino-name");
        if(dataUrl == null) {
            const dinoImgError = document.createElement('h1');
            dinoImgError.className = 'headerErrorImage';
            dinoImgError.innerHTML = "PLEASE ADD AN IMAGE USING THE GENERATE BUTTON!";
            document.querySelector('.errorDiv').appendChild(dinoImgError);
            throw "Generate a dino image!";
        }
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

         /* MODEL FOR IMAGE */
         let model = document.getElementById("myModel");
         let images = document.getElementsByClassName("dinoGalleryImage");
         let imgSrc = document.getElementById("img-src");
         let imgCaption = document.getElementById("caption");
         /** 
          * * We create the model after  we have loaded the images onto the page since they are local to the loop
          * ? There may be a way to do this outside of  this function, but I thought this was the easiest to implement
          * 
          * */ 
         try {
            if(images.length == 0) throw "No images found!";
            for(let j =  0; j < images.length; j++) {
                let modelImg = images[j];
            modelImg.onclick = function(event) {
                model.style.display = "block";
                imgSrc.src = this.src;
                imgCaption.innerHTML = this.alt;
            }
            }
         } catch(err) {
            console.log(err);
            console.log("Length of images: " + images.length);
         }
         let span = document.getElementsByClassName("close")[0];
         span.onclick = function() {
            model.style.display = "none";
         }
    }
} catch(err) {
    console.log(err);
}
