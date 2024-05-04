import Paper from "./Paper.jsx";

export default function NavBar() {
  return (
    <Paper>
      <div className="flex items-center justify-between">
        <div className="flex shrink-0">
          <p className="font-bold text-gray-600 text-lg tracking-widest">
            Task Management
          </p>
        </div>
      </div>
    </Paper>
  );
}
