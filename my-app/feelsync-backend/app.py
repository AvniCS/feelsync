import os
from flask import Flask, request, jsonify
from vertex_helper import generate_comfort_message

# Set credentials environment variable
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "service-accounts/gcp-service-account.json"

app = Flask(__name__)

@app.route("/generate_comfort", methods=["POST"])
def generate_comfort():
    data = request.get_json()
    mood = data.get("mood", "neutral")
    message = generate_comfort_message(mood)
    return jsonify({"message": message})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
