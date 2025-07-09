import test7 from "../../assets/test7.jpg";

const Register = () => {
  const handleRegister = () => {
    // e.preventDefault();
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
          {/* Two-box layout container */}
          <div className="flex flex-col lg:flex-row overflow-hidden w-full h-full">
            {/* Right Side: Image */}
            <div className="lg:w-1/2 w-full h-64 lg:h-auto overflow-hidden relative">
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

                <form onSubmit={handleRegister} className="space-y-4">
                  {/* name Input */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">
                        Photo URL
                      </span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com/photo.jpg"
                      className="input input-bordered w-full"
                      required
                    />
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
                      placeholder="••••••••"
                      className="input w-full"
                      required
                    />
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
                <button className="btn w-full bg-base-100 dark:border-prime text-base-content shadow">
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
