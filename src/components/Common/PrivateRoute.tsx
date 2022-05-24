import * as React from 'react';
import { Navigate } from 'react-router-dom';

export interface PrivateRouteProps {
  children: JSX.Element;
}

export function PrivateRoute(props: PrivateRouteProps) {
  const isLoggedIn = !!localStorage.getItem('access_token');
  return isLoggedIn ? props.children : <Navigate to="/login" />;
}
