var arr = [];


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

function sumOne() {

    // guarda el valor de number
    let number = document.getElementById("name").value;

    // agrega el numero a la llista en cas que el valor no estigue buit
    if (validationText(number)) {
        arr.push(number);
        updateContador();
    }

    errorElement.innerHTML = ""
    updateContador();
}

function deleteOne(index) {
    arr.splice(index, 1)
    updateContador()
    var resultElement = "";
}


function updateContador() {
    // variables per guardar els elements del DOM
    var resultElement = document.getElementById("result");
 
    resultElement.innerHTML = arr.length;
    var resultListElement = document.getElementById("resultList");
    var resultElementHTML = "";

    arr.forEach((element, index) => {
        resultElementHTML += "<li>" + element + "  <button onclick='deleteOne(" + index + ")' >Borra</button> </li>"
    });
    resultListElement.innerHTML = resultElementHTML
}


