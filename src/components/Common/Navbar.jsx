import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { MdOutlineLightMode } from "react-icons/md";
import { FaRegMoon } from "react-icons/fa6";
import { IoMoonOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  return (
    <div>
      <div className="navbar justify-between bg-base-100 shadow-sm">
        <Link
          className="rounded-lg  flex items-center"
          to="/"
        >
          <div className="jost flex leading-4 items-center">
            <img
              src={logo}
              alt="Logo"
              className="h-10 dark:bg-white mask mask-squircle"
            />
            <span className="ml-2 text-xl">
              <span>Bongo</span> <span>Discovery</span>
            </span>
          </div>
        </Link>
        <div className="flex-none">
          <label className="swap text-xl btn btn-ghost btn-circle swap-rotate">
            <input type="checkbox" onChange={toggleTheme} />
            <div className="swap-on">
              <IoMoonOutline />
            </div>
            <div className="swap-off">
              <MdOutlineLightMode />
            </div>
          </label>
          <ul className="menu menu-horizontal px-1">
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/community">Community</NavLink>
            </li>
            <li>
                <NavLink to="/about">About Us</NavLink>
            </li>
            <li>
                <NavLink to="/trips">Trips</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
