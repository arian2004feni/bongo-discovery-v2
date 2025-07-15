import { updateProfile } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router";
import { getFirebaseAuthErrorMessage } from "../../../../getFirebaseAuthErrorMessage";
import registerBg from "./../../../assets/test1.jpg";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import GoogleLogin from "./GoogleLogin";

const RegisterPage = () => {
  const { createUser, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(name, email, photo, password, "here");
    createUser(email, password)
      .then((res) => {
        console.log(res.user);
        const userInfo = {
          displayName: name,
          photoURL: photo,
        };
        updateProfile(res.user, userInfo)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Registration Successful 🎉",
              text: "Welcome aboard!",
              confirmButtonText: "Continue",
            });
            navigate(location?.state || "/");
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            const message = getFirebaseAuthErrorMessage(err.code);
            Swal.fire({
              icon: "error",
              title: "Profile Update Failed",
              text: message,
              confirmButtonText: "OK",
            });
          });
      })
      .catch((err) => {
        setLoading(false);
        const message = getFirebaseAuthErrorMessage(err.code);
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: message,
          confirmButtonText: "OK",
        });
      });
  };
  return (
    <div className="relative w-full min-h-screen py-20 flex justify-center items-center bg-black/20 dark:bg-black/75">
      <img
        src={registerBg}
        alt="bg"
        className="absolute w-full object-cover object-center h-full -z-1 blur-sm"
      />
      <div className="max-w-md w-full mt-5 sm:mt-20 px-5">
        <div className="bg-base-100 px-8 py-5">
          <h2 className="text-center text-2xl mb-5 font-medium">Sign up</h2>

          <GoogleLogin />

          <div className="divider">OR</div>

          <form onSubmit={handleRegister}>
            <label className="floating-label mb-4">
              <span>Name</span>
              {/* <input type="text" placeholder="Name" name='name' className="input max-w-md w-full " /> */}
              <label className="input w-full validator px-0">
                <input
                  name="name"
                  className="pl-3"
                  type="text"
                  required
                  placeholder="Username"
                  minLength="3"
                  maxLength="30"
                  title="Only letters, numbers or dash"
                />
              </label>
              <p className="validator-hint hidden">
                Required: Must be 3 to 30 characters
              </p>
            </label>

            <label className="floating-label mb-4">
              <span>Photo URL</span>
              {/* <input type="text" placeholder="Photo URL"  className="input max-w-md w-full sm:input-lg" /> */}
              <label className="input w-full  validator px-0">
                <input
                  name="photo"
                  type="text"
                  required
                  placeholder="Photo URL"
                  title="Must be valid URL"
                  className="pl-3"
                />
              </label>
              <p className="validator-hint hidden">
                Required: Must be valid URL
              </p>
            </label>

            <label className="floating-label mb-4">
              <span>Email Address</span>
              {/* <input type="email" placeholder="Email Address" className="input max-w-md w-full " /> */}
              <label className="input  w-full validator px-0">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="pl-3"
                  name="email"
                  required
                />
              </label>
              <div className="validator-hint hidden">
                Required: Enter valid email address
              </div>
            </label>

            <label className="floating-label">
              <span>Password</span>
              {/* <input type="password" placeholder="Password" className="input max-w-md w-full " /> */}
              <label className="input validator  w-full">
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  minLength="6"
                  pattern="(?=.*[a-z])(?=.*[A-Z]).{6,}"
                  title="Must be at least 6 characters, lowercase letter, uppercase letter"
                />
              </label>
              <p className="validator-hint hidden">
                Must be at least 6 characters, including
                <br /> At least one lowercase letter <br />
                At least one uppercase letter
              </p>
            </label>

            <input
              type="submit"
              value="Sign up"
              className="btn btn-neutral sm:btn-lg btn-block mt-5"
            />
          </form>
        </div>
        <div className="bg-base-100 px-8 py-5 mt-5">
          <p className="text-center">
            Already have an account?{" "}
            <Link className="link link-hover link-info" to="/login">
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
