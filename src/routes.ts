import { lazy } from "react";
import Home from "./pages/Home";
const Login = lazy(() => import("./pages/Login"));

export const appRoutes = [
  {
    path: "/",
    component: Home,
    requiresAuth: false,
    nuetral: false,
  },
  {
    path: "/signin",
    component: Login,
    requiresAuth: false,
    nuetral: false,
  }
  
];
