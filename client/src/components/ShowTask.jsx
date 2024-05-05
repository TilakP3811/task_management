import Modal from "./Modal.jsx";
export default function ShowTask({ task, isModalOpen, closeModal }) {
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <label className="text-md tracking-widest font-bold block mb-2 text-gray-700">
        Title
      </label>
      <div className="my-2 border-b-2"></div>
      <p className="text-xl font-semibold text-gray-600 mb-8 tracking-widest">
        {task.title}
      </p>
      <div className="my-2 border-b-2"></div>
      <label className="text-xl tracking-widest font-bold block my-2 mt-4 text-gray-600">
        Description
      </label>
      <div className="my-2 border-b-2"></div>
      <p className="text-md font-semibold text-gray-600 mb-8 tracking-widest overflow-hidden">
        {task.description}
      </p>
      <div className="my-2 border-b-2"></div>
      <div className="mb-4 mt-4">
        <label className="text-lg tracking-widest font-bold block mb-2 text-gray-600">
          Status
        </label>
        {task.status === 0 ? (
          <button
            className={`inline-flex mr-3 items-center justify-center px-3 py-2 text-sm font-semibold shadow-sm transition-all duration-150 hover:bg-red-600 hover:text-white active:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 tracking-wider cursor-pointer bg-red-500 text-white`}
          >
            To Do
          </button>
        ) : task.status === 1 ? (
          <button
            className={`inline-flex mr-3 items-center justify-center px-3 py-2 text-sm font-semibold shadow-sm transition-all duration-150 hover:bg-yellow-600 hover:text-white active:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 tracking-wider cursor-pointer bg-yellow-500 text-white `}
          >
            In Progress
          </button>
        ) : task.status === 2 ? (
          <button
            className={`inline-flex mr-3 items-center justify-center px-3 py-2 text-sm font-semibold shadow-sm transition-all duration-150 hover:bg-green-600 hover:text-white active:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 tracking-wider cursor-pointer bg-green-500 text-white `}
          >
            Done
          </button>
        ) : (
          ""
        )}
      </div>
    </Modal>
  );
}
