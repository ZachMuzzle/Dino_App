/* 
 * File for storing all javascript effects for webpage. Mostly animations
*/
export function addZoomEffect() {
    const popupMessageId = document.getElementById('popupMessage')
    popupMessageId.classList.add('zoom');
}

export function removeZoomEffect() {
    const popupMessageId = document.getElementById('popupMessage')
    popupMessageId.classList.remove('zoom');
}

export function addShakeEffect() {
    const popupMessageId = document.getElementById('popupMessage')
    popupMessageId.classList.add('shake');
}

export function removeShakeEffect() {
    const popupMessageId = document.getElementById('popupMessage')
    popupMessageId.classList.remove('shake');
}