import { useForm } from "react-hook-form";
import test8 from "../../assets/test8.jpg";
import FormError from "../FormError";

const ForgotPass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
    const onSubmit = (data) => {
    console.log("Recover Email:", data.email);
  };

  const openLoginModal = () => {
    document.getElementById("forgotPass_modal").close();
    document.getElementById("login_modal").showModal();
  };
  return (
    <dialog id="forgotPass_modal" className="modal pl-8 pr-4 py-8">
      <div className="modal-box rounded-none p-0 max-w-10/12 w-full h-full text-base-content bg-base-300">
        <form method="dialog">
          <button className="btn btn-md lg:btn-lg btn-circle btn-ghost text-forth hover:bg-white border-none absolute right-2 top-2 z-50">
            ✕
          </button>
        </form>

        <div className="w-full h-full">
          <div className="flex w-full h-full flex-col lg:flex-row-reverse">
            {/* Left Side: Image */}
            <div className="lg:w-1/2 w-full h-full relative">
              <img
                src={test8}
                alt="scenario image matching the theme"
                className="w-full h-full object-cover object-center"
                // Fallback for image loading errors
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = "https://i.ibb.co/Y7x9MnK5/image.png"; // Muted Ash Grey background
                }}
              />
              {/* Optional: Overlay text on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-second/70 to-transparent flex items-end p-4 lg:p-8">
                <h2 className="text-3xl tracking-wider font-heading text-white drop-shadow-lg">
                  Unlock Your Next Adventure
                </h2>
              </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="lg:w-1/2 w-full my-auto">
              <div className="w-full max-w-9/12 px-10 py-12 mx-auto">
                <h2 className="text-3xl font-heading tracking-widest sm:text-4xl text-second mb-6 text-center">
                  Password Recovery!
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}  className="space-y-4">
                  {/* Email Input */}
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
                          message: "Please enter a valid email address",
                        },
                      })}
                    />
                    <FormError error={errors.email} />
                  </div>

                  {/* Login Button */}
                  <div className="form-control mt-6">
                    <button
                      type="submit"
                      className="btn bg-second text-base-100 w-full shadow-md"
                    >
                      Send Recovery Link
                    </button>
                  </div>
                </form>

                {/* Register Link */}
                <div className="text-center mt-6 text-base-content">
                  Back to{" "}
                  <button
                    onClick={openLoginModal}
                    className="link link-hover text-second font-semibold"
                  >
                    Login Page
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

export default ForgotPass;
