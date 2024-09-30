import { closeButtons } from "../reusedFunctions/closeButtons.js";
import { displaySignOutButton, signUserOut,navbarResize,signOutButton} from "../SignOut/signOut.js";
import { getUserId } from "../reusedFunctions/getUserIdRequest.js";
import { checkLoginStatus } from "../reusedFunctions/checkLoginStatusFunction.js";

// try {
//     window.onload = async function displayImage() {
/* 
!! Need to clean this file up. Make it more functional
*/
window.addEventListener("load", async function() {
        const response = await checkLoginStatus(userSignedIn);
        if(response != false) {
            let userDisplayId = document.getElementById('userDisplay');
            userDisplayId.innerHTML = response
            userDisplayId.style.display = "block";
            // removeLoginButton();
            displaySignOutButton();
            navbarResize(response);
        }
});
let userSignedIn = null;
window.addEventListener('resize', async() => {
    const status = await checkLoginStatus(userSignedIn);
    navbarResize(status);
});

signOutButton.addEventListener('click', async function signOutClickButton() {
    /* 
    ?? Not sure if anything needs to be returned or not 
    */
   try {
       const response = await signUserOut();
       if(response == true) {
           location.reload();
        }
    } catch(error) {
        console.log(error);
    }
});
        // const response = await fetch('/checkLoginStatus');
        // const data = await response.json();
        // console.log("Check Status Response: " + data.userSignedIn);
        const responseData = await checkLoginStatus(userSignedIn);
        const autocomplete = document.querySelector('#autocomplete');
        const resultsHTML = document.querySelector('.suggestions ul');
        const searchButton = document.querySelector('#searchButton');
        const searchContainer = document.querySelector('.search-container');
        let modal = document.getElementById("updateModal");
        let imgSrcUpdate = document.getElementById("img-src-update");
        let imgCaptionUpdate = document.getElementById("caption-update");
        /* MODEL FOR IMAGE */
        let model = document.getElementById("myModel");
        let images = document.getElementsByClassName("dinoGalleryImage");
        let imgSrc = document.getElementById("img-src");
        let imgCaption = document.getElementById("caption");
        let closeImage = document.querySelectorAll('.close');
        let popupModel = document.getElementById("popupModel");
        let popupMessage = document.getElementById("popupMessage");
        /* Arrays for users and guests */
        let allData = [];
        let dinoArray = [];
        if(responseData != false) {
                const user = responseData.split('@')[0];
                const response = await getUserId(user);
                const data = await response.json();
                
                allData = await getData(data.UserId);
                noDataInDB(allData);
                removeDeleteAllButton(allData,responseData);
                createGallery(allData);
                deleteButtonOnImages(allData);
                updateImageModal(allData,modal)
                closeButtons(closeImage,modal,model,popupModel);
                Resize(allData);
        } else {
            const jsonArrayDinoName = sessionStorage.getItem('dino_name');
            const jsonArrayDinoImage = sessionStorage.getItem('dino_image_url');
            const arrayDinoName = jsonArrayDinoName ? JSON.parse(jsonArrayDinoName) : [];
            const arrayDinoImage = jsonArrayDinoImage ? JSON.parse(jsonArrayDinoImage) : [];
            let guestArray = [];
            console.log(`Array Dino Name: ${arrayDinoName}`);
            console.log(`Array Dino Image: ${arrayDinoImage}`);

            for(let i = 0; i < arrayDinoName.length; i++){
                    guestArray.push({
                        "dino_name": arrayDinoName[i], 
                        "dino_image_url": arrayDinoImage[i]});
                }
            console.log(`guestArray: ${JSON.stringify(guestArray)}`);
            let jsonInt = {
                "data": guestArray
            }
            dinoArray = jsonInt.data;

            noDataInDB(dinoArray);
            removeDeleteAllButton(dinoArray,responseData);
            createGalleryGuest(dinoArray);
            Resize(dinoArray);
            closeButtons(closeImage,modal,model,popupModel);

            // deleteButtonOnImages(dinoArray);
            // updateImageModal(allData,modal)

        }
        // allData = await getData();
        /* Test for login data */
        // let allLoginData = await getLoginData();
        
        /*
        !! Original code for user
        * Need to add below in a function that is only called when user is logged in.
        * So call doesn't happen twice  
        */

        window.addEventListener("resize", () => { 
            if(responseData != false) {
                Resize(allData);
            } else {
                Resize(dinoArray);
            }
        }); 
         
        autocomplete.oninput = function () {
            if(responseData != false) { 
                let results = [];
                console.log("RESULTS ARRAY: ", results);
                const userInput = this.value;
                resultsHTML.innerHTML = "";
                checkSuggestions(results,resultsHTML, userInput, allData);
            } else {
                let results = [];
                console.log("RESULTS ARRAY: ", results);
                const userInput = this.value;
                resultsHTML.innerHTML = "";
                checkSuggestions(results,resultsHTML, userInput, dinoArray);
            }
        }
        
        /* Onclick for suggestions */
        resultsHTML.onclick = function(event) {
            const setValue = event.target.innerText;
            autocomplete.value = setValue;
            this.innerHTML = "";
        }
         /** 
          * * We create the model after  we have loaded the images onto the page since they are local to the loop
          * ? There may be a way to do this outside of  this function, but I thought this was the easiest to implement
          * 
          * */ 
         searchButton.onclick = function() {
             searchButtonOnClick();
         }

         /* Search button click when model isn't blocked*/
         document.onkeydown = function() {
            if(window.event.keyCode == 13 && model.style.display !== "block" && autocomplete.value.length > 0) {
             searchButtonOnClick();
            }
         }

          /* 
         !!
         !! Maybe turn this into a function for easy recall? 
         */
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

         /* 
         !! Turn into a function 
         Delete all data 
         */
         try {
            let button = document.querySelector('#delete_all');
            if(button) {
        
                button.onclick = function() {
                    truncateAllData();
                }
            }
        } catch(error) {
            console.log(error);
        }
           /* Hover Text Dynamic Width 
           based on width of dinoGalleryImage
        */
        function Resize(data) {
            for(let i = 0; i < data.length; i++) {
                const parent = document.querySelectorAll(".dinoGalleryImage")[i]
                const parentWidth = getComputedStyle(parent).width;
                document.documentElement.style.setProperty('--hover-width', parentWidth);
                document.documentElement.style.setProperty('--button-width', parentWidth);

            }
        }

         /* Button click for search */
        function searchButtonOnClick() {
            try {
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
                        /* Where we will add custom alert */
                        // popupMessage.innerHTML = "PLEASE INPUT A DINOSAUR NAME BEFORE SUBMITTING"
                        let popupValue = document.createElement("div");
                        let popupValueContents = document.createTextNode("PLEASE INPUT A DINOSAUR NAME BEFORE SUBMITTING")
                        popupValue.setAttribute("id", "popupValue");
                        popupValue.appendChild(popupValueContents);
                        popupMessage.appendChild(popupValue);
                        popupModel.style.display = "block"
                        popupMessage.style.display = "block"
                        

                        // alert("PLEASE INPUT A DINOSAUR NAME BEFORE SUBMITTING");
                        throw "No available image for search field!"
                    }
                }
                //Clear search values when
                autocomplete.value = "";
            } catch(err) {
                console.log(err);
            }
        }
