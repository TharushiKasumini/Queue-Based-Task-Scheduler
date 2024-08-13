import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DrawerAppBar from "../AppBar/AppBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { CardHeader, Grid } from "@mui/material";
import Button from "@mui/material/Button";

const API_ENDPOINTS = {
  Task_A: "http://127.0.0.1:5000/runner_a",
  Task_B: "http://127.0.0.1:5000/runner_b",
  Task_C: "http://127.0.0.1:5000/runner_c",
};

const TaskInterface = () => {
  // State to keep track of the selected task type
  const [selectedTaskType, setSelectedTaskType] = useState("");
  const [taskData, setTaskData] = useState("");

  // Handler for radio button changes
  const handleTaskTypeChange = (event) => {
    setSelectedTaskType(event.target.value);
    console.log(event.target.value);
  };

  const handleTaskDataChange = (event) => {
    setTaskData(event.target.value);
    console.log(event.target.value);
  };

  const handleTaskSubmit = async (event) => {
    // Validate the selected task type and task data
    if (!selectedTaskType || !taskData) {
      alert("Please select a task type and enter task data.");
      return;
    }

    // Prepare the request payload
    const payload = {
      task_data: taskData,
    };

    try {
      // Call the appropriate endpoint based on the selected task type
      let response;
      switch (selectedTaskType) {
        case "Task_A":
          response = await fetch(API_ENDPOINTS.Task_A, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
          break;
        case "Task_B":
          response = await fetch(API_ENDPOINTS.Task_B, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
          break;
        case "Task_C":
          response = await fetch(API_ENDPOINTS.Task_C, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
          break;
        default:
          alert("Invalid task type selected.");
          return;
      }

      if (response.ok) {
        alert("Task submitted successfully.");
        setTaskData("");
      } else {
        alert("Failed to submit task.");
      }
    } catch (error) {
      console.error("Error submitting task:", error);
      alert("An error occurred while submitting the task.");
    }
  };

  return (
    <>
      <DrawerAppBar />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          marginTop: "90px",
        }}
      >
        <Card sx={{ width: "80%" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Task Interface
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Add your task details here. (Task type, Task Data)
            </Typography>

            <Typography component={"h5"} sx={{ fontWeight: "bold" }}>
              Select Task Type to Proceed
            </Typography>

            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Available task types. (Tasl A, Task B, Task C)
            </Typography>

            <Grid container direction={"column"}>
              <Grid item>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={selectedTaskType} // Pass the selected value
                    onChange={handleTaskTypeChange} // Handle change events
                  >
                    <FormControlLabel
                      value="Task_A"
                      control={<Radio />}
                      label="Task A"
                    />
                    <FormControlLabel
                      value="Task_B"
                      control={<Radio />}
                      label="Task B"
                    />
                    <FormControlLabel
                      value="Task_C"
                      control={<Radio />}
                      label="Task C"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Task Data"
                  multiline
                  maxRows={4}
                  value={taskData} // Bind the value of TextField to state
                  onChange={handleTaskDataChange} // Update state on change
                  sx={{ mt: 2, width: "60%" }} // Add margin-top to create space between RadioGroup and TextField
                />
              </Grid>

              <Grid item>
                <Button
                  variant="outlined"
                  sx={{ marginTop: "15px" }}
                  onClick={handleTaskSubmit}
                >
                  Submit Task
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          marginTop: "20px",
          flexDirection: "row",
        }}
      >
        <Card sx={{ width: "80%" }}>
          <CardContent>
            <Typography
              variant="h5"
              sx={{ marginBottom: "10px", fontWeight: "bold" }}
            >
              Task Details that server can process
            </Typography>

            {/* Task A */}
            <Typography variant="h6" component="div">
              Task Type A
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Task Type A demonstrating a task that can take 30 seconds to
              process. (Assume that low resource consuming task)
            </Typography>

            {/* Task B */}
            <Typography variant="h6" component="div">
              Task Type B
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Task Type B demonstrating a task that can take 60 seconds to
              process. (Assume that medium resource consuming task)
            </Typography>

            {/* Task C */}
            <Typography variant="h6" component="div">
              Task Type C
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Task Type C demonstrating a task that can take 90 seconds to
              process. (Assume that highly resource consuming task)
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default TaskInterface;
