import NavBar from "./components/NavBar.jsx";
import Tasks from "./components/Tasks.jsx";
import Filters from "./components/Filters.jsx";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  return (
    <>
      <NavBar />
      <ToastContainer />
      <Filters
        tasks={tasks}
        setTasks={setTasks}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <Tasks
        tasks={tasks}
        setTasks={setTasks}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
    </>
  );
}

export default App;
