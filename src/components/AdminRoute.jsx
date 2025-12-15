import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { isLogged, isAdmin } = useAuth();

  if (!isLogged) {
    return <Navigate to="/" replace />;
  }


  return children;
}
