# Queue-Based-Task-Scheduler
Task scheduler which is implemented using queue

#### Group Details
KUHDSE24.1F-024 - W.G. Tharushi Kasumini

KUHDSE24.1F-027 - A.M.N.S. Alahakoon

KUHDSE24.1F-028 - W.M.D.L.S. Wanninayaka

KUHDSE24.1F-002 - W.A.V.T.B. Jayarathne

## Front-End
Front end is implemented using React JavaScript. It contains task adder interface and UI for viewing real time task status.

## Back-End
Back end server is Flask server which has task control. Task control is managed by task manager which is implemented using Queue data structure.
And also it comes with native `SQLite` Database for task tracking and enhance the server resource utilization by getting task info from database instead of the Queue.
