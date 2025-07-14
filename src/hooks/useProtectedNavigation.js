
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const useProtectedNavigation = () => {
  const { user, setRedirectAfterLogin } = useAuth();
  const navigate = useNavigate();

  const goToProtectedRoute = (path) => {
    if (!user) {
      // 🧠 Save the path to go to after login
      setRedirectAfterLogin(path);

      // 🚪 Open the login modal
      const modal = document.getElementById("login_modal");
      if (modal) {
        modal.showModal();
      }
    } else {
      // 🔓 User is logged in, go directly
      navigate(path);
    }
  };

  return goToProtectedRoute;
};

export default useProtectedNavigation;
