import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
function Protection({children}) {
    const isAuthenticated = localStorage.getItem("authToken") ? true : false;

    if(isAuthenticated){
        return <Navigate to="/login" replace />;
    }
    return children ? children : <Outlet />;
}

export default Protection;