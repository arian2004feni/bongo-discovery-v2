import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import Auth from "../Auth/Auth";
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
  const baseClasses = `
  fixed z-50 w-full transition-all duration-300
  ${
    atTop && overHero
      ? "md:bg-transparent text-white"
      : "bg-base-100/60 backdrop-blur-lg shadow"
  }
  ${!scrollUp && !atTop ? "-top-20" : "top-0"}
`;

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
          <Logo />
        </div>
        <div className="navbar-center flex items-center gap-2">
          <ul className="menu text-base menu-horizontal px-1 hidden md:flex">
            {links}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="hidden md:flex">
            <Auth atTop={atTop} overHero={overHero} />
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box z-1 mt-4 w-52 p-2 shadow max-md:text-base-content"
            >{links}<div className="flex flex-col md:hidden"><Auth /></div></ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
