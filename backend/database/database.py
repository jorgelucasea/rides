import pandas as pd
from sqlite3 import Connection

def newDB(conn: Connection):
    filename1 = 'database/basebikes/df_rides.csv'
    filename2 = 'database/basebikes/df_stations.csv'

    df_rides = pd.read_csv(filename1, index_col=0)
    df_rides = df_rides.head(400)
    df_station = pd.read_csv(filename2, index_col=0)

    df_rides.to_sql(name='rides',if_exists="replace", con=conn)
    df_station.to_sql(name='stations',if_exists="replace", con=conn)