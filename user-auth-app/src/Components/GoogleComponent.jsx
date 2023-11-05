import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { loginGoogle } from "../Actions/userActions";
import showNotification from "../Utils/showNotification";

const GoogleComponent = () => {
  const dispatch = useDispatch();

  return (
    <GoogleLogin
      theme="filled_blue"
      onSuccess={(credentialResponse) => {
        dispatch(loginGoogle(credentialResponse));
      }}
      onError={(error) => {
        console.log("Login Failed");
        showNotification(error, "error");
      }}
    />
  );
};

export default GoogleComponent;
