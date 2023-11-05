const { Router } = require("express");
const passport = require("passport");
const { registerUser, getUserDetails, loginUser, forgotPassword, resetPassword, resetPasswordUpdate } = require("../Controllers/AuthController.js");
const { isAuthenticatedUser } = require("../Middleware/auth.js");
const router = Router();

router.get("/login/success", (req, res) => {
   if (req.user) {
      res.status(200).json({
         error: false,
         message: "Successfully Loged In",
         user: req.user,
      });
   } else {
      res.status(403).json({ error: true, message: "Not Authorized" });
   }
});

router.get("/login/failed", (req, res) => {
   res.status(401).json({
      error: true,
      message: "Log in failure",
   });
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
   passport.authenticate(
      "google",
      {
         // successRedirect: process.env.CLIENT_API,
         successRedirect: "http://127.0.0.1:5173",
         failureRedirect: "/login/failed"
      },
   )
);

router.get("/logout", (req, res) => {
   req.logout();
   res.redirect(process.env.CLIENT_API);
});

//register user Router
router.post("/register", registerUser);

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