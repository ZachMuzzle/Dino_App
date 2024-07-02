let signOutButton = document.getElementById("signOutButton");
let userDisplayId = document.getElementById('userDisplay');
let compStyles = window.getComputedStyle(userDisplayId);

export function displaySignOutButton() {
    if(compStyles.getPropertyValue("display") === "block") {
        signOutButton.style.display = "block";
        }
}