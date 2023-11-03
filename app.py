from fastapi import FastAPI


app = FastAPI()

import pandas as pd
import sqlite3

#importando a tabela csv para o pandas
#filename1 = 'backend/dataBase/basebikes/df_rides.csv'
#filename2 = 'backend/dataBase/basebikes/df_stations.csv'

#df_rides = pd.read_csv(filename1, index_col=0)
#df_station = pd.read_csv(filename2, index_col=0)


#criando/conectando com o banco de dados bikes
conn = sqlite3.connect('bikes.db')
#df_rides.to_sql(name='rides', con=conn)
#df_station.to_sql(name='stations', con=conn)



#comando para verificar as tabelas existentes no BD
#!sqlite3 bikes.db '.tables'

#comando para saber as informações da tabela no banco
#!sqlite3 bikes.db 'PRAGMA table_info(df_rides)'

#comando para ver a tabela direto no pandas
#df_read = pd.read_sql('SELECT * FROM stations', con=conn)

@app.get("/")
def read_root():
    
    return {"Hello": "World"}

