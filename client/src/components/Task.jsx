import Paper from "./Paper.jsx";
import { useState } from "react";
import menu from "../assets/menu.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Task({ task, setTasks, setTotalPages }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const chainMap = {
    0: { status: 1, status_name: "in progress" },
    1: { status: 2, status_name: "done" },
    2: { status: 0, status_name: "to do" },
  };

  function borderColor(status) {
    switch (status) {
      case 0:
        return "border-l-4 border-l-red-400";
      case 1:
        return "border-l-4 border-l-yellow-400";
      case 2:
        return "border-l-4 border-l-green-400";
    }
  }

  function chainNumbers(number) {
    return chainMap[number] !== undefined ? chainMap[number] : null;
  }

  async function handleUpdate(id, status) {
    try {
      const task = {
        status: status,
      };

      const res = await axios.patch(
        `http://localhost:3000/api/v1/tasks/${id}`,
        task,
      );

      setTasks(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setOpen((value) => {
        return !value;
      });
    }
  }

  async function handleDestroy(id) {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/tasks/${id}`,
      );

      setTasks(res.data.tasks);
      if (res.data.total_pages > 0) {
        setTotalPages(res.data.total_pages);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Paper label={true} labelColor={borderColor(task.status)}>
      <div className="flex justify-between items-center">
        <p className="max-w-72 md:max-w-screen-lg text-base font-semibold text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
          {task.title}
        </p>
        <div className="relative">
          <button
            aria-label="Open options menu"
            onClick={() =>
              setOpen((value) => {
                return !value;
              })
            }
            className="flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <img src={menu} />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-48 rounded-md drop-shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div
                className="py-1 z-10"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <p
                  onClick={() =>
                    handleUpdate(task.id, chainNumbers(task.status).status)
                  }
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                >
                  {`Mark as ${chainNumbers(task.status).status_name}`}
                </p>
              </div>
              <div
                className="py-1 z-10"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <p
                  onClick={() => handleDestroy(task.id)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                >
                  Delete
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Paper>
  );
}
