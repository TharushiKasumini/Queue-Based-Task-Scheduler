import os
import sys
from flask import Flask
from flask import jsonify, request
from flask_socketio import SocketIO, emit
from flask_cors import cross_origin, CORS
from database import db
from Models.Task import Tasks
from Task_Manager import TaskManager
import threading
import sqlite3

# Setting absoulte paths
sys.path.insert(0, os.path.abspath("."))


# Configuring app and CORS
app = Flask(__name__)
CORS(app, supports_credentials=True)

# Configuring database
db_path = os.path.join(os.path.abspath("."), "Tasks.db")
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path}"
db.init_app(app)


# Database functionlities
def check_progression():
    with app.app_context():
        return Tasks.get_one(status="IN PROGRESS")


# Update database function
def update_db(table_idx, remarks=None, status=None):
    with app.app_context():
        Tasks.update_by_id(table_idx, remarks, status=status)
        db.session.close()


# Creatting task manager
Task_Manager = TaskManager(
    check_progression=check_progression,
    update_db=update_db,
)


# Create Databases
def create_db():
    with app.app_context():
        print("[INFO]: Creating Tables")
        db.create_all()


# Health Check
@app.route("/", methods=["GET"])
def index():
    return jsonify({"message": "OK"}), 200


# Creating routes for Differnet tasks
# Type A task
@app.route("/runner_a", methods=["POST"])
def runner_A():
    body = request.json

    if not body:
        return jsonify({"message": "Cannot decode JSON from the body"}), 422

    # Create task
    task_type = "Task_A"
    task_data = body.get("task_data")

    if not task_data:
        return jsonify({"message": "Task name is missing"}), 422

    # Creating Task
    created_task = Tasks.create(task_data=task_data, task_type=task_type)
    data_object = {
        "task_type": created_task.task_type,
        "task_data": created_task.task_data,
        "id": created_task.id,
    }
    threading.Thread(target=Task_Manager.add_task, args=(data_object,)).start()

    return jsonify({"message": "Started processing request"}), 200


# Type B Task
@app.route("/runner_b", methods=["POST"])
def runner_B():
    body = request.json

    if not body:
        return jsonify({"message": "Cannot decode JSON from the body"}), 422

    # Create task
    task_type = "Task_B"
    task_data = body.get("task_data")

    if not task_data:
        return jsonify({"message": "Task name is missing"}), 422

    # Creating Task
    created_task = Tasks.create(task_data=task_data, task_type=task_type)
    data_object = {
        "task_type": created_task.task_type,
        "task_data": created_task.task_data,
        "id": created_task.id,
    }
    threading.Thread(target=Task_Manager.add_task, args=(data_object,)).start()

    return jsonify({"message": "Started processing request"}), 200


# Type C Task
@app.route("/runner_c", methods=["POST"])
def runner_C():
    body = request.json

    if not body:
        return jsonify({"message": "Cannot decode JSON from the body"}), 422

    # Create task
    task_type = "Task_C"
    task_data = body.get("task_data")

    if not task_data:
        return jsonify({"message": "Task name is missing"}), 422

    # Creating Task
    created_task = Tasks.create(task_data=task_data, task_type=task_type)
    data_object = {
        "task_type": created_task.task_type,
        "task_data": created_task.task_data,
        "id": created_task.id,
    }
    threading.Thread(target=Task_Manager.add_task, args=(data_object,)).start()

    return jsonify({"message": "Started processing request"}), 200


# Return the Task Manager data to the frontend
@app.route("/tasks", methods=["GET"])
def get_tasks():
    # Connect to SQLite database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Execute the query
    cursor.execute("SELECT * FROM tasks")
    rows = cursor.fetchall()

    # Close the database connection
    conn.close()

    # Convert rows to a list of dictionaries (JSON-like format)
    data = [
        {
            "task_id": row[0],
            "task_type": row[1],
            "created_at": row[2],
            "last_updated": row[3],
            "status": row[4],
            "remarks": row[5],
            "task_data": row[6],
        }
        for row in rows
    ]

    return jsonify(data), 200


# Main function
if __name__ == "__main__":
    from Models.Task import Tasks

    create_db()
    app.run(port=5000, debug=True)
