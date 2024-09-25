async function fetchData() {
    const url = "https://dragonball-api.com/api/characters";

    try {
        const localData = localStorage.getItem("characters");
        let characterData = [];

        if (localData) {
            
            characterData = JSON.parse(localData);
        } else {
            // si no hay datos obtenerlos de la API
            const response = await fetch(url);
            const data = await response.json();

            if (Array.isArray(data.items)) {
                characterData = data.items.map((item, index) => ({
                    index: index + 1,
                    name: item.name,
                    description: item.description || "No description available",
                    image: item.image,
                }));

                
                localStorage.setItem("characters", JSON.stringify(characterData));
            } else {
                document.querySelector("#table-container").innerHTML = "No hay personajes";
                return;
            }
        }

        
        const table = $("#tabla").DataTable({
            paging: true,
            pageLength: 5,
            order: [[0, "asc"]],
            columnDefs: [{ orderable: false, targets: [2, 3] }],
            language: {
                search: "Buscar:",
                lengthMenu: "Mostrar _MENU_ filas",
                info: "Mostrando _START_ a _END_ de _TOTAL_ filas",
                infoEmpty: "No hay filas disponibles",
                zeroRecords: "No se encontraron coincidencias",
                paginate: {
                    first: "Primero",
                    last: "Último",
                    next: "Siguiente",
                    previous: "Anterior",
                },
            },
        });

        
        characterData.forEach((character) => {
            const row = `
                <tr>
                    <td>${character.index}</td>
                    <td>${character.name}</td>
                    <td class="desc-item">${character.description}</td>
                    <td><img src="${character.image}" style="width: 50px; height: auto;" /></td>
                    <td><button class="delete-btn" onClick="deleteChar(this)">Borrar</button></td>
                </tr>
            `;
            table.row.add($(row)).draw(false);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();

function deleteChar(button) {
    const table = $("#tabla").DataTable();
    const row = $(button).closest("tr");

    const index = table.row(row).index();
    const characterData = JSON.parse(localStorage.getItem("characters"));

    
    characterData.splice(index, 1);

    
    localStorage.setItem("characters", JSON.stringify(characterData));

    
    table.row(row).remove().draw(false);
}
