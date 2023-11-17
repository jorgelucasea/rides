from sqlite3 import Connection
from pydantic import BaseModel

class Station(BaseModel):
    rowid: int | str
    station: str
    station_number: str | int
    station_name: str
    lat: str | float
    lon: str | float

class StationAdd(BaseModel):
    station: str
    station_number: int
    station_name: str
    lat: float
    lon: float

class StationUpdate(BaseModel):
    station: str
    station_name: str
    lat: float | str    
    lon: float | str

def get_all_stations(conn: Connection):
    cursor = conn.cursor()
    cursor.execute("SELECT rowid, station, station_number, station_name, lat, lon FROM stations")
    data = cursor.fetchall()

    return data

def create_station(conn: Connection, station: StationAdd):
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO stations (station, station_number, station_name, lat, lon) VALUES (?, ?, ?, ?, ?)",
        (station.station, station.station_number, station.station_name, station.lat, station.lon),
    )
    conn.commit()
    return station

def update_station(conn: Connection, station):
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE stations SET station = ?, station_name = ?, lat = ?, lon = ?, station_number = ? WHERE rowid = ?",
        (station.station ,station.station_name, station.lat, station.lon, station.station_number, station.rowid)
    )
    conn.commit()
    
    return station

def get_station_by_id(conn: Connection, station_id: int):
    cursor = conn.cursor()
    cursor.execute("SELECT rowid, station, station_number, station_name, lat, lon FROM stations WHERE rowid = ?", (station_id,))
    data = cursor.fetchone()

    return data