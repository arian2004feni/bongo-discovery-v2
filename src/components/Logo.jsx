import { Link } from "react-router";
import logo from "../assets/logo.png";

const Logo = ({atTop}) => {
  return (
    <Link className="rounded-lg  flex items-center" to="/">
      <div className="jost flex leading-4 items-center">
        <img
          src={logo}
          alt="Logo"
          className={`h-10 dark:bg-white mask mask-squircle ${
            atTop ? "bg-white" : ""
          }`}
        />
        <span className="ml-2 text-2xl font-heading">
          <span>Bongo</span> <span>Discovery</span>
        </span>
      </div>
    </Link>
  );
};

export default Logo;
