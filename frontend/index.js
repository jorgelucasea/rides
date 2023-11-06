const ridesAPI = '/rides'; // Endpoint da API para manipular os passeios

// Função para listar passeios de bicicleta
function listRides() {
    fetch(ridesAPI)
        .then(response => response.json())
        .then(data => {
            // Mostra os passeios no subtitulo "passeios de bicicletas" no HTML
            const ridesList = document.getElementById('rideList');
            ridesList.innerHTML = ''; // Limpa a lista

            data.forEach(ride => {
                const listItem = document.createElement('li');
                listItem.textContent = ride.name;
                ridesList.appendChild(listItem);
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
