import React from 'react'
import  { Navigate, Outlet} from 'react-router-dom'
import auth from './auth-helper'

function PrivateRoute() {
    const isAuthenticated = auth.isAuthenticated()

    return isAuthenticated ? <Outlet /> : <Navigate to="/signin"/>;
    
  }

  export default PrivateRoute;