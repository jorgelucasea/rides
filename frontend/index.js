const ridesAPI = 'http://localhost:8000/rides';
const stationAPI = 'http://localhost:8000/stations';

document.addEventListener("DOMContentLoaded", function () {
    listRides();
    listStations();
    document.getElementById('addRideButton').addEventListener('click', showAddRideForm);
    document.getElementById('addStationButton').addEventListener('click', showAddStationForm);
})
// Pego o botão para adicionar um evento click que quando chamado edit algum ride.
let station_id;
let ISEDITING = true;
let ride_id;

function fecharModalStation() {
    const fecharModalButton = document.querySelectorAll("#fecharModal");
    console.log(fecharModalButton);
    fecharModalButton.forEach(element => {
        element.addEventListener("click", () => closeModal("stationModal"))
    })
}

function fecharModalRides() {
    const fecharModalButton = document.querySelectorAll("#fecharModal");
    console.log(fecharModalButton);
    fecharModalButton.forEach(element => {
        element.addEventListener("click", () => closeModal("rideModal"))
    })
}

// Função para listar passeios de bicicleta
function listRides() {
    fetch(ridesAPI)
        .then(response => response.json())
        .then(data => {
            const rideTable = document.getElementById('rideTable');
            const tbody = rideTable.querySelector('tbody');
            tbody.innerHTML = '';

            data.forEach(ride => {
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
                button.addEventListener('click', () => {
                    ISEDITING = true
                    showEditRideForm(button.getAttribute('data-id'))});
            });
        })
        .catch(error => console.error('Erro ao obter passeios de bicicleta:', error));
}

function showEditRideForm(rideId) {
    const rideForm = document.getElementById('rideModal');
    rideForm.style.display = 'block';
    ride_id = rideId;

    fetch(`${ridesAPI}/${rideId}`)
        .then(response => response.json())
        .then(ride => {
            document.getElementById('rideId').value = ride.rowid;
            document.getElementById('user_gender').value = ride.user_gender;
            document.getElementById('ride_station_start').value = ride.station_start;
            document.getElementById('ride_station_end').value = ride.station_end;
            document.getElementById('rideDate').value = ride.ride_date;
            document.getElementById('ride_start_time').value = ride.time_start;
            document.getElementById('ride_end_time').value = ride.time_end;
        })
        .catch(error => console.error('Error fetching ride data:', error));
}

function showAddRideForm() {
    const rideForm = document.getElementById('rideModal');
    rideForm.style.display = 'block';
    resetRideForm();
    ISEDITING = false
    fecharModalRides()
}

function resetRideForm() {
    document.getElementById('rideId').value = "";
    document.getElementById('user_gender').value = "";
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
    // const rideDuration = document.getElementById('ride_duration');
    // rideDuration.style.display = "block"
    // const rideLate = document.getElementById('ride_late');
    // rideLate.style.display = "block"
}
// Função para adicionar um passeio de bicicleta
function addRide() {
    const gender = document.getElementById('user_gender').value;
    const newInitialStation = document.getElementById('ride_station_start').value;
    const newEndStation = document.getElementById('ride_station_end').value;
    const newDate = document.getElementById('rideDate').value;
    const newStartTime = document.getElementById('ride_start_time').value;
    const newEndTime = document.getElementById('ride_end_time').value;
    const userBirthdate = document.getElementById('user_birthdate').value;
    const userResidence = document.getElementById('user_residence').value;
    let j = {
        user_gender: gender,
        user_birthdate: userBirthdate,
        user_residence: userResidence,
        ride_date: newDate,
        time_start: newStartTime,
        time_end: newEndTime,
        station_start: newInitialStation,
        station_end:newEndStation,
        ride_duration: "10.2",
        ride_late: "false"
    }
    console.log(j)
    fetch(ridesAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_gender: gender,
            user_birthdate: userBirthdate,
            user_residence: userResidence,
            ride_date: newDate,
            time_start: newStartTime,
            time_end: newEndTime,
            station_start: newInitialStation,
            station_end:newEndStation,
            ride_duration: "10.2",
            ride_late: "false"
        })
    })
        .then(response => response.json())
        .then(data => {
            closeModal("rideModal")
            listRides();
        })
        .catch(error => console.error('Erro ao adicionar passeio de bicicleta:', error));
}

