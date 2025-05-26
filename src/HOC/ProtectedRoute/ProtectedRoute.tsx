import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import type { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;

  return children;
};