import logging
from fastapi import FastAPI
import pandas as pd
import uvicorn
import sqlite3
from database import database
from handlers import stations, rides
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your specific origins if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#importando a tabela csv para o pandas
#criando/conectando com o banco de dados bikes
#comando para verificar as tabelas existentes no BD
#!sqlite3 bikes.db '.tables'

#comando para saber as informações da tabela no banco
#!sqlite3 bikes.db 'PRAGMA table_info(df_rides)'

#comando para ver a tabela direto no pandas
#df_read = pd.read_sql('SELECT * FROM stations', con=conn)
conn = sqlite3.connect('database/bikes.db')
cr = conn.cursor()

@app.get("/stations", response_model=List[stations.Station])
async def get_stations():
    data = stations.get_all_stations(conn)
    stations_model = [stations.Station(rowid=row[0],station=row[1], station_number=row[2], station_name=row[3], lat=row[4], lon=row[5]) for row in data]
    return stations_model

@app.post("/stations", response_model=stations.StationAdd)
async def create_station(station: stations.StationAdd):
    created_station = stations.create_station(conn, station)
    return created_station

@app.put("/stations")
async def update_station(station_data: stations.Station):
    logging.debug(f"Received payload: {station_data}")
    updated_station = stations.update_station(conn, station_data)
    return updated_station

@app.get("/stations/{station_id}", response_model=stations.Station)
async def get_station_by_id(station_id: int):
    station_by_id = stations.get_station_by_id(conn, station_id)
    station_model = stations.Station(rowid=station_by_id[0], station=station_by_id[1], station_number=station_by_id[2], station_name=station_by_id[3], lat=station_by_id[4], lon=station_by_id[5])

    return station_model

@app.get("/rides", response_model=List[rides.RideData])
async def get_rides():
    data = rides.get_all_rides(conn)
    rides_model = [rides.RideData(rowid=row[0],user_gender=row[1], user_birthdate=row[2], user_residence=row[3], ride_date=row[4], time_start=row[5], time_end=row[6], station_start=row[7], station_end=row[8], ride_duration=row[9], ride_late=row[10]) for row in data]
    return rides_model

@app.get("/rides/{ride_id}", response_model=rides.RideData)
async def get_ride_by_ID(ride_id: int):
    ride_by_id = rides.get_ride_by_ID(conn, ride_id)
    ride_model = rides.RideData(rowid=ride_by_id[0],
            user_gender=ride_by_id[1],
            user_birthdate=ride_by_id[2],
            user_residence=ride_by_id[3],
            ride_date=ride_by_id[4],
            time_start=ride_by_id[5],
            time_end=ride_by_id[6],
            station_start=ride_by_id[7],
            station_end=ride_by_id[8],
            ride_duration=ride_by_id[9],
            ride_late=ride_by_id[10])
    return ride_model

@app.post("/rides", response_model=rides.RideDataUpdate)
async def create_ride(ride: rides.RideDataUpdate):
    created_ride = rides.create_rides(conn, ride)
    return created_ride

@app.put("/rides/{ride_id}", response_model=rides.RideDataUpdate)
async def update_rides(ride_id: int, ride: rides.RideDataUpdate):
    updated_ride = rides.update_rides(conn, ride_id, ride)
    return updated_ride

if __name__ == "__main__":
    #database.newDB(conn)
    uvicorn.run(app, host="0.0.0.0", port=8000)