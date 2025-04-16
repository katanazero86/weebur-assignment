export default function Spinner() {
  return (
    <div className="relative w-10 h-10 rounded-full border-5 border-gray-200">
      <span className="absolute w-10 h-10 top-[-5px] left-[-5px] border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></span>
    </div>
  );
}
