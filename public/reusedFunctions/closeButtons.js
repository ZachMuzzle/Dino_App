export function closeButtons(closeImage,modal,model,popupModel) {

    for(let i = 0; i < closeImage.length; i++) {
        closeImage[i].onclick = function() {
            if(closeImage[i] == closeImage[0]) {
                model.style.display = "none";
                document.getElementById('popupMessage').style.display = 'none';
                
                if(document.getElementById("popupValue")) {
                    document.getElementById("popupValue").remove();
                }

            }
            else if (closeImage[i] == closeImage[1]) {
                modal.style.display = "none";
                document.querySelector('#img-src-update').removeAttribute('src')
                document.querySelector('#caption-update').innerHTML = "";

               if(document.querySelectorAll('.submitButton')[0]) {
                   
                   document.querySelectorAll('.submitButton')[0].remove();
            } 

            }
            else if (closeImage[i] == closeImage[2]) {
                popupModel.style.display = "none";
                
                if(document.getElementById("popupValue")) {
                    document.getElementById("popupValue").remove();
                }
            }
        }
    }
}