import test8 from "../../assets/test8.jpg";

const Login = () => {
  const handleLogin = () => {
    // e.preventDefault();
  };

  const openRegisterModal = () => {
    document.getElementById("login_modal").close();
    document.getElementById("register_modal").showModal();
  };

  const openForgotPassModal = () => {
    document.getElementById("login_modal").close();
    document.getElementById("forgotPass_modal").showModal();
  };
  return (
    <dialog id="login_modal" className="modal pl-8 pr-4 py-8">
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
                  Welcome Back!
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                  {/* Email Input */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">
                        Email
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      className="input input-bordered w-full"
                      required
                    />
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
                      name="password"
                      placeholder="******"
                      className="input w-full"
                      required
                    />
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex justify-between items-center text-sm">
                    <div className="form-control">
                      <label className="label cursor-pointer gap-2">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm text-second border-second rounded"
                        />
                        <span className="label-text text-base-content">
                          Remember me
                        </span>
                      </label>
                    </div>
                    <div
                      onClick={openForgotPassModal}
                      className="link link-hover text-second text-sm"
                    >
                      Forgot password?
                    </div>
                  </div>

                  {/* Login Button */}
                  <div className="form-control mt-6">
                    <button
                      type="submit"
                      className="btn bg-second text-base-100 w-full shadow-md"
                    >
                      Login
                    </button>
                  </div>
                </form>
                <div className="divider text-xs">OR</div>
                {/* Google Login Button */}
                <button className="btn w-full bg-base-100 dark:border-second text-base-content shadow">
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

                {/* Register Link */}
                <div className="text-center mt-6 text-base-content">
                  Don't have an account?{" "}
                  <button
                    onClick={openRegisterModal}
                    className="link link-hover text-second font-semibold"
                  >
                    Register here
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

export default Login;
