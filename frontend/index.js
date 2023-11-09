const ridesAPI = 'http://localhost:8000/rides'; // Endpoint da API para manipular os passeios
const stationAPI = 'http://localhost:8000/stations'
// Função ao carregar a página chama o listRides, que carrega a list na tabela.
document.addEventListener("DOMContentLoaded", function() {
    listRides()
    listStations()
    document.getElementById('addRideButton').addEventListener('click', showAddRideForm);
    document.getElementById('addStationButton').addEventListener('click', showAddStationForm);
})
// Pego o botão para adicionar um evento click que quando chamado edit algum ride.
const btnEdit = document.getElementById("saveRideButton")
btnEdit.addEventListener("click", function() {
        editRide()
})

const btn = document.getElementById("saveStationButton")
btn.addEventListener("click", function() {
        addStation()
})

// Função para listar passeios de bicicleta
function listRides() {
    fetch(ridesAPI)
        .then(response => response.json())
        .then(data => {
            // Mostra os passeios no subtitulo "passeios de bicicletas" no HTML
            const rideTable = document.getElementById('rideTable');
            const tbody = rideTable.querySelector('tbody');
            tbody.innerHTML = '';

            data.forEach(ride => {
                // Create a new row for each ride
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${ride.rowid}</td>
                    <td>${ride.station_start}</td>
                    <td>${ride.station_end}</td>
                    <td>${ride.ride_date}</td>
                    <td>${ride.time_start}</td>
                    <td>${ride.time_end}</td>
                    <td><button class="btn btn-primary edit-button" data-id="${ride.rowid}">Edit</button></td>
                `;
                tbody.appendChild(row);
            });

            const editButtons = document.querySelectorAll('.edit-button');
            editButtons.forEach(button => {
                button.addEventListener('click', () => showEditRideForm(button.getAttribute('data-id')));
            });

            
        })
        .catch(error => console.error('Erro ao obter passeios de bicicleta:', error));
}

function showEditRideForm(rideId) {
    // Show the form for editing a ride and populate it with data
    const rideForm = document.getElementById('rideForm');
    rideForm.style.display = 'block';

    // Fetch ride data by ID and populate the form
    fetch(`${ridesAPI}/${rideId}`)
        .then(response => response.json())
        .then(ride => {
            document.getElementById('rideId').value = ride.rowid;
            document.getElementById('user_gender').value = ride.user_gender;
            document.getElementById('user_birthdate').value = ride.user_birthdate;
            document.getElementById('user_residence').value = ride.user_residence;
            document.getElementById('ride_duration').value = ride.ride_duration;
            document.getElementById('ride_late').value = ride.ride_late;
            document.getElementById('ride_station_start').value = ride.station_start;
            document.getElementById('ride_station_end').value = ride.station_end;
            document.getElementById('rideDate').value = ride.ride_date;
            document.getElementById('ride_start_time').value = ride.time_start;
            document.getElementById('ride_end_time').value = ride.time_end;

            
        })
        .catch(error => console.error('Error fetching ride data:', error));
}
function showAddRideForm() {
    // Show the form for adding a new ride
    const rideForm = document.getElementById('rideForm');
    rideForm.style.display = 'block';
    resetRideForm();
}

function resetRideForm() {
    
    document.getElementById('rideId').value = "";
    document.getElementById('user_gender').value = "";
    document.getElementById('user_birthdate').value = "";
    document.getElementById('user_residence').value = "";
    document.getElementById('ride_duration').value = "";
    document.getElementById('ride_late').value = "";
    document.getElementById('ride_station_start').value = "";
    document.getElementById('ride_station_end').value = "";
    document.getElementById('rideDate').value = "";
    document.getElementById('ride_start_time').value = "";
    document.getElementById('ride_end_time').value = "";

    const gender = document.getElementById('user_gender');
    gender.style.display = "block"
    const userBirthdate = document.getElementById('user_birthdate');
    userBirthdate.style.display = "block"
    const userResidence = document.getElementById('user_residence');
    userResidence.style.display = "block"
    const rideDuration = document.getElementById('ride_duration');
    rideDuration.style.display = "block"
    const rideLate = document.getElementById('ride_late');
    rideLate.style.display = "block"
}
// Função para adicionar um passeio de bicicleta
function addRide() {
    
    // Coletar dados do formulário
    const gender = document.getElementById('user_gender').value;
    const userBirthdate = document.getElementById('user_birthdate').value;
    const userResidence = document.getElementById('user_residence').value;
    const rideDuration = document.getElementById('ride_duration').value;
    const rideLate = document.getElementById('ride_late').value;
    const newInitialStation = document.getElementById('ride_station_start').value;
    const newEndStation = document.getElementById('ride_station_end').value;
    const newDate = document.getElementById('rideDate').value;
    const newStartTime = document.getElementById('ride_start_time').value;
    const newEndTime = document.getElementById('ride_end_time').value;
    //pensei em adicionar opções de estação pra ser selecionada, mas acho que não tem necessidade

    // Enviar dados ao backend
    fetch(ridesAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                user_gender: gender,
                user_birthdate: userBirthdate,
                user_residence: userResidence,
                ride_date: newDate,
                time_start: newStartTime,
                time_end: newEndTime,
                station_start: newInitialStation,
                station_end:newEndStation,
                ride_duration: rideDuration,
                ride_late: rideLate
            }
        )
    })
        .then(response => response.json())
        .then(data => {
            // Lógica para lidar com a resposta da adição do passeio
            listRides(); // Atualiza a lista de passeios
        })
        .catch(error => console.error('Erro ao adicionar passeio de bicicleta:', error));
}

// Função para editar um passeio de bicicleta
function editRide() {
    const userId = document.getElementById('rideId').value;
    const gender = document.getElementById('user_gender').value;
    const userBirthdate = document.getElementById('user_birthdate').value;
    const userResidence = document.getElementById('user_residence').value;
    const rideDuration = document.getElementById('ride_duration').value;
    const rideLate = document.getElementById('ride_late').value;
    const newInitialStation = document.getElementById('ride_station_start').value;
    const newEndStation = document.getElementById('ride_station_end').value;
    const newDate = document.getElementById('rideDate').value;
    const newStartTime = document.getElementById('ride_start_time').value;
    const newEndTime = document.getElementById('ride_end_time').value;
    console.log(userId)
    fetch(`${ridesAPI}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                user_gender: gender,
                user_birthdate: userBirthdate,
                user_residence: userResidence,
                ride_date: newDate,
                time_start: newStartTime,
                time_end: newEndTime,
                station_start: newInitialStation,
                station_end:newEndStation,
                ride_duration: rideDuration,
                ride_late: rideLate
            }
        )
    })
        .then(response => response.json())
        .then(data => {
            // Lógica para lidar com a resposta da edição do passeio
            listRides(); // Atualiza a lista de passeios
        })
        .catch(error => console.error('Erro ao editar passeio de bicicleta:', error));
}


