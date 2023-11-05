const { Router } = require("express");
const { registerUser, getUserDetails, loginUser, forgotPassword, resetPassword, resetPasswordUpdate, googleRegisterUser } = require("../Controllers/AuthController.js");
const { isAuthenticatedUser } = require("../Middleware/auth.js");
const router = Router();

//register user Router
router.post("/register", registerUser);

//register user Router
router.post("/google/register", googleRegisterUser);

//Get User details Router
router.get("/me", isAuthenticatedUser, getUserDetails);

//Login User Router
router.post("/login", loginUser);

//Forget Password Router
router.post("/password/forgot", forgotPassword);

//Reset Password Router
router.get("/password/reset/:token", resetPassword);

// POST route for updating the password
router.post("/password/reset/:token", resetPasswordUpdate);

module.exports = router;