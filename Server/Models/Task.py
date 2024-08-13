from sqlalchemy import desc
from database import db


# Task database model
class Tasks(db.Model):
    __tablename__ = "tasks"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    task_type = db.Column(db.String(25), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    finished_at = db.Column(db.DateTime, nullable=True)
    status = db.Column(db.String(25), nullable=False)
    remarks = db.Column(db.String(500), nullable=True)
    task_data = db.Column(db.String(100), nullable=True)

    def __init__(
        self,
        task_type=None,
        finished_at=None,
        status=None,
        remarks=None,
        task_data=None,
    ):
        self.task_type = task_type
        self.finished_at = finished_at
        self.status = status
        self.remarks = remarks
        self.task_data = task_data

    # Create new task
    @staticmethod
    def create(
        task_type,
        task_data,
        finished_at=None,
        status="IN PROGRESS",
    ):
        task = Tasks(
            task_type=task_type,
            finished_at=finished_at,
            status=status,
            task_data=task_data,
        )
        db.session.add(task)
        db.session.commit()
        return task

    # Update finished tasks
    @staticmethod
    def update_by_id(id, remarks=None, status=None):
        task = Tasks.query.filter_by(id=id).first()
        if task:
            task.finished_at = db.func.current_timestamp()
            if remarks:
                task.status = "ERROR"
                task.remarks = remarks
            if status:
                task.status = "RUNNING"
            else:
                task.status = "COMPLETED"

            db.session.commit()

    # Get all tasks
    @staticmethod
    def get_all(limit=None, offset=None):
        data = (
            Tasks.query.order_by(desc(Tasks.date_created))
            .limit(limit)
            .offset(offset)
            .all()
        )
        return data

    # Get inprogressing task
    @staticmethod
    def get_one(status="IN PROGRESS"):
        task = (
            Tasks.query.filter(Tasks.status == status)
            .order_by(Tasks.created_at.asc())
            .first()
        )
        return task
