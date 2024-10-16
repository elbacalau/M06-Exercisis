window.onload = function() {
    
    const invoice = JSON.parse(localStorage.getItem('invoice'));
    
  
    if (invoice) {
        const tableBody = document.querySelector('#invoices-table tbody');

        
        let row = tableBody.insertRow();
        row.insertCell(0).textContent = invoice.customer;
        row.insertCell(1).textContent = invoice.address;
        row.insertCell(2).textContent = invoice.city;
        row.insertCell(3).textContent = invoice.invNumber;
        row.insertCell(4).textContent = invoice.invDate;
        row.insertCell(5).textContent = invoice.total;
        row.insertCell(6).textContent = invoice.discount;
        row.insertCell(7).textContent = invoice.netAmount;
    } else {
        alert('No hay facturas guardadas.');
    }

    $('#invoices-table').DataTable();
};
