import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import Logo from "../components/Logo";

export default function NotFound() {
  return (<>
  <div className="navbar justify-center"><Logo /></div>
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center px-4">
      <h1 className="text-8xl font-heading tracking-wider">404</h1>

      <h1 className="text-5xl font-bold text-error">Oops! Page Not Found</h1>
      <p className="text-base-content text-lg mt-4 max-w-xl">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Link to="/" className="btn btn-primary mt-6">
        <FaArrowLeft className="mr-2" /> Back to Homepage
      </Link>
    </div>
  </>);
}
