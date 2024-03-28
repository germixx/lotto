import mysql.connector

from mysql.connector import Error

def connection2(database):
    connection = None
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='officialResults',
            passwd='yyt9JUj8OOBaJp5X!',
            database=database
        )
        print("MySQL Database connection successful")
    except Error as err:
        print(f"Error: '{err}'")

    return connection
