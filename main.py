from fastapi import FastAPI
import pandas as pd
import sqlite3

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

#importa a tabela em csv
df_rides = pd.read_csv('basebikes/df_rides.csv', sep=',')

#print(df_rides)

# Cria ou conecta a um banco de dados SQLite
conn = sqlite3.connect('rides')
cursor = conn.cursor()

# Inserir os dados do DataFrame na tabela SQLite
df_rides.to_sql('corridas', conn, if_exists='replace', index=False)

@app.get("/import-excel")
def import_excel_data():
    df_rides = pd.read_excel('basebikes/df_rides.csv')
    conn = sqlite3.connect('rides.db')
    df_rides.to_sql('corridas', conn, if_exists='replace', index=False)
    return {"message": "Dados importados com sucesso"}
