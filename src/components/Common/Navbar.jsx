import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router";
import ThemeToggle from "../theme/ThemeToggle";
import Auth from "../Auth";

const Navbar = () => {
  const [atTop, setAtTop] = useState(true);
  const [scrollUp, setScrollUp] = useState(true);
  const prevScroll = useRef(0);
  // console.log(prevScroll.current);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      setScrollUp(currentScroll < prevScroll.current);
      setAtTop(currentScroll <= 10);
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
        <div className="navbar-start">
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
        </div>
        <div className="navbar-center flex items-center gap-2">
          <ul className="menu text-base menu-horizontal px-1 hidden md:flex">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          <ThemeToggle />
          <Auth atTop={atTop} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
