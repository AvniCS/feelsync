import os
from google.cloud import aiplatform

# Make sure your env var is set before import in app.py
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "service-accounts/gcp-service-account.json"

# Initialise the Vertex AI client once
PROJECT_ID = "feelsync-c188b"  # e.g. feelsync-123456
LOCATION = "us-central1"  # or your chosen region

aiplatform.init(project=PROJECT_ID, location=LOCATION)

def generate_comfort_message(mood: str) -> str:
    """
    Generate a comforting message for the given mood using Gemini/Vertex AI.
    """
    from vertexai.preview.generative_models import GenerativeModel

    # Load Gemini (or change to other models)
    model = GenerativeModel("gemini-1.5-flash")

    prompt = f"The user is feeling {mood}. Write a short, empathetic and encouraging message for them."

    response = model.generate_content(prompt)

    # The text output from the model:
    return response.text
