const ridesAPI = 'http://localhost:8000/rides'; // Endpoint da API para manipular os passeios

document.addEventListener("DOMContentLoaded", function() {
    listRides()
})

// Função para listar passeios de bicicleta
function listRides() {
    fetch(ridesAPI)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // Mostra os passeios no subtitulo "passeios de bicicletas" no HTML
            const tableBody = document.getElementById('rideTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear the table body

            data.forEach(ride => {
                // Create a new row for each ride
                const row = tableBody.insertRow(tableBody.rows.length);

                // Create cells and populate them with data
                const idCell = row.insertCell(0);
                idCell.textContent = ride.rowid;

                const nomeCell = row.insertCell(1);
                nomeCell.textContent = ride.user_gender;

                const dataCell = row.insertCell(2);
                dataCell.textContent = ride.ride_date;
            });
        })
        .catch(error => console.error('Erro ao obter passeios de bicicleta:', error));
}

// Função para adicionar um passeio de bicicleta
function addRide() {
    // Coletar dados do formulário
    const userId = document.getElementById('rideId').value;
    const newNome = document.getElementById('rideNome').value;
    const newData = document.getElementById('rideData').value;
    //pensei em adicionar opções de estação pra ser selecionada, mas acho que não tem necessidade

    // Enviar dados ao backend
    fetch(ridesAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userId,
            name: newNome,
            data: newData
        })
    })
        .then(response => response.json())
        .then(data => {
            // Lógica para lidar com a resposta da adição do passeio
            listRides(); // Atualiza a lista de passeios
        })
        .catch(error => console.error('Erro ao adicionar passeio de bicicleta:', error));
}

// Função para editar um passeio de bicicleta
function editRide(rideId, updatedData) {
    fetch(`${ridesAPI}/${rideId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
        .then(response => response.json())
        .then(data => {
            // Lógica para lidar com a resposta da edição do passeio
            listRides(); // Atualiza a lista de passeios
        })
        .catch(error => console.error('Erro ao editar passeio de bicicleta:', error));
}

// Chama a função para listar os passeios ao carregar a página
document.addEventListener('DOMContentLoaded', listRides);
