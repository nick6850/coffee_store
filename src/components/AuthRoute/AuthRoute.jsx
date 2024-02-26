import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react";
import { useStores } from "../../contexts/storesContext";

const AuthRoute = observer(({ children }) => {
  const { authStore } = useStores();
  const location = useLocation();

  if (!authStore.isSignedIn) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  return children;
});

export default AuthRoute;