function listStations() {
    fetch(stationAPI)
        .then(response => response.json())
        .then(data => {
            // Mostra os passeios no subtitulo "passeios de bicicletas" no HTML
            const rideTable = document.getElementById('stationTable');
            const tbody = rideTable.querySelector('tbody');
            tbody.innerHTML = '';

            data.forEach(station => {
                // Create a new row for each ride
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${station.station}</td>
                    <td>${station.station_number}</td>
                    <td>${station.lat}</td>
                    <td>${station.lon}</td>
                    <td><button class="btn btn-primary edit-button1" data-id="${station.rowid}">Edit</button></td>
                `;
                tbody.appendChild(row);
            });

            const editButtons = document.querySelectorAll('.edit-button1');
            editButtons.forEach(button => {
                button.addEventListener('click', () => showForm());
            });

            
        })
        .catch(error => console.error('Erro ao obter passeios de bicicleta:', error));
}

function showForm() {
    const rideForm = document.getElementById('stationForm');
    rideForm.style.display = 'block';
}

function showAddStationForm() {
    const rideForm = document.getElementById('stationForm');
    rideForm.style.display = 'block';

    const btn = document.getElementById("addStationButton")
    btn.style.display = "none"
}

function addStation() {
    
    // Coletar dados do formulário
    const station = document.getElementById('station').value;
    const stationNumber = document.getElementById('station_number').value;
    const lat = document.getElementById('lat').value;
    const long = document.getElementById('long').value;
    const stationName = document.getElementById('station_name').value
    //pensei em adicionar opções de estação pra ser selecionada, mas acho que não tem necessidade
    console.log("button clicked")
    // Enviar dados ao backend
    fetch(stationAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                station: station,
                station_number: stationNumber,
                station_name: stationName,
                lat: lat,
                lon: long,
            }
        )
    })
        .then(response => response.json())
        .then(data => {
            // Lógica para lidar com a resposta da adição do passeio
            listStations(); // Atualiza a lista de passeios
        })
        .catch(error => console.error('Erro ao adicionar passeio de bicicleta:', error));
}
