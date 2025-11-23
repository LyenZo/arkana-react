import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const auth = localStorage.getItem("auth");

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
