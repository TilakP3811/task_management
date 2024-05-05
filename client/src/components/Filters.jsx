import Paper from "./Paper.jsx";

export default function Filters({ statusFilter, setStatusFilter }) {
  return (
    <Paper>
      <div className="flex shrink-0">
        <p className="font-bold text-gray-600 text-lg tracking-widest">
          Filters
        </p>
      </div>
      <div className="my-2 border-b-2"></div>
      <div className="md:flex md:justify-between md:items-center">
        <div className="relative mx-auto md:mx-0 md:min-w-96">
          <p className="text-gray-500 tracking-widest mb-2">By status</p>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">All</option>
            <option value="0">To Do</option>
            <option value="1">In Progress</option>
            <option value="2">Done</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
        </div>
      </div>
    </Paper>
  );
}
