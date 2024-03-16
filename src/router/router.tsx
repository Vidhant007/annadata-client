import AuthLayout from "@/_auth/AuthLayout";
import SignIn from "@/_auth/forms/SignIn";
import SignUp from "@/_auth/forms/SignUp";
import RootLayout from "@/_root/RootLayout";
import Home from "@/_root/pages/Home";
import Hotspot from "@/_root/pages/Hotspot";
import PickupDetails from "@/_root/pages/PickupDetails";
import Profile from "@/_root/pages/Profile";
import EntryScreen from "@/components/EntryScreen";
import ErrorPage from "@/error-page";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  // public routes
  {
    element: <EntryScreen />,
    errorElement: <ErrorPage />,
    path: "/",
  },
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/hotspot-areas",
        element: <Hotspot />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/pickupDetails",
        element: <PickupDetails />,
      },
    ],
  },
  // public routes
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
    ],
  },
]);
