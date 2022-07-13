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
        /* Div creation */    
        const imgWrap = document.createElement('div');
        imgWrap.className = "imgWrap";
        /* Image creation */
        const img = document.createElement('img');
        img.className = 'dinoGalleryImage';
        img.src = urlArray[i];
        img.alt = nameArray[i];
        document.querySelector('#dinoWrapperGallery').appendChild(imgWrap);
        document.querySelectorAll('.imgWrap')[i].appendChild(img);

        /* Div creation for text of dino */
        const textDiv = document.createElement("div");
        textDiv.className = "hoverName";
        document.querySelectorAll(".imgWrap")[i].appendChild(textDiv);
        const text = document.createElement("h2");
        text.className = "textHeader";
        text.innerHTML = nameArray[i];
        document.querySelectorAll(".hoverName")[i].appendChild(text);
        }
        /* Search auto complete ability */
        const autocomplete = document.querySelector('#autocomplete');
        const resultsHTML = document.querySelector('#results');
        const searchButton = document.querySelector('#searchButton');

        autocomplete.oninput = function () { 
            let results = [];
            console.log("RESULTS ARRAY: ", results);
            const userInput = this.value;
            resultsHTML.innerHTML = "";
            // change this to higher number for larger data sets.
            if(userInput.length > 0) {
                results = getResults(userInput, nameArray);
                resultsHTML.style.display = "block";
                for(let i = 0; i < results.length; i++) {
                    resultsHTML.innerHTML += "<li>" + results[i] + "</li>";
                }
            }
        };

        /* Onclick for autocomplete */
        resultsHTML.onclick = function(event) {
            const setValue = event.target.innerText;
            autocomplete.value = setValue;
            this.innerHTML = "";
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
  /* Button click for search */
try {
  searchButton.onclick = function(event) {
    console.log("Images Length: ", images.length)
    for(let i = 0; i < images.length; i++) {
        console.log("IMAGES: ", images[i]);
        console.log(images[i].alt);
        console.log(autocomplete.value);
        if(images[i].alt === autocomplete.value) {
            console.log("IF WAS HIT!")
            model.style.display = "block";
            imgSrc.src = images[i].src;
            imgCaption.innerHTML = images[i].alt;
            break
        } else throw "Search dino name is not in gallery!"
    }

}
} catch(err) {
    console.log(err);
}
         /* Maybe turn this into a function for easy recall? */
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

function getResults(input,data) {
const results = [];
    for (let i = 0; i < data.length; i++) {
        console.log("GET RESULTS: ", data[i]);
        console.log("INPUT: ", input);
        if(input === data[i].slice(0, input.length)) {
            results.push(data[i]);
        }
    }
    return results;
}
