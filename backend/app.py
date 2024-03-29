from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route("/", methods=["POST"])
def home():
    print("Received POST request")
    id = request.json["newId"]
    name = request.json["newName"]
    data = {"id": id, "name": name}
    print(data)
    return data

if __name__ == "__main__":
    app.run(debug=True)
