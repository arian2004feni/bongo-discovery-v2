import { MdConstruction } from "react-icons/md";

export default function WorkInProgress({
  message = "This section is under construction.",
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-6xl text-warning mb-4 animate-bounce">
        <MdConstruction />
      </div>
      <div className="alert alert-warning shadow-lg max-w-lg">
        <div>
          <span className="loading loading-spinner loading-md text-warning"></span>
          <span className="font-semibold">{message}</span>
        </div>
      </div>
    </div>
  );
}
