import { createSlice } from '@reduxjs/toolkit';
const initialState = {
   user: null,
   error: null,
   userLoading: false,
   token: "",
   message: "", resetUrl: "",
};
const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      userLoginRequest: (state) => {
         state.userLoading = true;
         state.error = null;
         state.user = null;
         state.token = "";
      },
      userLoginSuccess: (state, action) => {
         state.error = null;
         state.user = action.payload.user;
         state.userLoading = false;
         state.token = action.payload.token;
      },
      userLoginError: (state, action) => {
         state.error = action.payload.error;
         state.userLoading = false;
         state.user = null;
         state.token = "";
      },
      userSignupRequest: (state) => {
         state.userLoading = true;
         state.error = null;
         state.user = null;
         state.token = "";
      },
      userSignupSuccess: (state, action) => {
         state.error = null;
         state.user = action.payload.user;
         state.userLoading = false;
         state.token = action.payload.token;
      },
      userSignupError: (state, action) => {
         state.error = action.payload.error;
         state.userLoading = false;
         state.user = null;
         state.token = "";
      },
      userLogoutRequest: (state) => {
         state.userLoading = true;
         state.error = null;
         state.user = null;
         state.token = "";
      },
      userLogoutSuccess: (state) => {
         state.error = null;
         state.userLoading = false;
         state.user = null;
         state.token = "";
      },
      getUserInfoRequested: (state) => {
         state.userLoading = true;
         state.error = null;
         state.user = null;
         state.token = "";
      },
      getUserInfoReceived: (state, action) => {
         state.error = null;
         state.user = action.payload.user;
         state.userLoading = false;
         state.token = "";
      },
      getUserInfoRequestFailed: (state, action) => {
         state.error = action.payload.error;
         state.userLoading = false;
         state.user = null;
         state.token = "";
      },
      passwordResetRequested: (state) => {
         state.userLoading = true;
         state.error = null;
         state.user = null;
         state.resetUrl = "";
         state.message = "";
      },
      passwordResetSuccess: (state, action) => {
         state.error = null;
         state.userLoading = false;
         state.user = null;
         state.resetUrl = action.payload.resetUrl;
         state.message = action.payload.message;
      },
      passwordResetFailed: (state) => {
         state.error = null;
         state.userLoading = false;
         state.user = null;
         state.resetUrl = "";
         state.message = "";
      },
      clearError:(state)=>{
         state.error = null;
      }
   }
});

export const {
   userLoginRequest,
   userLoginSuccess,
   userLoginError,
   userLogoutRequest,
   userLogoutSuccess,
   userSignupRequest,
   userSignupSuccess,
   userSignupError,
   getUserInfoRequested,
   getUserInfoReceived,
   getUserInfoRequestFailed,
   passwordResetRequested,
   passwordResetSuccess,
   passwordResetFailed,
   clearError
} = userSlice.actions;

export default userSlice.reducer;
