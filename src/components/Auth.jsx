import React from "react";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import ForgotPass from "./Auth/ForgotPass";

const Auth = ({ atTop }) => {
  return (
    <div>
      <button
        onClick={() => document.getElementById("login_modal").showModal()}
        className={`btn btn-ghost hover:bg-transparent outline-1 rounded-none -outline-offset-1 ${
          atTop
            ? "outline-white hover:text-white"
            : "outline-black dark:outline-white"
        }  *:hover:bg-transparent rounded mx-2`}
      >
        Login
      </button>
      <button
        onClick={() => document.getElementById("register_modal").showModal()}
        className="btn rounded-none border-prime shadow-none bg-prime dark:bg-dark-prime text-prime-content"
      >
        Register
      </button>
      <Login /> <Register /> <ForgotPass />
    </div>
  );
};

export default Auth;
