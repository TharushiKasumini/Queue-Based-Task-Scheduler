from queue import Queue
from threading import Lock, Thread
from Task_Runner import process_Task_A, process_Task_B, process_Task_C


class TaskManager:

    # Have one running task
    def __init__(self, check_progression, update_db) -> None:
        self.check_progression = check_progression
        self.update_db = update_db
        self.task_queue = Queue()
        self.lock = Lock()
        self.is_running = False

    # Add task into the queue
    def add_task(self, task):
        """Adds a new task to the queue."""
        self.task_queue.put(task)
        self.try_run_task()

    def try_run_task(self):
        """Attempt to start task processing if not already running."""
        with self.lock:
            if not self.is_running:
                self.is_running = True
                Thread(target=self.run_task).start()

    # Run tasks function
    def run_task(self):

        while not self.task_queue.empty():
            task = self.task_queue.get()

            task_type = task["task_type"]
            data = {
                "task_data": task["task_data"],
                "id": task["id"],
                "update_db": self.update_db,
            }

            # Since we are supporting only three task types
            if task_type == "Task_A":
                print("[INFO]: Tasks start processing for Type A")
                process_Task_A(data)
            elif task_type == "Task_B":
                print("[INFO]: Tasks start processing for Type B")
                process_Task_B(data)
            else:
                print("[INFO]: Tasks start processing for Type C")
                process_Task_C(data)

            # Optionally mark task as done
            self.task_queue.task_done()

        # When done with all tasks, release the lock
        with self.lock:
            self.is_running = False
