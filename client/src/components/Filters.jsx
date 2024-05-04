export default function Filters() {
  return (
    <div className="flex items-center max-w-sm mx-auto mb-2 md:mx-0">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-10 p-2.5 "
          placeholder="Search tasks"
          required
        />
      </div>
    </div>
  );
}
