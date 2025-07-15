import { getFirebaseAuthErrorMessage } from "../../../../getFirebaseAuthErrorMessage";
import test8 from "../../../assets/test8.jpg";
import useAuth from "../../../hooks/useAuth";
import LoadingPage from "../../LoadingAnimation/LoadingPage";
import Swal from "sweetalert2";

const ForgotPass = () => {
  const { forgetPassword, setLoading, setEmailText, emailText } = useAuth();

  const handleForgotPassword = (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    forgetPassword(email)
      .then(() => {
        setLoading(false);
        document.getElementById("forgotPass_modal").close();
        Swal.fire({
          icon: "success",
          title: "Email Sent!",
          text: "Please check your inbox for the password reset link.",
          showCancelButton: true,
          confirmButtonText: "Open Mail",
          cancelButtonText: "Later",
          customClass: {
            popup: "z-[9999]", // Tailwind style for high z-index
          },
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect to mail—customize this URL based on user needs
            window.open("https://mail.google.com", "_blank");
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            openLoginModal();
          }
        });
      })
      .catch((err) => {
        const message = getFirebaseAuthErrorMessage(err.code);
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
      });
  };

  const openLoginModal = () => {
    document.getElementById("forgotPass_modal").close();
  };
  return (
    <dialog id="forgotPass_modal" className="modal pl-8 pr-4 py-8">
      <div className="modal-box rounded-none p-0 max-w-xl w-full h-full text-base-content bg-base-300">
        <form method="dialog">
          <button className="btn btn-md lg:btn-lg btn-circle btn-ghost text-forth hover:bg-white border-none absolute right-2 top-2 z-50">
            ✕
          </button>
        </form>

        <div className="w-full h-full">
          <LoadingPage />
          <div className="flex w-full h-full flex-col relative lg:flex-row-reverse">
            {/* Left Side: Image */}
            <div className="w-full h-full ">
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
            <div className="absolute inset-0 flex justify-center items-center w-full my-auto">
              <div className="w-full max-w-9/12 bg-base-100/60 backdrop-blur-2xl px-10 py-12 mx-auto rounded-lg">
                <h2 className="text-3xl font-heading tracking-widest sm:text-4xl text-second dark:text-white mb-6 text-center">
                  Password Recovery!
                </h2>

                <form onSubmit={handleForgotPassword} className="space-y-4">
                  {/* Email Input */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-base-content">
                        Email
                      </span>
                    </label>
                    <input
                      type="email"
                      value={emailText}
                      onChange={(e) => setEmailText(e.target.value)}
                      placeholder="Enter Your Email Address"
                      className="input input-bordered w-full"
                    />
                  </div>

                  {/* Login Button */}
                  <div className="form-control mt-6">
                    <button
                      type="submit"
                      className="btn border-second/20 bg-second text-white font-normal w-full shadow-md"
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
