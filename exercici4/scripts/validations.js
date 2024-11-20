function validateRequired(input, fieldName) {
  if (!input.value.trim()) {
    highlightError(input, `${fieldName} is required.`);
    return false;
  }
  return true;
}

function validateNumber(input, fieldName) {
  if (!input.value.trim() || parseFloat(input.value) <= 0) {
    highlightError(
      input,
      `${fieldName} must be a valid number greater than 0.`
    );
    return false;
  }
  return true;
}

function clearErrors() {
  document
    .querySelectorAll(".error")
    .forEach((el) => el.classList.remove("error"));
}

function validateForm() {
  clearErrors();

  const customer = document.getElementById("customer");
  const address = document.getElementById("address");
  const city = document.getElementById("city");
  const invNumber = document.getElementById("number");
  const invDate = document.getElementById("date");

  const isValid =
    validateRequired(customer, "Customer Name") &
    validateRequired(address, "Full Address") &
    validateRequired(city, "City Name") &
    validateNumber(invNumber, "Invoice Number") &
    validateDate(invDate, "Invoice Date");

  return !!isValid; // Convierte a booleano
}
