const ridesAPI = 'http://localhost:8000/rides';
const stationAPI = 'http://localhost:8000/stations';

document.addEventListener("DOMContentLoaded", function () {
    listRides();
    listStations();
    document.getElementById('addRideButton').addEventListener('click', showAddRideForm);
    document.getElementById('addStationButton').addEventListener('click', showAddStationForm);

    const btnEdit = document.getElementById("saveRideButton");
    btnEdit.addEventListener("click", function () {
        editRide();
    });

    const btn = document.getElementById("saveStationButton");
    btn.addEventListener("click", function () {
        addStation();
    });
});

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
                button.addEventListener('click', () => showEditRideForm(button.getAttribute('data-id')));
            });
        })
        .catch(error => console.error('Erro ao obter passeios de bicicleta:', error));
}

function showEditRideForm(rideId) {
    const rideForm = document.getElementById('rideModal');
    rideForm.style.display = 'block';

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
}

function resetRideForm() {
    document.getElementById('rideId').value = "";
    document.getElementById('user_gender').value = "";
    document.getElementById('ride_station_start').value = "";
    document.getElementById('ride_station_end').value = "";
    document.getElementById('rideDate').value = "";
    document.getElementById('ride_start_time').value = "";
    document.getElementById('ride_end_time').value = "";
}

function addRide() {
    const gender = document.getElementById('user_gender').value;
    const newInitialStation = document.getElementById('ride_station_start').value;
    const newEndStation = document.getElementById('ride_station_end').value;
    const newDate = document.getElementById('rideDate').value;
    const newStartTime = document.getElementById('ride_start_time').value;
    const newEndTime = document.getElementById('ride_end_time').value;

    fetch(ridesAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_gender: gender,
            station_start: newInitialStation,
            station_end: newEndStation,
            ride_date: newDate,
            time_start: newStartTime,
            time_end: newEndTime
        })
    })
        .then(response => response.json())
        .then(data => {
            listRides();
        })
        .catch(error => console.error('Erro ao adicionar passeio de bicicleta:', error));
}

function editRide() {
    const userId = document.getElementById('rideId').value;
    const gender = document.getElementById('user_gender').value;
    const newInitialStation = document.getElementById('ride_station_start').value;
    const newEndStation = document.getElementById('ride_station_end').value;
    const newDate = document.getElementById('rideDate').value;
    const newStartTime = document.getElementById('ride_start_time').value;
    const newEndTime = document.getElementById('ride_end_time').value;

    fetch(`${ridesAPI}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_gender: gender,
            station_start: newInitialStation,
            station_end: newEndStation,
            ride_date: newDate,
            time_start: newStartTime,
            time_end: newEndTime
        })
    })
        .then(response => response.json())
        .then(data => {
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
                button.addEventListener('click', () => showForm());
            });
        })
        .catch(error => console.error('Erro ao obter estações:', error));
}

function showForm() {
    const rideForm = document.getElementById('stationModal');
    rideForm.style.display = 'block';
}

function showAddStationForm() {
    const rideForm = document.getElementById('stationModal');
    rideForm.style.display = 'block';
    const btn = document.getElementById("addStationButton");
    btn.style.display = "none";
}

function addStation() {
    const station = document.getElementById('station').value;
    const stationNumber = document.getElementById('station_number').value;
    const lat = document.getElementById('lat').value;
    const long = document.getElementById('long').value;

    fetch(stationAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            station: station,
            station_number: stationNumber,
            lat: lat,
            lon: long
        })
    })
        .then(response => response.json())
        .then(data => {
            listStations();
        })
        .catch(error => console.error('Erro ao adicionar estação:', error));
}
