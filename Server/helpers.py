# from api import app
# from Models.Task import Tasks
# from database import db

# Update the database
# def update_db(table_idx, remarks=None, status=None):
#     with app.app_context():
#         Tasks.update_by_id(table_idx, remarks, status=status)
#         db.session.close()

# Get task with IN PROGRESS
# def check_progression():
#     with app.app_context():
#         return Tasks.get_one(status="IN PROGRESS")
    
# # Get runnning tasks
# def check_running_tasks():
#     with app.app_context():
#         return Tasks.get_one(status="RUNNING")