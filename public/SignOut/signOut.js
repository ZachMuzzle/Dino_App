export let signOutButton = document.getElementById("signOutButton");
let userDisplayId = document.getElementById('userDisplay');
let compStyles = window.getComputedStyle(userDisplayId);

/* 
!! Function is used in Recaptcha.js, scripts.js, and gallery.js
*/
export function displaySignOutButton() {
    if(compStyles.getPropertyValue("display") === "block") {
        signOutButton.style.display = "block";
        }
}

export async function signUserOut() {
    /* 
    !! Will create a api route for firebase to sign out a user
    */
    const response = await fetch('/signOutUser');
    const data = await response.json();
    return data.userWasSignedOut;
}

export async function navbarResize(userSignedIn) {
    if(userSignedIn !== false) { 
        let screenWidth  = window.innerWidth;
        let navBar = document.querySelector('.nav-bar');

        if(screenWidth <= 660) {
            navBar.classList.add('resizeNavbar');
        } else {
            navBar.classList.remove('resizeNavbar');
        }
    }
}