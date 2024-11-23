import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Courses from "./pages/AllCourses.jsx";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Classroom from "./pages/Classroom";
import SingleClass from "./pages/SingleClass";
import Reward from "./pages/Reward";
import Protected from "./components/Protected";
import Canvas from "./components/canvas/Canvas.jsx";
import SearchClassrooms from "./pages/SearchClassrooms.jsx";
import UserAvatar from "./components/UserAvatar.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";
// Define public routes
const publicRoutes = [
  { path: "/", element: <Home /> },
  {path: "/userAvatar", element: <UserAvatar/>},
  { path: "/courses", element: <Courses /> },
  { path: "/contact", element: <Contact /> },
  { path: "/about", element: <About /> },
  { path: "/canvas", element: <Canvas /> },
  {path:'/verifyotp',element:<VerifyOtp />},
];

// Define auth routes (accessible only when logged out)
const authRoutes = [
  {
    path: "/login",
    element: (
      <Protected authentication={false} redirectPath="/classroom">
        <Login />
      </Protected>
    ),
  },
  {
    path: "/signup",
    element: (
      <Protected authentication={false} redirectPath="/classroom">
        <Signup />
      </Protected>
    ),
  },
];

// Define protected routes (require authentication)
const protectedRoutes = [
  {
    path: "/profile",
    element: (
      <Protected authentication={true}>
        <Profile />
      </Protected>
    ),
  },
  {
    path: "/classroom",
    element: (
      <Protected authentication={true}>
        <Classroom />
      </Protected>
    ),
  },
  {
    path: "/classroom/:classCode",
    element: (
      <Protected authentication={true}>
        <SingleClass />
      </Protected>
    ),
  },
  {
    path: "/searchclassrooms",
    element: (
      <Protected authentication={true}>
        <SearchClassrooms/>
      </Protected>
    ),
  },

  {
    path: "/reward",
    element: (
      <Protected authentication={true}>
        <Reward />
      </Protected>
    ),
  },
];
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [...publicRoutes, ...authRoutes, ...protectedRoutes],
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
