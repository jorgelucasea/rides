from fastapi import FastAPI
import pandas as pd
import uvicorn
import sqlite3
from database import database
from handlers import stations, rides
from typing import List

app = FastAPI()

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
    stations_model = [stations.Station(station=row[0], station_number=row[1], station_name=row[2], lat=row[3], lon=row[4]) for row in data]
    return stations_model

@app.post("/stations", response_model=stations.Station)
async def create_station(station: stations.Station):
    created_station = stations.create_station(conn, station)
    return created_station

@app.put("/stations/{station_number}", response_model=stations.Station)
async def update_station(station_number: int, station_data: stations.Station):
    updated_station = stations.update_station(conn, station_number, station_data)
    return updated_station

@app.get("/rides", response_model=List[rides.RideData])
async def get_rides():
    data = rides.get_all_rides(conn)
    rides_model = [rides.RideData(rowid=row[0],user_gender=row[1], user_birthdate=row[2], user_residence=row[3], ride_date=row[4], time_start=row[5], time_end=row[6], station_start=row[7], station_end=row[8], ride_duration=row[9], ride_late=row[10]) for row in data]
    return rides_model

@app.post("/rides")
async def create_ride(ride: rides.RideData):
    created_ride = rides.create_rides(conn, ride)
    return created_ride

@app.put("/rides/{ride_id}", response_model=rides.RideDataUpdate)
async def update_rides(ride_id: int, ride: rides.RideDataUpdate):
    updated_ride = rides.update_rides(conn, ride_id, ride)
    return updated_ride

if __name__ == "__main__":
    #database.newDB(conn)
    uvicorn.run(app, host="0.0.0.0", port=8000)