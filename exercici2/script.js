


function mostrarValors(event) {
    event.preventDefault();
    
    const form = document.forms[0];
    const name = form.elements['name'].value;
    const cognom = form.elements['cognom'].value;

    const result = document.getElementById("result");
    result.innerHTML = "Hola " + name + " " + cognom;

}





function validationText(text) {
    var errorElement = document.getElementById("error");

    // styles 
    errorElement.style = "color: red; font-weight: bolder; font-family: Georgia, serif; font-size: 30px;";
    
    invalidChars = ['>', '<', '(', ')']

    if (text.length === 0) {
        errorElement.innerHTML = "Introdueix un text";
        return false;
    }

    for (let i = 0; i < invalidChars.length; i++) {
        if (text.includes(invalidChars[i])) {
            errorElement.innerHTML = "Text Invalid";
            return false;
        }
    }
    errorElement.innerHTML = "";
    return true;
}



