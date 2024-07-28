import { createBrowserRouter,RouteObject } from 'react-router-dom';
import React from "react";
import NotFound from './pages/NotFound';
import Profile from './pages/Profiles';
import Login from './pages/Login';
import Home from './pages/Home';

const routes: RouteObject[] = [
    { path: '/', element: <Home /> },
    { path: '/profile', element: <Profile /> },
    { path: '/login', element: <Login /> },
    { path: '*', element: <NotFound /> },
  ];
  
  const router = createBrowserRouter(routes);

export default router;