//     }
// } catch(err) {
//     console.log(err);
// }


/* End of first try/catch */
/* getResults function gets suggestions from search bar input and returns if any found */
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

async function getData(user_id) {
    return new Promise((resolve) => {

        fetch('/getData', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({userId: user_id})
        })
        .then(response => response.json())
        .then(data => {
            resolve(data['data'])
        });  
        });
}
/* test login function */
async function getLoginData() {
    return new Promise((resolve) => {
        fetch('/getLoginData')
        .then(response => response.json())
        .then(data => {
            resolve(data['data'])
        });
    });
}
/* Deletes all data. 
    ? Not sure if return promise is needed since we aren't returning anything
*/
async function truncateAllData() {
    return new Promise((resolve) => {
        fetch('/truncate')
        .then(response => response.json())
        .then(data => {
            if(data.data) {
                location.reload();
            }
        })
    })
}

function deleteById(id) {
    fetch('/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            location.reload();
        }
    });
}

function noDataInDB(allData) {
    if(allData.length === 0) {
        const dinoImgError = document.createElement('h1');
        searchContainer.style.display = "none";
        dinoImgError.className = 'headerErrorImage';
        dinoImgError.innerHTML = "PLEASE ADD AN IMAGE USING THE GENERATE BUTTON!";
        document.querySelector('.errorDiv').appendChild(dinoImgError);
        // throw "Generate a dino image!";
    }
    
}
function removeDeleteAllButton(allData,responseData) {
    if((allData.length === 0)) {
        hideDeleteAllButton();
    } else if(responseData == false) {
        hideDeleteAllButton();
    }

}

function hideDeleteAllButton() {
    let deleteButtonClass = document.querySelectorAll('.delete_all_container');
        deleteButtonClass[0].hidden = true;
}

/* LOOP Creates all the necessary image galleries for this page until no data left*/
function createGallery(allData) {

    for(let i = 0; i < allData.length; i++) {
    
    createImages(allData,i);
    deleteImagesButton(allData,i)
    updateImagesButton(allData,i)
    textOnHoverImage(allData,i)
    }
}

function createGalleryGuest(allData) {
    for(let i = 0; i < allData.length; i++) {
    
        createImages(allData,i);
        // deleteImagesButton(allData,i)
        // updateImagesButton(allData,i)
        textOnHoverImage(allData,i)
        }
}

