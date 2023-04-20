try {
    window.onload = async function displayImage() {
    
        let allData = await getData();
        console.log(allData)
        if(allData.length === 0) {
            const dinoImgError = document.createElement('h1');
            dinoImgError.className = 'headerErrorImage';
            dinoImgError.innerHTML = "PLEASE ADD AN IMAGE USING THE GENERATE BUTTON!";
            document.querySelector('.errorDiv').appendChild(dinoImgError);
            // throw "Generate a dino image!";
        }
        // if(allData.length === 0) throw "Generate a dino name!";

        if(allData.length === 0) {
            let deleteButtonClass = document.querySelectorAll('.delete_all_container');
            deleteButtonClass[0].hidden = true;
        }
        
        for(let i = 0; i < allData.length; i++) {
        /* Div creation */    
        const imgWrap = document.createElement('div');
        imgWrap.className = "imgWrap";
        /* Image creation */
        const img = document.createElement('img');
        const button = document.createElement('button');
        const updateButton = document.createElement('button');
        button.setAttribute('data-id', allData[i].id);
        button.className = 'deleteImage'
        const textButton = document.createTextNode(`Delete ${allData[i].dino_name} Image`);
        button.appendChild(textButton);

        updateButton.setAttribute('data-id', allData[i].id);
        updateButton.className = 'updateImage'
        const textUpdate = document.createTextNode(`Update ${allData[i].dino_name} Image`);
        updateButton.appendChild(textUpdate);

        img.className = 'dinoGalleryImage';
        img.src = allData[i].dino_image_url;
        img.alt = allData[i].dino_name;
        document.querySelector('#dinoWrapperGallery').appendChild(imgWrap);
        document.querySelectorAll('.imgWrap')[i].appendChild(img);
        document.querySelectorAll('.imgWrap')[i].appendChild(button);
        document.querySelectorAll('.imgWrap')[i].appendChild(updateButton);

        /* Div creation for text of dino */
        const textDiv = document.createElement("div");
        textDiv.className = "hoverName";
        document.querySelectorAll(".imgWrap")[i].appendChild(textDiv);
        const text = document.createElement("h2");
        text.className = "textHeader";
        text.innerHTML = allData[i].dino_name;
        document.querySelectorAll(".hoverName")[i].appendChild(text);
        }

        /* Delete Button for each image */
        for(let i = 0; i < allData.length; i++) {

        const deleteButton = document.querySelectorAll('.deleteImage')[i];
        deleteButton.onclick = function(event) {
            deleteById(event.target.dataset.id)
        }
    }
        /* Delete button end  */

        /* Update Button for each image */
        let modal = document.getElementById("updateModal");
        console.log(modal)
        let imgSrcUpdate = document.getElementById("img-src-update");
        let imgCaptionUpdate = document.getElementById("caption-update");
        let generateImageButtonUpdate = document.createElement("button");
        const textForButton = document.createTextNode("Generate new Image");
        
        generateImageButtonUpdate.className = "RandomImageButton";
        generateImageButtonUpdate.appendChild(textForButton);
        modal.appendChild(generateImageButtonUpdate)

        console.log(modal);
        for(let i = 0; i < allData.length; i++) {
            const updateButton = document.querySelectorAll('.updateImage')[i];
            updateButton.onclick = function(event) {
                updatePopUp(event.target.dataset.id, modal,allData[i].dino_name)
            }
        }

        function updatePopUp(id,modal,dinoName) {
                
                modal.style.display = "block"
                let generateButton = document.querySelector('.RandomImageButton');

                generateButton.onclick = async function() {
                    // console.log("WORKED AGAIN!")
                    
                    const response = await fetch('/dinoimage');
                    const data = await response.json();
                    // console.log(data.results);
                    let dinoimage = data.results[Math.floor(Math.random() * data.results.length)]; // random dino image  from the length
                    let dinoImageUrl = dinoimage.image;
                    let dinoAlt = dinoName

                    let imgSrc = document.querySelector('#img-src-update');
                    let imageCaption = document.querySelector('#caption-update');

                    imgSrc.src = dinoImageUrl;
                    imageCaption.innerHTML = dinoAlt;

                    /* Create new button to save image/name */
                    let submitButton = document.createElement('button');
                    let textForButton = document.createTextNode('Submit Update')
                    submitButton.className = 'submitButton';
                    submitButton.appendChild(textForButton);
                    modal.appendChild(submitButton);

                    /* Delete second submit button that appears */
                    if(document.querySelectorAll('.submitButton')[1]) {
                        let secondSubmitButton = document.querySelectorAll('.submitButton')[1];
                        secondSubmitButton.remove();
                    }
                    submitButton.onclick =  async function() {
                        /**
                         * * had to change from dinoImageUrl to imgSrc.src. 
                         * ? Not sure why I had to do this
                         */
                        await updateImage(id, imgSrc.src, dinoAlt);
                    }
                }


            }

            async function updateImage(id, dinoImage, dinoAlt) {
                fetch('http://localhost:3000/update', {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: id,
                        dino_name: dinoAlt,
                        dino_image_url: dinoImage,
                        date_added: new Date().toLocaleString()
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if(data.success) {
                        location.reload();
                    }
                });
            }
        /* Update button end */

        /* Close Modal Buttons */
        let closeImage = document.querySelectorAll('.close');

        for(let i = 0; i < closeImage.length; i++) {
            closeImage[i].onclick = function() {
                if(closeImage[i] == closeImage[0]) {
                    model.style.display = "none";
                }
                else if (closeImage[i] == closeImage[1]) {
                    modal.style.display = "none";
                    document.querySelector('#img-src-update').removeAttribute('src')
                    document.querySelector('#caption-update').innerHTML = "";

                   if(document.querySelectorAll('.submitButton')[0]) {
                       
                       document.querySelectorAll('.submitButton')[0].remove();
                } 

                }
            }
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
         console.log(model)
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
    }
} catch(err) {
    console.log(err);
}

try {
    let button = document.querySelector('#delete_all');
    button.onclick = function() {
        truncateAllData();
    }
} catch(error) {
    console.log(error);
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

async function truncateAllData() {
    return new Promise((resolve) => {
        fetch('http://localhost:3000/truncate')
        .then(response => response.json())
        .then(data => {
            if(data.data) {
                location.reload();
            }
        })
    })
}

function deleteById(id) {
    fetch('http://localhost:3000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            location.reload();
        }
    });
}