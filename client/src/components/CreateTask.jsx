import Modal from "./Modal.jsx";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateTask({ setTasks, setTotalPages }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(0);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  async function onCreate() {
    try {
      const task = {
        title: title,
        description: description,
        status: status,
      };

      const res = await axios.post("http://34.228.15.226:3000/api/v1/tasks", {
        task,
      });
      toast.success("Task created successfully");

      setTasks(res.data.tasks);
      setTotalPages(res.data.total_pages);
    } catch (e) {
      toast.error(e.response.data.error[0]);
    } finally {
      closeModal();
      setTitle("");
      setDescription("");
      setStatus(0);
    }
  }

  return (
    <div className="flex items-center justify-end gap-3">
      <button
        onClick={openModal}
        className="inline-flex items-center justify-center bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-600 active:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 tracking-wider cursor-pointer"
      >
        New Task
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="text-xl font-bold text-gray-600 mb-4 tracking-widest">
          Create Task
        </div>
        <div className="my-2 border-b-2"></div>
        <div className="mb-2">
          <label className="text-lg tracking-widest font-bold block mb-2 text-gray-600">
            Title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-4 p-2.5"
            placeholder="Title"
          />
        </div>
        <div className="mb-2">
          <label className="text-lg tracking-widest font-bold block mb-2 text-gray-600">
            Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            rows="8"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-4 p-2.5 resize-none"
            placeholder="Description"
          />
        </div>
        <div className="mb-4">
          <label className="text-lg tracking-widest font-bold block mb-2 text-gray-600">
            Status
          </label>
          <button
            onClick={() => setStatus(0)}
            className={`inline-flex mr-3 items-center justify-center px-3 py-2 text-sm font-semibold shadow-sm transition-all duration-150 hover:bg-red-600 hover:text-white active:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 tracking-wider cursor-pointer ${status === 0 ? "bg-red-500 text-white" : "bg-white text-red-600 border border-red-600"}`}
          >
            To Do
          </button>
          <button
            onClick={() => setStatus(1)}
            className={`inline-flex mr-3 items-center justify-center px-3 py-2 text-sm font-semibold shadow-sm transition-all duration-150 hover:bg-yellow-600 hover:text-white active:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 tracking-wider cursor-pointer ${status === 1 ? "bg-yellow-500 text-white" : "bg-white text-yellow-600 border border-yellow-600"}`}
          >
            In Progress
          </button>
          <button
            onClick={() => setStatus(2)}
            className={`inline-flex mr-3 items-center justify-center px-3 py-2 text-sm font-semibold shadow-sm transition-all duration-150 hover:bg-green-600 hover:text-white active:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 tracking-wider cursor-pointer ${status === 2 ? "bg-green-500 text-white" : "bg-white text-green-600 border border-green-600"}`}
          >
            Done
          </button>
        </div>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCreate}
            className="inline-flex items-center justify-center bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-600 active:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 tracking-wider cursor-pointer"
          >
            Create
          </button>
        </div>
      </Modal>
    </div>
  );
}
