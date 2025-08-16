import { Link } from "react-router";

const Logo = () => {
  return (
    <Link className="rounded-lg flex items-center" to="/">
      <div className="jost flex leading-4 items-center">
        <img
          src="/logo.svg"
          alt="Logo"
          className="h-9"
        />
        <span className="ml-2 text-2xl font-heading">
          <span>Bongo</span> <span>Discovery</span>
        </span>
      </div>
    </Link>
  );
};

export default Logo;
