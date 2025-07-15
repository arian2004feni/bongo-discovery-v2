import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import Auth from "../Auth/Auth";
import ThemeToggle from "../theme/ThemeToggle";
import Logo from "../Logo";

const Navbar = () => {
  const [atTop, setAtTop] = useState(true);
  const [scrollUp, setScrollUp] = useState(true);
  const [overHero, setOverHero] = useState(true);
  const prevScroll = useRef(0);
  // console.log(prevScroll.current);

const location = useLocation();

useEffect(() => {
  const heroElement = document.querySelector(".hero");

  const handleScroll = () => {
    const currentScroll = window.scrollY;

    setScrollUp(currentScroll < prevScroll.current);
    setAtTop(currentScroll <= 10);

    // ✅ Only update overHero if hero exists
    if (heroElement) {
      const heroHeight = heroElement.offsetHeight;
      setOverHero(currentScroll < heroHeight / 2);
    } else {
      setOverHero(false); // No hero, so we're always "after hero"
    }

    prevScroll.current = currentScroll;
  };

  // Run once to detect on initial render (helps with SSR or router changes)
  handleScroll();

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
  // rerun scroll logic on route change
}, [location.pathname]);


  // useEffect(() => {
  //   const heroHeight = document.querySelector(".hero")?.offsetHeight || 400;

  //   const handleScroll = () => {
  //     const currentScroll = window.scrollY;
  //     console.log(currentScroll);
  //     setScrollUp(currentScroll < prevScroll.current);
  //     setAtTop(currentScroll <= 10);
  //     setOverHero(currentScroll < heroHeight / 2);
  //     prevScroll.current = currentScroll;
  //   };

  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
  const baseClasses = `
  fixed z-50 w-full transition-all duration-300
  ${
    atTop && overHero
      ? "bg-transparent text-white"
      : "bg-base-100/60 backdrop-blur-lg shadow"
  }
  ${!scrollUp && !atTop ? "-top-20" : "top-0"}
`;
  // const baseClasses = `
  //   fixed z-50 w-full transition-all duration-300
  //   ${!atTop && "bg-base-100/60 backdrop-blur-lg shadow"}
  //   ${
  //     atTop && overHero
  //       ? "bg-transparent text-white"
  //       : "bg-base-100/60 backdrop-blur-lg shadow"
  //   }
  //   ${!scrollUp && !atTop ? "-top-20" : "top-0"}
  // `;

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
          <Logo atTop={atTop} />
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
