from sqlite3 import Connection
from pydantic import BaseModel

class Station(BaseModel):
    station: str
    station_number: int
    station_name: str
    lat: float
    lon: float

class StationUpdate(BaseModel):
    station: str
    station_name: str
    lat: float
    lon: float

def get_all_stations(conn: Connection):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM stations")
    data = cursor.fetchall()

    return data

def create_station(conn: Connection, station: Station):
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO stations (station, station_number, station_name, lat, lon) VALUES (?, ?, ?, ?, ?)",
        (station.station, station.station_number, station.station_name, station.lat, station.lon),
    )
    conn.commit()
    return station

def update_station(conn: Connection, station_number: int, station: Station):
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE stations SET station = ?, station_name = ?, lat = ?, lon = ? WHERE station_number = ?",
        (station.station ,station.station_name, station.lat, station.lon, station_number),
    )
    conn.commit()
    
    return {"station_number": station_number, **station.model_dump()}
