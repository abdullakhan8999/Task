import React from "react";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, register } from "../Actions/userActions";
import GoogleComponent from "../Components/GoogleComponent";
import Form from "../Components/Form";
const initialState = {
  fullName: "",
  email: "",
  password: "",
  confirm_password: "",
};

const AuthPage = () => {
  //imported method
  const dispatch = useDispatch();
  const nav = useNavigate();

  //variable state
  const [formDate, setFormDate] = useState(initialState);
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // form variable
  const { user, userLoading } = useSelector((state) => state.user);
  let { fullName, email, password, confirm_password } = formDate;
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  // Effects
  useEffect(() => {
    if (user) {
      nav("/");
    }
  }, [user, nav]);

  //functions
  const toggleIsLogin = () => {
    setIsLogin(!isLogin);
  };
  const handleOnChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      const { name, value } = e.target;
      setFormDate((formDate) => ({ ...formDate, [name]: value }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = {};

    if (!isLogin) {
      //check password match
      if (password !== confirm_password) {
        alert("Passwords do not match");
        return;
      }
      //user data
      UserData = {
        name: fullName,
        email,
        password,
        avatar: avatar,
      };
      dispatch(register(UserData));
      setFormDate(initialState);
    } else {
      dispatch(login(email, password));
      setFormDate(initialState);
    }
  };

  return (
    <>
      {userLoading ? (
        <Loader />
      ) : (
        <>
          <div className="bg-grey-lighter  max-w-screen-xl mx-auto pt-28">
            <div className="container bg-gray-400  relative px-6 py-8 md:rounded-lg shadow-md max-w-sm mx-auto flex-1 flex flex-col items-center justify-center ">
              <Form
                onSubmit={handleSubmit}
                isLogin={isLogin}
                toggleIsLogin={toggleIsLogin}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                handleOnChange={handleOnChange}
                fullName={fullName}
                email={email}
                password={password}
                confirm_password={confirm_password}
                avatarPreview={avatarPreview}
              />
              <GoogleComponent />
              <div className="text-center text-sm text-grey-dark mt-2">
                <span className="no-underline cursor-pointer border-b border-grey-dark text-grey-dark">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="no-underline cursor-pointer border-b border-grey-dark text-grey-dark">
                  Privacy Policy
                </span>{" "}
                are applied.
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AuthPage;
