import React from 'react';
import Home from "./Pages/Home";
import Navbar from './Components/Navbar';
import ForgotPassword from "./Pages/ForgotPassword";
import showNotification from "./Utils/showNotification";
import Auth from "./Pages/AuthPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserInfo } from "./Actions/userActions.js";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    showNotification("Welcome to User Auth");
    dispatch(fetchUserInfo());
    // eslint-disable-next-line
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
        <Route exact path="/auth" element={<Auth />} />
        <Route
          exact
          path="/forgotPassword"
          element={!user ? <ForgotPassword /> : <Navigate to="/auth" />}
        />
      </Routes>
    </Router>
  )
}

export default App