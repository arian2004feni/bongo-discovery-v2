import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      // ✅ Redirect to homepage
      navigate("/", { replace: true });
    }
  }, [loading, user, navigate]);

  if (loading) return null;

  if (!user) {
    return null;
  }

  return children;
};

export default PrivateRoute;