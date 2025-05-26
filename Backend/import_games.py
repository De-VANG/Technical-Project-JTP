import pandas as pd
from pymongo import MongoClient
import os


SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(SCRIPT_DIR, '..', 'Dataset', 'gamesdata.csv')
CSV_PATH = os.path.normpath(CSV_PATH)

# Load CSV
df = pd.read_csv(CSV_PATH)

# Connect to MongoDB
client = MongoClient("mongodb://mongo:27017/")
db = client["game_recommendation"]
collection = db["games"]

# Clear existing data
collection.delete_many({})

# Insert records
data = df.to_dict(orient="records")
collection.insert_many(data)

print(f"Inserted {len(data)} records into MongoDB.")
