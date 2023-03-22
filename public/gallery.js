try {
    window.onload = async function displayImage() {
    
        let allData = await getData();
        console.log(allData)
        if(allData.length === 0) {
            const dinoImgError = document.createElement('h1');
            dinoImgError.className = 'headerErrorImage';
            dinoImgError.innerHTML = "PLEASE ADD AN IMAGE USING THE GENERATE BUTTON!";
            document.querySelector('.errorDiv').appendChild(dinoImgError);
            throw "Generate a dino image!";
        }
        if(allData.length === 0) throw "Generate a dino name!";
    
        
        for(let i = 0; i < allData.length; i++) {
        /* Div creation */    
        const imgWrap = document.createElement('div');
        imgWrap.className = "imgWrap";
        /* Image creation */
        const img = document.createElement('img');
        img.className = 'dinoGalleryImage';
        img.src = allData[i].dino_image_url;
        img.alt = allData[i].dino_name;
        document.querySelector('#dinoWrapperGallery').appendChild(imgWrap);
        document.querySelectorAll('.imgWrap')[i].appendChild(img);

        /* Div creation for text of dino */
        const textDiv = document.createElement("div");
        textDiv.className = "hoverName";
        document.querySelectorAll(".imgWrap")[i].appendChild(textDiv);
        const text = document.createElement("h2");
        text.className = "textHeader";
        text.innerHTML = allData[i].dino_name;
        document.querySelectorAll(".hoverName")[i].appendChild(text);
        }
        /* Search auto complete ability */
        const autocomplete = document.querySelector('#autocomplete');
        const resultsHTML = document.querySelector('.suggestions ul');
        const searchButton = document.querySelector('#searchButton');

        autocomplete.oninput = function () { 
            let results = [];
            console.log("RESULTS ARRAY: ", results);
            const userInput = this.value;
            resultsHTML.innerHTML = "";
            // change this to higher number for larger data sets.
            if(userInput.length > 0) {
                results = getResults(userInput, allData);
                resultsHTML.style.display = "block";
                for(let i = 0; i < results.length; i++) {
                    resultsHTML.innerHTML += "<li>" + results[i] + "</li>";
                }
                resultsHTML.classList.add('has-suggestions');
            }
            else {
                results = [];
                resultsHTML.innerHTML="";
                resultsHTML.classList.remove('has-suggestions');
        }
        }
        
        /* Onclick for suggestions */
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
                if(images[i].alt == autocomplete.value) {
                    console.log("IF WAS HIT!")
                    model.style.display = "block";
                    imgSrc.src = images[i].src;
                    imgCaption.innerHTML = images[i].alt;
                    break
                } else if(images.length-1 == i) {
                    alert("PLEASE INPUT A DINOSAUR NAME BEFORE SUBMITTING");
                    throw "No available image for search field!"
                }
            }
            //Clear search values when
            autocomplete.value = "";
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
        console.log(data[i].dino_name.slice(0, input.length))
        if(input === data[i].dino_name.slice(0, input.length)) {
            results.push(data[i].dino_name);
        }
    }
    return results;
}

async function getData() {
    return new Promise((resolve) => {

        fetch('http://localhost:3000/getData')
        .then(response => response.json())
        .then(data => {
            resolve(data['data'])
        });  
        });
}