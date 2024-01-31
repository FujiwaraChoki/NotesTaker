import os

from flask_cors import CORS
from datetime import datetime
from termcolor import colored
from NotesTaker import NotesTaker
from flask import Flask, request, jsonify

app = Flask(__name__)
CORS(app)

ntaker = NotesTaker()
ntaker.lang = "en-GB"

@app.route("/api/notes", methods=["POST"])
def notes():
  data = request.get_json()

  action = data["action"]

  if action == "start":
    ntaker.listen()

    summary = ntaker.summarize()

    filename = f"summaries/summary_{datetime.now().strftime('%Y-%m-%d_%H-%M-%S')}.md"

    with open(filename, "w", encoding="utf-8") as f:
      f.write(summary)

    print(colored(f"[+] Summary written to: {filename}", "green"))

    return jsonify({
      "status": "success",
      "message": "summary complete!",
      "data": str(summary)
    })
  
  elif action == "stop":
    ntaker.stop()

    return jsonify({
      "status": "success",
      "message": "Stopped listening!"
    })
  
  else:
    return jsonify({
      "status": "error",
      "message": "Invalid action!"
    })
  
@app.route("/api/notes/<int:id>", methods=["GET"])
def get_note_by_id(id):
  note = ntaker.get_by_id(id)

  print(note)

  if note:
    return jsonify({
      "status": "success",
      "message": "Retrieved note!",
      "data": {
        "id": note[0][0],
        "transcript": note[0][1],
        "summary": note[0][2],
        "date": note[0][3]
      }
    })
  else:
    return jsonify({
      "status": "error",
      "message": "Note not found!"
    })
  
@app.route("/api/notes", methods=["GET"])
def get_notes():
  all_notes = ntaker.get_all()
  notes_in_dicts = []

  for i in all_notes:
    # Turn the tuple into a dictionary
    x = {
      "id": i[0],
      "transcript": i[1],
      "summary": i[2],
      "date": i[3]
    }

    notes_in_dicts.append(x)

  return jsonify({
    "status": "success",
    "message": "Retrieved notes!",
    "data": notes_in_dicts
  })
  
if __name__ == "__main__":
  # Create summaries directory if it doesn't exist
  if not os.path.exists("summaries"):
    os.mkdir("summaries")

  app.run(debug=True)
