// import package
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

// import assets
import { UserContext } from "./UserContext";

// create component here
function PrivateRoute({ element: Component, ...rest }) {
  const [state, dispatch] = useContext(UserContext);

  return state.isLogin ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
