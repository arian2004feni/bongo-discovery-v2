import { Link, Navigate, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { getFirebaseAuthErrorMessage } from "../../../../getFirebaseAuthErrorMessage";
import useAuth from "../../../hooks/useAuth";
import loginBg from "./../../../assets/test7.jpg";
import ForgotPass from "./ForgotPass";
import GoogleLogin from "./GoogleLogin";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const LoginPage = () => {
  const { signInUser, setLoading, setEmailText, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const handleLogIn = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then((res) => {
        setLoading(false);
        const user = res.user;
        // Optional: Try splitting displayName into first and last name
        const [firstName = "", lastName = ""] =
          user.displayName?.split(" ") || [];

        const userData = {
          firstName,
          lastName,
          dateOfBirth: "", // You may want to collect this later
          phoneNumber: user.phoneNumber || "", // Usually null from Google
          address: {
            country: "", // You may collect later
            city: "",
            postCode: "",
          },
          email: user.email,
          photo: user.photoURL,
          createdAt: new Date(user.metadata.creationTime).toISOString(),
          lastLogin: new Date(user.metadata.lastSignInTime).toISOString(),
          role: "tourist",
        };

        axiosSecure.post("/users", userData).then((res) => {
          console.log(res.data);
        });
        Swal.fire({
          icon: "success",
          title: "Login Successful ✅",
          text: "Welcome back!",
          confirmButtonText: "Continue",
        });
        navigate(location?.state || "/");
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

  
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }
  if(user) {
    return <Navigate to="/"/>
  }

  return (
    <div className="relative w-full min-h-screen flex justify-center items-center bg-black/20 dark:bg-black/75 pt-20">
      <ForgotPass />
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
      </div>
    </div>
  );
};

export default LoginPage;
