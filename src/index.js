import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LookUpPage from "./pages/LookUpPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TravelSchedulePage from "./pages/TravelSchedulePage";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import LookUpResultPage from "./pages/LookUpResultPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "lookup",
    element: <LookUpPage />,
  },
  {
    path: "travelschedule",
    element: <TravelSchedulePage />,
  },
  {
    path: "searchpage",
    element: <SearchPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "emailverification",
    element: <EmailVerificationPage />,
  },
  {
    path: "forgotpassword",
    element: <ForgotPasswordPage />,
  },
  {
    path: "resetpassword",
    element: <ResetPasswordPage />,
  },
  {
    path: "lookupresult",
    element: <LookUpResultPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}></RouterProvider>);
