import "./App.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import { useEffect } from "react";
import { fetchUserInfo } from "./Actions/userActions.js";
import Home from "./Pages/Home/Home.jsx";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword.jsx";
import LogInSignUp from "./Pages/LogInSignUp/LogInSignUp.jsx";
import showNotification from "../Utils/showNotification.js";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    showNotification("Welcome to User Auth");
    dispatch(fetchUserInfo());
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home /> : <Navigate to="/auth" />}
        />
        <Route exact path="/auth" element={<LogInSignUp />} />
        <Route
          exact
          path="/forgotPassword"
          element={!user ? <ForgotPassword /> : <Navigate to="/auth" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
