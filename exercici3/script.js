async function fetchData() {
    const url = 'https://dragonball-api.com/api/characters';


    try {
        const response = await fetch(url)
        const data = await response.json();


        if (Array.isArray(data.items)) {

            const tableBody = document.querySelector('#characters-body');
            tableBody.innerHTML = '';

            data.items.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.description || 'No description available'}</td>
                    <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto;"/></td>
                    `;

                tableBody.appendChild(row);
            });


            $('#tabla').DataTable(

            );

        } else {
            document.querySelector('#table-container').innerHTML = 'No hay personajes';
        }

    } catch (error) {
        console.error(error);
    }

}


fetchData();