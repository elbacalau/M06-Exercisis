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

  updateTotal();

}

function updateAmount(input) {
  let fila = input.parentNode.parentNode;
  
  let qty = parseFloat(fila.querySelector('input[name="qty"]').value) || 0;
  let rate = parseFloat(fila.querySelector('input[name="rate"]').value) || 0;
  let amount = qty * rate;
  fila.querySelector('input[name="amount"]').value = amount.toFixed(2);

  updateTotal();
  
}


function updateTotal() {
  let tabla = document.getElementById("table");
  let total = document.getElementById("total");

  let totalValue = 0;

  for (let i = 1; i < tabla.rows.length; i++) {
    let amount = tabla.rows[i].cells[4].querySelector('input[name="amount"]').value;

    if (amount) {
      totalValue += parseFloat(amount);
    }

    total.value = totalValue.toFixed(2);
    
  }

  calcNetAmount(totalValue);

  if (tabla.rows.length <= 1) {
    total.value = "0.00"
    document.getElementById("net-amount").value = "0.00";
  }

}


function calcAmount(quantity, rate) {
  return quantity * rate;
}


function haveDiscount() {
  let discount = document.getElementById("discount");
  return discount.value.length > 0;
}


function calcNetAmount(total) {
  let netAmount = document.getElementById("net-amount");
  let discount = parseFloat(document.getElementById("discount").value) || 0;


  let discountTotal = total * (discount / 100);
  let finalAmount = total - discountTotal;

  netAmount.value = finalAmount.toFixed(2);

}

document.getElementById("discount").oninput = function () {
  let total = parseFloat(document.getElementById("total").value) || 0;
  calcAmount(total);
}


function saveInvoice() {
  let customer = document.getElementById("customer").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let invNumber = document.getElementById("number").value;
  let invDate = document.getElementById("date").value;
  let total = document.getElementById("total").value;
  let discount = document.getElementById("discount").value;
  let netAmount = document.getElementById("net-amount").value;

  let tableData = [];
  let table = document.getElementById("table");


  for (let i = 1; i < table.rows.length; i++) {
    let row = table.rows[i];
    let particular = row.cells[1].querySelector('input[name="particular"]').value;
    let qty = row.cells[2].querySelector('input[name="qty"]').value;
    let rate = row.cells[3].querySelector('input[name="rate"]').value;
    let amount = row.cells[4].querySelector('input[name="amount"]').value;

    tableData.push({ particular, qty, rate, amount });
  }

  let invoice = {
    customer,
    address,
    city,
    invNumber,
    invDate,
    total,
    discount,
    netAmount,
    items: tableData
  };


  localStorage.setItem("invoice", JSON.stringify(invoice));
  console.log("Invoice saved successfully");
  console.log(invoice);
  
  

}

document.querySelector('.btn-factures').addEventListener('click', saveInvoice);


window.onload = function () {
  addRow();
};

let addButton = document.querySelector(".btn-th");
addButton.onclick = addRow;