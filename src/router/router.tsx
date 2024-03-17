import AuthLayout from "@/_auth/AuthLayout";
import SignIn from "@/_auth/forms/SignIn";
import SignUp from "@/_auth/forms/SignUp.jsx";
import RootLayout from "@/_root/RootLayout";
import Home from "@/_root/pages/Home";
import Hotspot from "@/_root/pages/Hotspot";
import PickupDetails from "@/_root/pages/PickupDetails.jsx";
import Profile from "@/_root/pages/Profile.jsx";
import Tickets from "@/_root/pages/Tickets.jsx";
import Rewards from "@/_root/pages/Rewards.jsx";
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
      {
        path: "/rewards",
        element: <Rewards />,
      },
      {
        path: "/tickets",
        element: <Tickets />,
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
