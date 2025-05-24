# Backend/auth.py
from flask import Flask, request, jsonify
from pymongo import MongoClient
import jwt
import datetime
from functools import wraps
from flask_cors import CORS
import bcrypt
import pickle
import os
import numpy as np
import pandas as pd



SECRET_KEY = 'My name is JTP'  # Replace with a strong, secure secret key

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['game_recommendation']
users_collection = db['users']



BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Construct absolute paths to the pickle files
games_path = os.path.join(BASE_DIR, 'games.pkl')
similarity_path = os.path.join(BASE_DIR, 'similarity.pkl')

# Load the pickles
with open(games_path, 'rb') as f:
    new_df = pickle.load(f)

with open(similarity_path, 'rb') as f:
    similarity = pickle.load(f)


# Decorator to check token
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('x-access-token')
        print("Received token:", token)  # Debugging

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            print("Decoded data:", data)  # Debugging
            current_user = users_collection.find_one({'username': data['username']})
            if not current_user:
                return jsonify({'message': 'User not found!'}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token is invalid!'}), 401

        return f(current_user, *args, **kwargs)
    return decorated



# Recommendation function
def recommend(game):
    if game not in new_df['title'].values:
        return []

    game_index = new_df[new_df['title'] == game].index[0]
    distances = similarity[game_index]
    game_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]

    recommended_games = []
    for i in game_list:
        game_info = new_df.iloc[i[0]]
        appid = game_info.get('appid')
        poster_url = f"https://cdn.akamai.steamstatic.com/steam/apps/{appid}/header.jpg"
        recommended_games.append({
            "title": game_info['title'],
            "poster": poster_url
        })

    return recommended_games



# User Signup
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if users_collection.find_one({'username': username}):
        return jsonify({'message': 'User already exists'}), 400

    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    users_collection.insert_one({'username': username, 'password': hashed_pw})
    return jsonify({'message': 'User registered successfully'}), 201


# User Login
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = users_collection.find_one({'username': username})
    if not user or not bcrypt.checkpw(password.encode('utf-8'), user['password']):
        return jsonify({'message': 'Invalid credentials'}), 401

    token = jwt.encode({
        'username': username,
        'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(hours=24)
    }, SECRET_KEY, algorithm="HS256")

    # Return token as string if using PyJWT >= 2.0
    if isinstance(token, bytes):
        token = token.decode('utf-8')

    return jsonify({'message': 'Login successful', 'token': token}), 200


# Protected Profile Route
@app.route('/profile', methods=['GET'])
@token_required
def profile(current_user):
    username = current_user['username']
    user_data = users_collection.find_one({'username': username})

    past_recommendations = user_data.get('recommendations', [])
    game_ratings = user_data.get('ratings', [])

    return jsonify({
        'username': username,
        'ratings': game_ratings,
        'past_recommendations': past_recommendations,
        'message': 'Welcome to your profile!'
    })




# Recommendation API
@app.route('/recommend', methods=['POST'])
@token_required
def recommend_route(current_user):
    data = request.json
    game = data.get("game")

    if not game:
        return jsonify({"message": "No game provided"}), 400

    recommended_games = recommend(game)
    if not recommended_games:
        return jsonify({"message": "Game not found"}), 404

    users_collection.update_one(
        {"username": current_user['username']},
        {"$push": {"recommendations": {"base_game": game, "recommended": recommended_games}}},
        upsert=True
    )

    return jsonify({"recommended": recommended_games}), 200





# User Recommendations API
@app.route('/user/recommendations', methods=['GET'])
@token_required
def get_user_recommendations(current_user):
    user_recommendations = current_user.get('recommendations', [])
    return jsonify({"recommendations": user_recommendations}), 200


# Rating API
@app.route('/rate', methods=['POST'])
@token_required
def rate_game(current_user):
    data = request.json
    game = data.get("game")
    rating = data.get("rating")

    if not game or rating is None:
        return jsonify({"message": "Game and rating are required"}), 400

    users_collection.update_one(
        {"username": current_user['username']},
        {"$push": {"ratings": {"game": game, "rating": rating}}},
        upsert=True
    )

    return jsonify({"message": f"Rating for {game} saved."}), 200


# Choose Game API
@app.route('/choose_game', methods=['POST'])
@token_required
def choose_game(current_user):
    data = request.json
    game = data.get("game")

    if not game:
        return jsonify({"message": "Game is required"}), 400

    recommended_games = recommend(game)
    if not recommended_games:
        return jsonify({"message": "Game not found or no recommendations available"}), 404

    # Store the recommendations in user's document
    users_collection.update_one(
        {"username": current_user['username']},
        {"$set": {"past_recommendations": recommended_games}}
    )

    return jsonify({
        "message": f"Recommendations based on {game} stored.",
        "recommended": recommended_games
    }), 200



if __name__ == '__main__':
    app.run(debug=True, port=5000)

