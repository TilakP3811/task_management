export default function Loader() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="h-8 bg-gray-300"></div>
        ))}
    </div>
  );
}
