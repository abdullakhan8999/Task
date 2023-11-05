import axios from "axios";
import {
   passwordResetRequested,
   passwordResetSuccess,
   passwordResetFailed,
   getUserInfoReceived,
   getUserInfoRequestFailed,
   getUserInfoRequested,
   userLoginError,
   userLoginRequest,
   userLoginSuccess,
   userLogoutRequest,
   userLogoutSuccess,
   userSignupError,
   userSignupRequest,
   userSignupSuccess,
   clearError
} from "../Reducers/userReducer";
import showNotification from "../../Utils/showNotification";
const BASE_URL = "http://localhost:8080";
import { decode } from "jwt-decode";

// user Login
export const loginGoogle = (credentialResponse) => async (dispatch) => {
   try {
      dispatch(userLoginRequest());
      let token = credentialResponse.credential;
      localStorage.setItem('token', token);
      let user = decode(token); // Use the decode function

      showNotification("Login Successfully", "success");
      dispatch(userLoginSuccess({
         user,
         token,
      }));

   } catch (error) {
      console.log("Error while login user:", error.response?.data?.message);
      dispatch(userLoginError({ error: error.response.data.message }));
      showNotification("Error while login user", "warning");
      dispatch(clearError());
   }
};

export const getUserToken = () => {
   return localStorage.getItem('token');
}
// user Login
export const login = (email, password) => async (dispatch) => {
   try {
      dispatch(userLoginRequest());

      const config = {
         headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(
         BASE_URL + `/auth/login`,
         { email, password },
         config
      );
      const {
         user,
         token,
      } = data

      if (!token) {
         dispatch(userLoginError({ error: "Internal Server Error!" }));
         dispatch(clearError());
         showNotification("Internal Server Error!", "warning");
      }
      localStorage.setItem('token', token);
      showNotification("Login Successfully", "success");
      dispatch(userLoginSuccess({
         user,
         token,
      }));

   } catch (error) {
      // console.log("Error while login user:", error);
      console.log("Error while login user:", error.response?.data?.message);
      dispatch(userLoginError({ error: error.response.data.message }));
      showNotification("Error while login user", "warning");
      dispatch(clearError());
   }
};

// register
export const register = (userData) => async (dispatch) => {
   try {
      dispatch(userSignupRequest());

      //FETCH USER
      const config = {
         headers: { "Content-Type": "application/json" },
         // withCredentials: true,
      };

      const { data } = await axios.post(BASE_URL + `/auth/register`, userData, config);

      const {
         user,
         token,
      } = data

      if (!token) {
         dispatch(userSignupError({ error: "Internal Server Error!" }));
         showNotification("Internal Server Error!", "warning");
         dispatch(clearError());
      }

      localStorage.setItem('token', token);

      showNotification("signup Successfully", "success");
      dispatch(userSignupSuccess({ user, token }));
   } catch (error) {
      console.log("Error while Register user:", error.response?.data?.message);
      dispatch(userSignupError({ error: error.response.data.message }));
      showNotification("Error while Register user!", "warning");
      dispatch(clearError());
   }
};

//get user info
export const fetchUserInfo = () => async (dispatch) => {
   try {
      dispatch(getUserInfoRequested());
      const config = {
         headers: { "Content-Type": "application/json" },
      };

      const token = getUserToken()
      if (!token) {
         dispatch(getUserInfoRequestFailed({ error: 'User not authenticated' }));
         dispatch(clearError());
         showNotification("User not authenticated!", "warning");
         return;
      }

      const { data } = await axios.get(BASE_URL + `/auth/me`, {
         headers: {
            token: token,
         },
      }, config);

      const { status, user, } = data;

      dispatch(getUserInfoReceived({ status, user }));
   } catch (error) {
      // console.log("Error while fetchUserInfo:", error);
      console.log("Error while fetchUserInfo:", error.response?.data?.message);
      dispatch(getUserInfoRequestFailed({ error: error.response.data.message }));
      dispatch(clearError());
      showNotification("Error while fetch User Info:", "warning");
   }
};

//logout User
export const logoutUser = () => async (dispatch) => {
   try {

      dispatch(userLogoutRequest());
      localStorage.removeItem('token');
      dispatch(userLogoutSuccess());
   } catch (error) {
      console.log("Error while user logout: " + error.response?.data?.message);
      // console.log("Error while user logout user:", error);
      console.log("Error while user logout user:", error.response?.data?.message);
      showNotification("Error while User Logout!", "warning");
      dispatch(clearError());
   }
};

// forgot password
export const userForgotPassword = (email) => async (dispatch) => {
   try {
      dispatch(passwordResetRequested());

      const config = {
         headers: { "Content-Type": "application/json" },
         // withCredentials: true,
      };

      const { data } = await axios.post(BASE_URL + `/auth/password/forgot`, { email }, config);
      const { message, resetUrl } = data;

      dispatch(passwordResetSuccess({ message, resetUrl }));

   } catch (error) {
      console.log('Error while Forgot password:', error);
      console.log('Error message:', error.response?.data?.message);
      dispatch(passwordResetFailed({ error: error.response.data.message || error }));
      showNotification("Error while Forgot Password!", "warning");
      dispatch(clearError());
   }
};


