import mysql.connector
from mysql.connector.errors import Error


class MySQL:
    def __init__(self, db_config):
        self.db_config = db_config

    def create_connection(self):
        try:
            self.conn = mysql.connector.connect(**self.db_config)
            self.cursor = self.conn.cursor(dictionary=True)
        except Error as e:
	        print(e)
            
        return self.cursor
        
    def query(self, *args):
        try:
            self.cursor.execute(*args)
        except Error as e:
            print(e)
        self.commit()
        self.close()

    def select(self, *args):
        try:
            self.cursor.execute(*args)
            res = self.cursor.fetchall()
            self.close()
            
            return res
        except Error as e:
            print(e)
            self.close()

    def commit(self):
        self.conn.commit()

    def close(self):
        self.cursor.close()
        self.conn.close()