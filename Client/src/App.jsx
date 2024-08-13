import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskInterface from "./components/taskInterface/TaskInterface";
import TaskTable from "./components/taskTable/TaskTable";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskInterface />} />
        <Route path="/view" element={<TaskTable />} />
      </Routes>
    </Router>
  );
}

export default App;
