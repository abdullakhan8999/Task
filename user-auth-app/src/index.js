import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Auth } from './Constants/OAuth';
const GOOGLE_CLIENT_ID = Auth.clientId;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </GoogleOAuthProvider>
);

