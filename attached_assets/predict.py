import requests
from flask import Blueprint, jsonify
import os

predict_bp = Blueprint("predict", __name__)

SPORTMONKS_API_KEY = os.getenv("SPORTMONKS_API_KEY")

@predict_bp.route("/predict-today", methods=["GET"])
def predict_today():
    url = f"https://soccer.sportmonks.com/api/v2.0/fixtures/today?api_token={SPORTMONKS_API_KEY}&include=standings"
    response = requests.get(url)
    matches = response.json().get("data", [])
    predictions = []
    for match in matches:
        home_team = match["localteam_name"]
        away_team = match["visitorteam_name"]
        home_score = match["scores"]["localteam_score"]
        away_score = match["scores"]["visitorteam_score"]
        predictions.append({
            "match": f"{home_team} vs {away_team}",
            "score": f"{home_score} - {away_score}",
        })
    return jsonify(predictions)