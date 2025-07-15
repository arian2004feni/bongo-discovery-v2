import React from "react";
import { Outlet } from "react-router";
import DashboardSideNav from "../components/Common/DashboardSideNav";
import ThemeToggle from "../components/theme/ThemeToggle";
import Logo from "../components/Logo";

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar justify-between bg-base-300 w-full lg:hidden">
          <div className="flex items-center justify-center">
            <label
              htmlFor="my-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost mr-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
            <Logo />
          </div>
          <div className="">
            <ThemeToggle />
          </div>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu menu-lg gap-3 bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar Logo */}
          <div className="mb-5 flex justify-between items-center">
            <Logo />
            <ThemeToggle />
          </div>
          {/* Sidebar Navigation */}
          <DashboardSideNav />
          {/* Footer */}
          <footer className="mt-auto mb-2 text-center">
            <div className="divider"></div>
            Logged in as <span className="font-bold">Tourist</span>
          </footer>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
