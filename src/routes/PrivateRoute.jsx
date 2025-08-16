import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();
  // console.log(location);

  if (loading) {
    return;
  }
  
  if (!user) {
    return <Navigate to='/login' state={location?.pathname} />;
  }

  return children;
};

export default PrivateRoute;