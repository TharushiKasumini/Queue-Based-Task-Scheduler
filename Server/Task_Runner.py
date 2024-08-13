import time

# from helpers import update_db


# Processing functions for tasks
def process_Task_A(data):
    try:
        task_data = data["task_data"]
        id = data["id"]
        update_db = data["update_db"]

        # Execution Demo
        print(f"[INFO]: Started Processing Task A - {task_data}")
        # Track running task
        update_db(id, status="RUNNING")
        time.sleep(30)

        print(f"[INFO]: Finished Processing Task A - {task_data}")
        update_db(id)

    except Exception as e:
        print("[INFO]: Error occurred!")
        print(e)


def process_Task_B(data):
    try:
        task_data = data["task_data"]
        id = data["id"]
        update_db = data["update_db"]

        # Execution Demo
        print(f"[INFO]: Started Processing Task B - {task_data}")
        # Track running Task
        update_db(id, status="RUNNING")
        time.sleep(60)

        print(f"[INFO]: Finished Processing Task B - {task_data}")
        update_db(id)

    except Exception as e:
        print("[INFO]: Error occurred!")
        print(e)


def process_Task_C(data):
    try:
        task_data = data["task_data"]
        id = data["id"]
        update_db = data["update_db"]

        # Execution Demo
        print(f"[INFO]: Started Processing Task C - {task_data}")
        # Track running tasks
        update_db(id, status="RUNNING")
        time.sleep(90)

        print(f"[INFO]: Finished Processing Task C - {task_data}")
        update_db(id)

    except Exception as e:
        print("[INFO]: Error occurred!")
        print(e)
