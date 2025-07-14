import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Auth = ({ atTop }) => {
  const { setLoading, user, signOutUser } = useAuth();
  const handleLogOut = () => {
    Swal.fire({
      title: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        signOutUser()
          .then(() => {
            setLoading(false);
            Swal.fire({
              icon: "success",
              title: "Logged out successfully!",
              showConfirmButton: false,
              timer: 1000,
            });
          })
          .catch((error) => {
            setLoading(false);
            console.error("Error signing out:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "info",
          title: "Cancelled",
          text: "You are still logged in.",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    });
  };

  if (user) {
    return (
      <div className="flex items-center">
        <div className="ml-2 dropdown dropdown-end">
          <div
            tabIndex={0}
            className="relative avatar cursor-pointer avatar-online"
          >
            <div className=" w-11 border rounded-full">
              <img
                src={user.photoURL}
                alt={user.displayName || "User Avatar"}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://i.ibb.co/JX3zV4J/pngtree-vector-avatar-icon-png-image-889567-removebg-preview.png";
                }}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-200 text-black dark:text-white rounded-box z-1 mt-4 w-52 p-2 shadow-sm "
          >
            <span className="absolute bg-base-200 size-6 right-3 -top-1 rotate-45"></span>
            <li className="menu-title">
              {user?.displayName} - {user?.email}{" "}
            </li>
            <li>
              <Link>Dashboard</Link>
            </li>
            <li>
              <Link>Offer Announcements</Link>
            </li>
          </ul>
        </div>
        <button
          onClick={handleLogOut}
          className={`btn btn-ghost hover:bg-transparent outline-1 rounded-none -outline-offset-1 ${
            atTop
              ? "outline-white hover:text-white"
              : "outline-black dark:outline-white"
          }  *:hover:bg-transparent rounded mx-2`}
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => document.getElementById("login_modal").showModal()}
        className={`btn btn-ghost hover:bg-transparent outline-1 rounded-none -outline-offset-1 ${
          atTop
            ? "outline-white hover:text-white"
            : "outline-black dark:outline-white"
        }  *:hover:bg-transparent rounded mx-2`}
      >
        Login
      </button>
      <button
        onClick={() => document.getElementById("register_modal").showModal()}
        className="btn rounded-none border-prime shadow-none bg-prime dark:bg-dark-prime text-prime-content"
      >
        Register
      </button>
    </div>
  );
};

export default Auth;
