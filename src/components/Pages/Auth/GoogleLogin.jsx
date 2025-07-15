import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { getFirebaseAuthErrorMessage } from "../../../../getFirebaseAuthErrorMessage";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

const GoogleLogin = () => {
  const { googleSignInUser, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = () => {
    setLoading(true);

    googleSignInUser()
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
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          role: "tourist",
        };

        axios
          .post("http://localhost:3000/users", userData)
          .then((res) => {
            console.log("User added:", res.data);
          })
          .catch((err) => {
            console.error("Error adding user:", err);
          });

        Swal.fire({
          icon: "success",
          title: "Login Successful 🎉",
          text: "You’ve signed in with Google successfully!",
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

  return (
    <button
      onClick={handleGoogleLogin}
      className={`btn w-full bg-base-100 dark:border dark:border-white/20 text-base-content shadow`}
    >
      <svg
        aria-label="Google logo"
        width="16"
        height="16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <g>
          <path d="m0 0H512V512H0" fill="transparent"></path>
          <path
            fill="#34a853"
            d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
          ></path>
          <path
            fill="#4285f4"
            d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
          ></path>
          <path
            fill="#fbbc02"
            d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
          ></path>
          <path
            fill="#ea4335"
            d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
          ></path>
        </g>
      </svg>
      Login with Google
    </button>
  );
};

export default GoogleLogin;
