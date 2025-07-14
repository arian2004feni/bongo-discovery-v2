import { useForm } from "react-hook-form";
import test7 from "../../assets/test7.jpg";
import GoogleLogin from "./GoogleLogin";
import FormError from "../FormError";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import LoadingPage from "../LoadingAnimation/LoadingPage";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Register = () => {
  const {
    user,
    redirectAfterLogin,
    setRedirectAfterLogin,
    createUser,
    setUser,
    setLoading,
  } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user && redirectAfterLogin) {
      navigate(redirectAfterLogin);
      setRedirectAfterLogin(null); // 🧹 clear it
    }
  }, [user, redirectAfterLogin, navigate, setRedirectAfterLogin]);

  const onSubmit = ({ name, email, photoUrl, password }) => {
    setLoading(true);

    createUser(email, password)
      .then((res) => {
        const profile = {
          displayName: name,
          photoURL: photoUrl,
        };

        updateProfile(res.user, profile)
          .then(() => {
            setLoading(false);
            document.getElementById("register_modal").close();
            setUser({
              uid: res.user.uid,
              email: res.user.email,
              displayName: name,
              photoURL: photoUrl,
            });

            reset();

            Swal.fire({
              icon: "success",
              title: "Registration Successful 🎉",
              text: "Welcome aboard!",
              confirmButtonText: "Continue",
            });
          })
          .catch((err) => {
            setLoading(false);
            console.error(err);
            Swal.fire({
              icon: "error",
              title: "Profile Update Failed",
              text: err.message || "Unable to set profile details.",
              confirmButtonText: "OK",
            }).then(() => {
              document.getElementById("register_modal").showModal();
              reset();
            });
          });
      })
      .catch((err) => {
        setLoading(false);
        document.getElementById("register_modal").close();
        console.error(err);

        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: err.message || "Could not create account. Please try again.",
          confirmButtonText: "OK",
        }).then(() => {
          document.getElementById("register_modal").showModal();
          reset();
        });
      });
  };

  const openLoginModal = () => {
    document.getElementById("register_modal").close();
    document.getElementById("login_modal").showModal();
  };
  return (
    <dialog id="register_modal" className="modal pl-8 pr-4 py-8">
      <div className="modal-box rounded-none p-0 max-w-none w-full h-full text-base-content bg-base-300">
        <form method="dialog">
          <button className="btn z-50 btn-md lg:btn-lg btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <div className="h-full">
          <LoadingPage />
          {/* Two-box layout container */}
          <div className="flex flex-col lg:flex-row w-full h-full">
            {/* Right Side: Image */}
            <div className="lg:w-1/2 w-full h-64 lg:h-auto relative">
              <img
                src={test7}
                alt="Vibrant Bangladeshi Culture"
                className="w-full h-full object-cover"
                // Fallback for image loading errors
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src =
                    "https://placehold.co/800x600/616161/FFFFFF?text=Image+Unavailable"; // Muted Ash Grey background
                }}
              />
              {/* Optional: Overlay text on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-prime/70 to-transparent flex items-end p-4 lg:p-8">
                <h2 className="text-4xl tracking-wider font-heading text-white drop-shadow-lg">
                  Discover the Wonders of Bangladesh
                </h2>
              </div>
            </div>

            {/* Right Side: Register Form */}
            <div className="lg:w-1/2 w-full my-auto">
              <div className="w-full max-w-8/12 px-10 py-12 mx-auto">
                <h2 className="text-3xl font-heading tracking-widest sm:text-4xl text-prime mb-6 text-center">
                  Register Here!
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* name Input */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="input input-bordered w-full"
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 3,
                          message: "Minimum 3 characters",
                        },
                      })}
                    />
                    <FormError error={errors.name} />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">
                        Photo URL
                      </span>
                    </label>
                    <input
                      placeholder="https://example.com/photo.jpg"
                      className="input input-bordered w-full"
                      {...register("photoUrl", {
                        required: "Photo is required",
                        minLength: {
                          value: 3,
                          message: "Minimum 3 characters",
                        },
                      })}
                    />
                    <FormError error={errors.photoUrl} />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">
                        Email
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="input input-bordered w-full"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Invalid email",
                        },
                      })}
                    />
                    <FormError error={errors.email} />
                  </div>

                  {/* Password Input */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">
                        Password
                      </span>
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="input w-full"
                      {...register("password", {
                        required: "Password is required",
                        minLength: { value: 6, message: "Min 6 characters" },
                        validate: (val) =>
                          /[A-Z]/.test(val) ||
                          "Must contain at least one uppercase letter",
                      })}
                    />
                    <FormError error={errors.password} />
                  </div>

                  {/* Login Button */}
                  <div className="form-control mt-6">
                    <button
                      type="submit"
                      className="btn bg-prime text-base-100 w-full shadow-md"
                    >
                      Register
                    </button>
                  </div>
                </form>
                <div className="divider text-xs">OR</div>
                <GoogleLogin color={"prime"} id={"register_modal"} />

                {/* Register Link */}
                <div className="text-center mt-6 text-base-content">
                  Already have an account?{" "}
                  <button
                    onClick={openLoginModal}
                    className="link link-hover text-prime font-semibold"
                  >
                    Login here
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Register;
