import test8 from "../../assets/test8.jpg";

const ForgotPass = () => {
  const handleRecovery = () => {
    // e.preventDefault();
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

                <form onSubmit={handleRecovery} className="space-y-4">
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
                      placeholder="••••••••"
                      className="input w-full"
                      required
                    />
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
