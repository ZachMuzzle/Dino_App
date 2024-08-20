import { removeLoginButton, addLoginButton} from "./Login/loginFeature.js";
import { displaySignOutButton,signUserOut } from "./SignOut/signOut.js";
import { getUserId } from "./reusedFunctions/getUserIdRequest.js";

try {
    window.onload = async function checkUserAuth() {
        const response = await fetch('/checkLoginStatus');
        const data = await response.json();
        console.log("Check Status Response: " + data.userSignedIn);

        if(data.userSignedIn != false) {
            let userDisplayId = document.getElementById('userDisplay');
            userDisplayId.innerHTML = data.userSignedIn;
            userDisplayId.style.display = "block";
            displaySignOutButton();
        } else if(data.userSignedIn == false) {
            addLoginButton();
        }
    }
} catch(error) {
    console.log(error);
}
let signOutButton = document.getElementById('signOutButton');
let generateButton = document.getElementById('button-load');  // Check before doing operation
checkForButtonPress(generateButton);

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


// generateButton.addEventListener('mouseover', async() => {
//     const loginStatus = await fetch('/checkLoginStatus');
//     console.log("Check Status Response: " + loginStatus);
// })


function checkForButtonPress(generateButton) {
    if(generateButton) {

        generateButton.addEventListener('click', async () => {
            generateButton.disabled = true;
                if(document.querySelector('#dinoName') !== null) {
                    document.querySelector('#dinoName').remove();
                }
                
                if(document.querySelector('#dinoImage') !== null) {
                    document.querySelector('#dinoImage').remove();
                }
                let data = await getDinoName();
                let dinoName = createDinoDiv(data);
                let imageData = await getDinoImage(dinoName);
                let imageDataBranch = createImage(imageData[0], imageData[1]);
                const response = await fetch('/checkLoginStatus');
                const responseData = await response.json();
                /* Check if user is logged in and if so we can then pass the userName? */
                if(responseData.userSignedIn != false) {
                    const user = responseData.userSignedIn.split('@')[0];
                    const response = await getUserId(user);
                    const data = await response.json();
                    // alert(`USERID IS: ${data.UserId}`);
                    /* 
                    TODO: Work on getting insert to work with userId
                    */
                    await insert(imageDataBranch[0], imageDataBranch[1], data.UserId);
                }

                // await insert(imageDataBranch[0], imageDataBranch[1]);
                setTimeout(function() {
                generateButton.disabled = false;
                },1000);
        });
        
    }
}
/* 
! Make this function only get DinoName and make other tasks work outside this function
*/
async function getDinoName() { // the keyword async before a function makes the function return a promise
    return new Promise((resolve) => {

        fetch('/dinoname') //fetch data
        .then(response => response.json())
        .then(data => {
            resolve(data)
        })
        .catch(err => console.log(err))
    })
//    await getDinoImage(dinoname)
}

function createDinoDiv(data) {
    let dinoname = data[0].join(' '); // name with spaces, first element
    
    /* Div section */
    let dinoNameDiv = document.createElement('div');
    dinoNameDiv.id = 'dinoName';
    dinoNameDiv.textContent = dinoname;
    document.querySelector('#dinoWrapper').appendChild(dinoNameDiv);

    return dinoname;
}
/* 
! Do the same thing here. But for this only do the task of getting the dino image.
*/
async function getDinoImage(dinoName) {
    try {
    const response = await fetch('/dinoimage');
    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
    const data = await response.json(); // data length is whatever count is ?
    // console.log("DATA CALL AFTER BUTTON CLICK: ", data.results)
     // put img element into body of html

     return [data,dinoName];
    } catch(error){
        alert(error);
    }

    // await insert(dinoName, dinoImageUrl);
   
}

function createImage(data, dinoName) {
    try {

        console.log("In Function: ", data)
        let dinoimage = data.results[Math.floor(Math.random() * data.results.length)]; // random dino image  from the length
        let dinoImageUrl = dinoimage.image;
        let dinoAlt = dinoimage.title; 
        console.log(dinoimage);
        console.log(dinoImageUrl,dinoAlt);
        if(dinoImageUrl.substring(0,5) !== 'https') {
            dinoImageUrl = [dinoImageUrl.slice(0,4), 's', dinoImageUrl.slice(4)].join('');
        }
    
        let img = document.createElement('img');
        img.id = 'dinoImage'; // set id of img created
        img.src = dinoImageUrl;
        console.log("URL: ", img.src)
        img.alt = dinoAlt;
        document.querySelector('#dinoWrapper').appendChild(img);
    
        return [dinoName, dinoImageUrl];
    } catch(error) {
        console.log(error)
    } 
}

async function insert(dinoName, dinoImageUrl, user) {
    return new Promise((resolve) => {

        fetch('/insert', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({dino_name: dinoName,
                dino_image_url: dinoImageUrl,
                username: user
            })
        })
        .then(response => response.json())
        resolve()
    })
}

// async function getUserId(username) {
//     try {
//         const response = await fetch('/getUserId', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({username: username})
//         });
//         if(!response.ok) {
//             const error = await response.json();
//             throw new Error(error.message);
//         }
//         return response;
//     } catch(error) {
//         console.log(error);
//         alert(error);
//     }
// }