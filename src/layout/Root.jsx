import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Common/Navbar";
import Footer from "../components/Common/Footer";
import LoadingPage from "../components/LoadingAnimation/LoadingPage";

const Root = () => {
  return (
    <>
    <div className="flex flex-col min-h-screen p-0">
      <Navbar />
      <main className="flex-grow">
      <LoadingPage />
        <Outlet />
      </main>
      <Footer />
    </div>
    </>
  );
};

export default Root;
