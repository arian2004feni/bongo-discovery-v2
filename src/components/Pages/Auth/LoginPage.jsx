import { Link, useLocation, useNavigate } from "react-router";
import { getFirebaseAuthErrorMessage } from "../../../../getFirebaseAuthErrorMessage";
import { Helmet } from "react-helmet";
import loginBg from "./../../../assets/test7.jpg";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import GoogleLogin from "./GoogleLogin";
import ForgotPass from "./ForgotPass";

const LoginPage = () => {
  const { signInUser, setLoading, setEmailText } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogIn = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful ✅",
          text: "Welcome back!",
          confirmButtonText: "Continue",
        });
        navigate(location?.state || "/");
        setLoading(false);
      })
      .catch((err) => {
        const message = getFirebaseAuthErrorMessage(err.code);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: message,
          confirmButtonText: "OK",
        });
        setLoading(false);
      });
  };

  return (
    <div className="relative w-full min-h-screen flex justify-center items-center bg-black/20 dark:bg-black/75 pt-20">
      <Helmet>
        <title>Bongo Discovery | Login</title>
      </Helmet>
      <img
        src={loginBg}
        alt="bg"
        className="absolute w-full object-cover object-center h-full -z-1 blur-xs"
      />
      <div className="max-w-md w-full mt-5 sm:mt-20 px-5">
        <div className="bg-base-100 px-8 py-5">
          <h2 className="text-center text-2xl mb-5 font-medium">Login</h2>

          <GoogleLogin />

          <div className="divider">OR</div>

          <form onSubmit={handleLogIn}>
            <label className="floating-label mb-4">
              <span>Your Email</span>
              {/* <input type="email" placeholder="Your Email" className="input max-w-md w-full sm:input-lg" /> */}
              <label className="input sm:input-lg w-full px-0">
                <input
                  name="email"
                  type="email"
                  onChange={(e) => setEmailText(e.target.value)}
                  placeholder="Your Email"
                  className="pl-3"
                  required
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>
            </label>

            <label className="floating-label">
              <span>Password</span>
              {/* <input type="password" placeholder="Password" className="input w-full sm:input-lg" /> */}
              <label className="input sm:input-lg w-full">
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  minLength="6"
                  pattern=".{6,}"
                  title="Must be at least 6 characters"
                />
                {/* <MdOutlineRemoveRedEye className='cursor-pointer size-6 ' /> */}
              </label>
            </label>

            <div className="mt-4">
              <div
                onClick={() =>
                  document.getElementById("forgotPass_modal").showModal()
                }
                className="link link-hover"
              >
                Forgot your password?
              </div>
            </div>
            <input
              type="submit"
              value="Sign In"
              className="btn btn-neutral sm:btn-lg btn-block mt-5"
            />
          </form>
        </div>
        <div className="bg-base-100 px-8 py-5 mt-5 mb-20">
          <p className="text-center">
            Don't have an account?{" "}
            <Link className="link link-hover link-info" to="/register">
              Sign up
            </Link>{" "}
          </p>
        </div>
      <ForgotPass />
      </div>
    </div>
  );
};

export default LoginPage;
