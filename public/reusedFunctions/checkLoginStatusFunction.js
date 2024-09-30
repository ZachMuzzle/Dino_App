export async function checkLoginStatus(userSignedIn) {
    if(userSignedIn === null) {
        const response = await fetch('/checkLoginStatus');
        const data = await response.json();    
        userSignedIn = data.userSignedIn 
    }
    return userSignedIn;
}