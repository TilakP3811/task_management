import CreateTask from "./CreateTask.jsx";

export default function TaskHeader({ setTasks, setTotalPages }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex shrink-0">
        <p className="font-bold text-gray-600 text-lg tracking-widest">Tasks</p>
      </div>
      <CreateTask setTasks={setTasks} setTotalPages={setTotalPages} />
    </div>
  );
}
