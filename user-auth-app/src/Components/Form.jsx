import React from "react";
import LabelComponent from "./LabelComponent";
import InputComponent from "./InputComponent";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Form = ({
  onSubmit,
  isLogin,
  toggleIsLogin,
  showPassword,
  setShowPassword,
  handleOnChange,
  fullName,
  email,
  password,
  confirm_password,
  avatarPreview,
}) => {
  return (
    <form className="pt-16  text-black w-full" onSubmit={onSubmit}>
      <div className="flex top-0 left-0 absolute mb-8 text-xl md:text-2xl border-b-4 items-center mx-auto justify-between text-center w-full">
        <h1
          className={`w-1/2 p-6 md:rounded-ss-lg cursor-pointer ${
            isLogin ? " bg-gray-900 text-white " : ""
          }`}
          onClick={() => toggleIsLogin()}
        >
          LogIn
        </h1>
        <h1
          onClick={() => toggleIsLogin()}
          className={`w-1/2 p-6 md:rounded-se-lg cursor-pointer  ${
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
        className={`flex ${isLogin && "hidden"} items-center gap-x-3 mb-4`}
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
    </form>
  );
};

export default Form;
