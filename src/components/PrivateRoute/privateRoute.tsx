import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../context/currentUserContext";

interface PrivateRouteProps {
  element: React.ReactElement;
  redirectTo?: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  redirectTo = "/",
}) => {
  const { user } = useContext(CurrentUserContext);

  return user ? element : <Navigate to={redirectTo} />;
};
