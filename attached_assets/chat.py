import openai
from flask import Blueprint, request, jsonify
import os

chat_bp = Blueprint("chat", __name__)

openai.api_key = os.getenv("OPENAI_API_KEY")

@chat_bp.route("/chat", methods=["POST"])
def chat():
    data = request.json
    prompt = data.get("prompt", "Write a message")
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    return jsonify({"response": response.choices[0].message["content"]})