function editRide() {
    const gender = document.getElementById('user_gender').value;
    const newInitialStation = document.getElementById('ride_station_start').value;
    const newEndStation = document.getElementById('ride_station_end').value;
    const newDate = document.getElementById('rideDate').value;
    const newStartTime = document.getElementById('ride_start_time').value;
    const newEndTime = document.getElementById('ride_end_time').value;
    const userBirthdate = document.getElementById('user_birthdate').value;
    const userResidence = document.getElementById('user_residence').value;

    fetch(`${ridesAPI}/${ride_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_gender: gender,
            user_birthdate: userBirthdate,
            user_residence: userResidence,
            ride_date: newDate,
            time_start: newStartTime,
            time_end: newEndTime,
            station_start: newInitialStation,
            station_end:newEndStation,
            ride_duration: "10.2",
            ride_late: "false"
        })
    })
        .then(response => response.json())
        .then(data => {
            closeModal("rideModal")
            listRides();
        })
        .catch(error => console.error('Erro ao editar passeio de bicicleta:', error));
}

function listStations() {
    fetch(stationAPI)
        .then(response => response.json())
        .then(data => {
            const stationTable = document.getElementById('stationTable');
            const tbody = stationTable.querySelector('tbody');
            tbody.innerHTML = '';

            data.forEach(station => {
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
                button.addEventListener('click', () => {
                    ISEDITING = true
                    showForm(button.getAttribute("data-id"))});
            });
        })
        .catch(error => console.error('Erro ao obter estações:', error));
}
function showForm(station_id_param) {
    const rideForm = document.getElementById('stationModal');
    rideForm.style.display = 'block';
    ISEDITING = true
    listEditStation(station_id_param)
    station_id = station_id_param
}

function listEditStation(station_id) {
    fecharModalStation()
    ISEDITING = true
    fetch(`${stationAPI}/${station_id}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('station').value = data.station;
            document.getElementById('station_number').value = data.station_number;
            document.getElementById('lat').value = data.lat
            document.getElementById('long').value = data.lon
            document.getElementById('station_name').value = data.station_name;
        })
}

function editStation() {
    const station = document.getElementById('station').value;
    const stationNumber = document.getElementById('station_number').value;
    const lat = document.getElementById('lat').value;
    const long = document.getElementById('long').value;
    const stationName = document.getElementById('station_name').value

    let j = {
        rowid: station_id,
                station: station,
                station_number: stationNumber,
                station_name: stationName,
                lat: lat,
                lon: long,
    }

    console.log(j);
    fetch(`${stationAPI}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                rowid:station_id,
                station: station,
                station_number: stationNumber,
                station_name: stationName,
                lat: lat,
                lon: long,
            
        })
    }).then(res => console.log(res)).then(() => listStations()).then(() => closeModal("stationModal"))
}

const btnRide = document.getElementById("saveRideButton")
btnRide.addEventListener("click", function() {
    if (ISEDITING) editRide()
    else addRide()
})

const btn = document.getElementById("saveStationButton")
btn.addEventListener("click", function() {
    if (ISEDITING) editStation()
    else addStation()
})

function showAddStationForm() {
    const rideForm = document.getElementById('stationModal');
    rideForm.style.display = 'block';
    const btn = document.getElementById("addStationButton");
    ISEDITING = false;
    fecharModalStation()
}

function addStation() {
    ISEDITING = false
    const station = document.getElementById('station').value;
    const stationNumber = document.getElementById('station_number').value;
    const lat = document.getElementById('lat').value;
    const long = document.getElementById('long').value;
    const stationName = document.getElementById('station_name').value


    fetch(stationAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            station: station,
            station_name: stationName,
            station_number: stationNumber,
            lat: lat,
            lon: long
        })
    })
        .then(response => response.json())
        .then(data => {
            closeModal("stationModal")
            listStations();
        })
        .catch(error => console.error('Erro ao adicionar estação:', error));
    // Enviar dados ao backend
}

function resetform() {
    document.getElementById('station').value = ""
    document.getElementById('station_number').value = ""
    document.getElementById('lat').value = ""
    document.getElementById('long').value = ""
    document.getElementById('station_name').value = "";
}

function closeModal(modalId) {
    $(`#${modalId}`).hide();
    resetform()
    resetRideForm()
}