function createImages(allData, i) {
    /* Div creation */    
    const imgWrap = document.createElement('div');
    imgWrap.className = "imgWrap";
    /* Image creation */
    const img = document.createElement('img');
    const buttonDiv = document.createElement('div');
    buttonDiv.className = "buttonContainer";

    img.className = 'dinoGalleryImage';
    img.src = allData[i].dino_image_url;
    img.alt = allData[i].dino_name;
    document.querySelector('#dinoWrapperGallery').appendChild(imgWrap);
    document.querySelectorAll('.imgWrap')[i].appendChild(img);
    // document.querySelectorAll('.imgWrap')[i].appendChild(buttonDiv);
    document.querySelector('#dinoWrapperGallery').appendChild(buttonDiv);

}

function deleteImagesButton(allData, i) {
    const button = document.createElement('button');
    button.setAttribute('data-id', allData[i].id);
    button.className = 'deleteImage'
    const textButton = document.createTextNode(`Delete ${allData[i].dino_name} Image`);
    button.appendChild(textButton);
    document.querySelectorAll('.buttonContainer')[i].appendChild(button);

}

function updateImagesButton(allData, i) {
    const updateButton = document.createElement('button');
    updateButton.setAttribute('data-id', allData[i].id);
    updateButton.className = 'updateImage'
    const textUpdate = document.createTextNode(`Update ${allData[i].dino_name} Image`);
    updateButton.appendChild(textUpdate);
    document.querySelectorAll('.buttonContainer')[i].appendChild(updateButton);

}

function textOnHoverImage(allData, i) {
     /* Div creation for text of dino */
     const textDiv = document.createElement("div");
     textDiv.className = "hoverName";
     document.querySelectorAll(".imgWrap")[i].appendChild(textDiv);
     const text = document.createElement("h2");
     text.className = "textHeader";
     text.innerHTML = allData[i].dino_name;
     document.querySelectorAll(".hoverName")[i].appendChild(text);
}

function deleteButtonOnImages(allData) {
    /* Delete Button for each image */
    for(let i = 0; i < allData.length; i++) {

        const deleteButton = document.querySelectorAll('.deleteImage')[i];
        deleteButton.onclick = function(event) {
            deleteById(event.target.dataset.id)
        }
    }
}

function updateImageModal(allData, modal) {
    let generateImageButtonUpdate = document.createElement("button");
    const textForButton = document.createTextNode("Generate new Image");
    
    generateImageButtonUpdate.className = "RandomImageButton";
    generateImageButtonUpdate.appendChild(textForButton);
    modal.appendChild(generateImageButtonUpdate);
    createUpdateButtons(allData, modal);
           
}

function createUpdateButtons(allData, modal) {
    for(let i = 0; i < allData.length; i++) {
        const updateButton = document.querySelectorAll('.updateImage')[i];
        updateButton.onclick = function(event) {
            updatePopUp(event.target.dataset.id, modal,allData[i].dino_name)
        }
    }

}

/* updatePopUp Function when called modal is displayed.
    User is allowed to generate a new image and submit it for update in the DB        
*/
function updatePopUp(id,modal,dinoName) {
        
    modal.style.display = "block"
    let generateButton = document.querySelector('.RandomImageButton');
    generateButton.onclick = async function() {
        // console.log("WORKED AGAIN!")
        /* 
        !!! MAYBE USE FUNCTION EXPORT FROM SCRIPTS.JS ????
        */
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
    fetch('/update', {
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

        /*
        * Close Modal Buttons when popup modal appears
        * two if statements. One is for the first modal when viewing an image
        * Second is for when updating an image.
        */
// export function closeButtons(closeImage,modal,model,popupModel) {

//     for(let i = 0; i < closeImage.length; i++) {
//         closeImage[i].onclick = function() {
//             if(closeImage[i] == closeImage[0]) {
//                 model.style.display = "none";
//                 document.getElementById('popupMessage').style.display = 'none';
                
//                 if(document.getElementById("popupValue")) {
//                     document.getElementById("popupValue").remove();
//                 }

//             }
//             else if (closeImage[i] == closeImage[1]) {
//                 modal.style.display = "none";
//                 document.querySelector('#img-src-update').removeAttribute('src')
//                 document.querySelector('#caption-update').innerHTML = "";

//                if(document.querySelectorAll('.submitButton')[0]) {
                   
//                    document.querySelectorAll('.submitButton')[0].remove();
//             } 

//             }
//             else if (closeImage[i] == closeImage[2]) {
//                 popupModel.style.display = "none";
                
//                 if(document.getElementById("popupValue")) {
//                     document.getElementById("popupValue").remove();
//                 }
//             }
//         }
//     }
// }
/*
* Checks suggestions from search input
*/
function checkSuggestions(results,resultsHTML,userInput, allData) {
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