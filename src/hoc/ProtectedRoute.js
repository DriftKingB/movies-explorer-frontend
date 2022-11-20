import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom"
import { AuthContext } from "./AuthProvider";

export default function ProtectedRoute({ component: Component, ...props }) {
  const location = useLocation();
  const { tokenIsPresent } = useContext(AuthContext);

  return tokenIsPresent ? <Component {...props} /> : <Navigate to="/signin" replace state={{from: location}} />
}