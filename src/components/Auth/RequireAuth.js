import React from "react";
import { useLocation,Navigate,Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({allowedRoles}) => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log('Require auth obj: '  + JSON.stringify(auth))
    console.log('allowed roles: ' + JSON.stringify(allowedRoles) )

    return (  
      auth.arrayRoles && auth.arrayRoles.find(role => allowedRoles.includes(role))
          ? <Outlet />
          : auth.username
              ? <Navigate to="/unauthorized" state={{ from: location }} replace />
              : <Navigate to="/login-page" state={{ from: location }} replace />
    );
}
export default RequireAuth