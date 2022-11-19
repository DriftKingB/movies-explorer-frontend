import { Navigate, useLocation } from "react-router-dom"

export default function ProtectedRoute({ component: Component, ...props }) {
  const location = useLocation();
  const token = localStorage.getItem('token');

  return token ? <Component {...props} /> : <Navigate to="/signin" replace state={{from: location}} />
}