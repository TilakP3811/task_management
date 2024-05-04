export default function Paper({ children, label, labelColor }) {
  return (
    <div
      className={`z-2 mb-3 px-3 mx-auto w-full max-w-screen-xl border border-gray-100 bg-white/80 py-3 shadow ${label && labelColor}`}
    >
      {children}
    </div>
  );
}
