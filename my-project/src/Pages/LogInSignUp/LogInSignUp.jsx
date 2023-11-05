import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LabelComponent from "../../Components/FormComponents/LabelComponent";
import Loader from "../../Components/Loader.jsx";
import InputComponent from "../../Components/FormComponents/InputComponent";
import { login, loginGoogle, register } from "../../Actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
// const GOOGLE_CLIENT_ID =
//   "642254253174-8v8ni3hgglugq6vdf8fqh3qla5ajmk93.apps.googleusercontent.com";
// const GOOGLE_CLIENT_SECRET = "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";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  confirm_password: "",
};
const LogInSignUp = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { userLoading } = useSelector((state) => state.user);
  const { user: User } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (User) {
      nav("/");
    }
  }, [User, nav]);

  const [formDate, setFormDate] = useState(initialState);
  let { fullName, email, password, confirm_password } = formDate;
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [isLogin, setIsLogin] = useState(false);
  const toggleIsLogin = () => {
    setIsLogin(!isLogin);
  };

  const handleOnChange = (e) => {
    if (e.target.name == "avatar") {
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
      if (password != confirm_password) {
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

  const GoogleBtn = () => {
    return (
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          dispatch(loginGoogle(credentialResponse));
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    );
  };

  return (
    <>
      {userLoading ? (
        <Loader />
      ) : (
        <div className="bg-grey-lighter  max-w-screen-xl mx-auto pt-28">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <form
              className="pt-28 bg-gray-400 relative px-6 py-8 rounded-lg shadow-md text-black w-full"
              onSubmit={handleSubmit}
            >
              <div className="flex top-0 left-0 absolute mb-8 text-xl md:text-2xl border-b-4 items-center mx-auto justify-between text-center w-full">
                <h1
                  className={`w-1/2 p-6 rounded-ss-lg cursor-pointer ${
                    isLogin ? " bg-gray-900 text-white " : ""
                  }`}
                  onClick={() => toggleIsLogin()}
                >
                  LogIn
                </h1>
                <h1
                  onClick={() => toggleIsLogin()}
                  className={`w-1/2 p-6 rounded-se-lg cursor-pointer  ${
                    !isLogin ? " bg-gray-900 text-white " : ""
                  } `}
                >
                  SignUp
                </h1>
              </div>
              <LabelComponent
                isLogin={isLogin}
                name={"Full Name:"}
                HtmlFor={"fullName"}
              />
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaUser />
                </span>
                <InputComponent
                  type={"text"}
                  isLogin={isLogin}
                  id={"fullName"}
                  name={"fullName"}
                  addClass={""}
                  isFocus={true}
                  value={fullName}
                  handleOnChange={handleOnChange}
                  placeholde={"Full Name"}
                />
              </div>
              <LabelComponent HtmlFor={"email"} name={"Email:"} />
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaEnvelope />
                </span>
                <InputComponent
                  type={"text"}
                  id={"email"}
                  name={"email"}
                  addClass={""}
                  value={email}
                  handleOnChange={handleOnChange}
                  placeholde={"Email"}
                />
              </div>
              <LabelComponent HtmlFor={"password"} name={"Password:"} />
              <div className="relative">
                <span
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400`}
                >
                  <FaLock />
                </span>
                <InputComponent
                  type={showPassword ? "text" : "password"}
                  id={"password"}
                  name={"password"}
                  value={password}
                  addClass={`" pr-4 ${isLogin ? "mb-2" : ""}`}
                  handleOnChange={handleOnChange}
                  placeholde={"Password"}
                />
                <span
                  className={` absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {isLogin && (
                <Link
                  to={"/forgotPassword"}
                  className="cursor-pointer text-sm w-full block font-bold text-gray-700 mb-2 text-right"
                >
                  Forgot Password?
                </Link>
              )}
              <LabelComponent
                isLogin={isLogin}
                HtmlFor={"confirm_password"}
                name={"Confirm Password:"}
              />
              <div className="relative">
                <span
                  className={`absolute ${
                    isLogin && "hidden"
                  } left-3 top-1/2 transform -translate-y-1/2 text-gray-400`}
                >
                  <FaLock />
                </span>
                <InputComponent
                  type={showPassword ? "text" : "password"}
                  isLogin={isLogin}
                  id={"confirm_password"}
                  name={"confirm_password"}
                  addClass={" pr-4"}
                  value={confirm_password}
                  handleOnChange={handleOnChange}
                  placeholde={"Confirm Password"}
                />
                <span
                  className={`${
                    isLogin && "hidden"
                  }  absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <LabelComponent
                isLogin={isLogin}
                HtmlFor={"img_select"}
                name={"Register Image:"}
              />
              <div
                id="registerImage"
                className={`flex ${
                  isLogin && "hidden"
                } items-center gap-x-3 mb-4`}
              >
                <img
                  className="w-16 h-16 rounded-full"
                  src={avatarPreview}
                  alt="Avatar Preview"
                />
                <label
                  htmlFor="img_select"
                  className={`block uppercase cursor-pointer bg-slate-900 text-lg py-4 w-full px-2 rounded-md font-bold text-white mb-1`}
                >
                  Select Image
                  <input
                    id="img_select"
                    type="file"
                    name="avatar"
                    hidden
                    accept="image/*"
                    onChange={handleOnChange}
                  />
                </label>
              </div>
              <button
                type="submit"
                className="w-full text-lg text-center py-3 rounded bg-gray-900 text-white hover:bg-gray-600 focus:outline-none mt-1 mb-4"
              >
                {isLogin ? "Login" : "Create Account"}
              </button>
              {/* Google btn */}
              <GoogleBtn />
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
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LogInSignUp;
