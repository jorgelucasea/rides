from sqlite3 import Connection
from pydantic import BaseModel
from datetime import date, time

class RideData(BaseModel):
    rowid: int
    user_gender: str | None
    user_birthdate: date | None
    user_residence: str | None
    ride_date: date
    time_start: str
    time_end: str | None
    station_start: str 
    station_end: str 
    ride_duration: float 
    ride_late: bool 

class RideDataUpdate(BaseModel):
    user_gender: str | None
    user_birthdate: date | None
    user_residence: str | None
    ride_date: str
    time_start: str
    time_end: str | None
    station_start: str 
    station_end: str 
    ride_duration: float 
    ride_late: bool 

def get_all_rides(conn: Connection):
    cursor = conn.cursor()
    cursor.execute("SELECT rowid, user_gender, user_birthdate, user_residence, ride_date, time_start, time_end, station_start, station_end, ride_duration, ride_late FROM rides")
    data = cursor.fetchall()

    return data

def create_rides(conn: Connection, ride: RideData):
    cursor = conn.cursor()
    
    cursor.execute("INSERT INTO rides (user_gender, user_birthdate, user_residence, ride_date, time_start, time_end, station_start, station_end, ride_duration, ride_late) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        (
            ride.user_gender,
            ride.user_birthdate,
            ride.user_residence,
            ride.ride_date,
            ride.time_start,
            ride.time_end,
            ride.station_start,
            ride.station_end,
            ride.ride_duration,
            ride.ride_late,
        ),
    )

    conn.commit()

    return ride

def update_rides(conn: Connection, rowid: int, ride: RideDataUpdate):
    cursor = conn.cursor()
    update_query = "UPDATE rides SET user_gender = ?, user_birthdate = ?, user_residence = ? ride_date = ?, time_start = ?, time_end = ?, station_start = ?, station_end = ?, ride_duration = ?, ride_late = ? WHERE rowid = ?"

        # Convert the new data dictionary to a tuple
    ride_tuple = (
            ride.user_gender, 
            ride.user_birthdate,
            ride.user_residence,
            ride.ride_date,
            ride.time_start,
            ride.time_end,
            ride.station_start,
            ride.station_end,
            ride.ride_duration,
            ride.ride_late,
            rowid
    )

        # Execute the update query
    cursor.execute("UPDATE rides SET user_gender = ?, user_birthdate = ?, user_residence = ?, ride_date = ?, time_start = ?, time_end = ?, station_start = ?, station_end = ?, ride_duration = ?, ride_late = ? WHERE rowid = ?", (
            ride.user_gender, 
            ride.user_birthdate,
            ride.user_residence,
            ride.ride_date,
            ride.time_start,
            ride.time_end,
            ride.station_start,
            ride.station_end,
            ride.ride_duration,
            ride.ride_late,
            rowid
    ))

        # Commit the transaction to apply the update
    conn.commit()

    return ride