import { useEffect, useState } from "react";
import Paper from "./Paper.jsx";
import TaskHeader from "./TaskHeader.jsx";
import Filters from "./Filters.jsx";
import Task from "./Task.jsx";
import axios from "axios";
import Loader from "./Loader.jsx";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("page") ? Number(searchParams.get("page")) : 1,
  );
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  function nextPage() {
    if (currentPage >= totalPages) {
      setCurrentPage(totalPages);
      return;
    }

    setCurrentPage((page) => page + 1);
    navigate(`/?page=${currentPage + 1}`);
  }

  function previousPage() {
    if (currentPage <= 1) {
      setCurrentPage(1);
      return;
    }

    setCurrentPage((page) => page - 1);
    navigate(`/?page=${currentPage - 1}`);
  }

  async function fetchTasks() {
    const res = await axios.get(
      `http://localhost:3000/api/v1/tasks?page=${currentPage}`,
    );

    if (res.data.total_pages > 0) {
      setTotalPages(res.data.total_pages);
    }
    setTasks(res.data.tasks);
    setLoading(false);
  }

  useEffect(() => {
    fetchTasks();
  }, [currentPage, totalPages]);

  return (
    <Paper>
      <TaskHeader setTasks={setTasks} setTotalPages={setTotalPages} />
      <div className="my-2 border-b-2"></div>
      {/*<Filters />*/}
      {loading ? (
        <Loader />
      ) : (
        tasks.map((task) => {
          return (
            <Task
              key={task.id}
              task={task}
              setTasks={setTasks}
              setTotalPages={setTotalPages}
            />
          );
        })
      )}
      {tasks.length > 0 ? (
        <div className="flex justify-between items-center">
          <button
            onClick={previousPage}
            className={`inline-flex items-center justify-center bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-600 active:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 tracking-wider cursor-pointer ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            className={`inline-flex items-center justify-center bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-600 active:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 tracking-wider cursor-pointer ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Next
          </button>
        </div>
      ) : (
        <Paper>
          <p className="text-lg text-gray-500 text-center tracking-wider">
            No Task Available, click on `New Task` button for creating new one.
          </p>
        </Paper>
      )}
    </Paper>
  );
}
