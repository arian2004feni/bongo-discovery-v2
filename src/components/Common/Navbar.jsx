import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import { MdOutlineLightMode } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const [atTop, setAtTop] = useState(true);
  const [scrollUp, setScrollUp] = useState(true);
  const [overHero, setOverHero] = useState(true);
  const prevScroll = useRef(0);
  // console.log(prevScroll.current);

  useEffect(() => {
    const heroHeight = 400;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      setScrollUp(currentScroll < prevScroll.current);
      setAtTop(currentScroll <= 10);
      setOverHero(currentScroll < heroHeight);
      prevScroll.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const baseClasses = `
    fixed z-50 w-full transition-all duration-300 
    ${
      atTop
        ? "bg-transparent text-white"
        : "bg-base-100/60 backdrop-blur-lg shadow"
    }
    
    ${!scrollUp && !atTop ? "-top-20" : "top-0"}
  `; // ${!atTop && overHero ? "" : ""}

  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const links = (
    <>
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
    </>
  );
  return (
    <div className={baseClasses}>
      <div className="navbar justify-between">
        <Link className="rounded-lg  flex items-center" to="/">
          <div className="jost flex leading-4 items-center">
            <img
              src={logo}
              alt="Logo"
              className={`h-10 dark:bg-white mask mask-squircle ${
                atTop ? "bg-white" : ""
              }`}
            />
            <span className="ml-2 text-xl">
              <span>Bongo</span> <span>Discovery</span>
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <label className="swap text-xl btn btn-ghost btn-circle rounded-full">
            <input type="checkbox" onChange={toggleTheme} />
            <div className="swap-on">
              <IoMoonOutline />
            </div>
            <div className="swap-off">
              <MdOutlineLightMode />
            </div>
          </label>
          <ul className="menu text-base menu-horizontal px-1 hidden md:flex">{links}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
