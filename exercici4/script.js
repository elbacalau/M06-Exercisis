function addRow() {
  let tabla = document.getElementById("table");

  
  let fila = tabla.insertRow(-1);

  
  let celdaID = fila.insertCell(0);
  let celdaParticular = fila.insertCell(1);
  let celdaQty = fila.insertCell(2);
  let celdaRate = fila.insertCell(3);
  let celdaAmount = fila.insertCell(4);
  let celdaBoton = fila.insertCell(5);


  celdaID.innerHTML = tabla.rows.length - 1;
  celdaParticular.innerHTML = '<input type="text" name="particular">';
  celdaQty.innerHTML = '<input type="number" name="qty" oninput="updateAmount(this)">';
  celdaRate.innerHTML = '<input type="number" name="rate" oninput="updateAmount(this)">';
  celdaAmount.innerHTML = '<input type="text" name="amount" readonly>'; 
  celdaBoton.innerHTML = '<button class="delete-btn-th" onclick="deleteRow(this)">-</button>';

}

function deleteRow(boton) {
  let fila = boton.parentNode.parentNode;
  fila.parentNode.removeChild(fila);

  
  let tabla = document.getElementById("table");
  for ( let i = 1; i < tabla.rows.length; i++ ) {
    tabla.rows[i].cells[0].innerHTML = i; 
  }

}

function updateAmount(input) {
  let fila = input.parentNode.parentNode;
  
  let qty = parseFloat(fila.querySelector('input[name="qty"]').value) || 0;
  let rate = parseFloat(fila.querySelector('input[name="rate"]').value) || 0;
  let amount = qty * rate;
  fila.querySelector('input[name="amount"]').value = amount.toFixed(2);
}


function calcAmount(quantity, rate) {
  return quantity * rate;
}


window.onload = function () {
  addRow();
};

let addButton = document.querySelector(".btn-th");
addButton.onclick = addRow;