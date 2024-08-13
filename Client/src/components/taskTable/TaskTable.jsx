import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Card, Chip } from "@mui/material";
import DrawerAppBar from "../AppBar/AppBar";
import { Box } from "@mui/material";
import "./TaskTable.css";

// Return the task Manager table
function TaskTable() {
  const [data, setData] = useState([]);

  // Get tasks data when reloading the page
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch("http://127.0.0.1:5000/tasks");
        const body = await result.json();
        setData(body);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();

    const intervalId = setInterval(fetchData, 1000); // Fetch data every second

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <DrawerAppBar />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <TableContainer component={Card} className="table-container">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="table-head">
              <TableRow>
                <TableCell
                  sx={{
                    fontSize: "20px",
                    fontFamily: "Times",
                    fontWeight: "inherit",
                    fontWeight: "bold",
                  }}
                >
                  Task ID
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: "20px",
                    fontFamily: "Times",
                    fontWeight: "inherit",
                    fontWeight: "bold",
                  }}
                  align="right"
                >
                  Task Type
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: "20px",
                    fontFamily: "Times",
                    fontWeight: "inherit",
                    fontWeight: "bold",
                  }}
                  align="right"
                >
                  Created At
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: "20px",
                    fontFamily: "Times",
                    fontWeight: "inherit",
                    fontWeight: "bold",
                  }}
                  align="right"
                >
                  Last Updated
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: "20px",
                    fontFamily: "Times",
                    fontWeight: "inherit",
                    fontWeight: "bold",
                  }}
                  align="right"
                >
                  Task Data
                </TableCell>

                <TableCell
                  sx={{
                    fontSize: "20px",
                    fontFamily: "Times",
                    fontWeight: "inherit",
                    fontWeight: "bold",
                  }}
                  align="right"
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>

            {/* Tasks should be map to this */}
            <TableBody>
              {data &&
                data.map((row) => (
                  <TableRow
                    key={row.task_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.task_id}
                    </TableCell>
                    <TableCell align="right">{row.task_type}</TableCell>
                    <TableCell align="right">{row.created_at}</TableCell>
                    <TableCell align="right">{row.last_updated}</TableCell>
                    <TableCell align="right">{row.task_data}</TableCell>
                    <TableCell align="right">{ShowChip(row.status)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

function ShowChip(status) {
  if (status == "COMPLETED") {
    return <Chip label="COMPLETED" color="success"></Chip>;
  } else if (status == "IN PROGRESS") {
    return <Chip label="IN PROGRESS" color="primary"></Chip>;
  } else if (status == "RUNNING") {
    return <Chip label="RUNNING" color="warning"></Chip>;
  } else {
    return <Chip label="ERROR" color="error"></Chip>;
  }
}

export default TaskTable;
