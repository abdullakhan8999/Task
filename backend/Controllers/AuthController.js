const User = require("../Models/UserModel");
const errorHandler = require("../Utils/errorHandler");
const sendEmail = require("../Utils/sendEmail");
const sendToken = require("../Utils/sendTokem");
const cloudinary = require("cloudinary");
const crypto = require("crypto");

//register User
exports.registerUser = async (req, res, next) => {
   let myCloud = {};
   const { name, email, password } = req.body;
   let user = await User.findOne({ email: email });
   if (user) return next(errorHandler(res, 400, "User already exits!"));

   if (req.body.avatar != "/Profile.png") {
      myCloud
         = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
         });
   } else {
      myCloud.public_id = "Profile_se7ybf"
      myCloud.secure_url = "https://res.cloudinary.com/dwpi8ryr2/image/upload/v1699122477/avatars/Profile_se7ybf.png"
   }


   user = await User.create({
      name,
      email,
      password,
      avatar: {
         public_id: myCloud.public_id,
         url: myCloud.secure_url,
      },
   });
   sendToken(user, 200, res)
};

//Get user detailed
exports.getUserDetails = async (req, res, next) => {
   //when user login user id is fetched to req so using auth
   const UserId = req.user.id;
   const user = await User.findById(UserId);
   if (!user) return next(errorHandler(res, 400, "User doesn't exits!"));

   res.status(200).json({
      status: "success",
      user,
   });
}

//Login user
exports.loginUser = async (req, res, next) => {
   const { email, password } = req.body;

   //Find user 
   const user = await User.findOne({ email });
   if (!user) {
      return errorHandler(res, 404, `Invalid email or password.`)
   }

   //Check and compare password
   const isPasswordMatch = await user.comparePassword(password);
   if (!isPasswordMatch) {
      return errorHandler(res, 401, `Invalid email or password.`)
   }

   //If User there then send status and token
   sendToken(user, 200, res);
};

exports.forgotPassword = async (req, res, next) => {
   const { email } = req.body;
   const user = await User.findOne({ email });
   if (!user) {
      return errorHandler(res, 404, `User doesn't exits!`)
   }

   const resetToken = await user.getResetPasswordToken();
   await user.save({ validateBeforeSave: false });
   //Reset password url
   const resetUrl = `${req.protocol}://${req.get("host")}/auth/password/reset/${resetToken}`;

   //Message to send user for reset password
   const message = `<!DOCTYPE html>
<html>

<head>
   <meta charset="utf-8" />
   <title>Password Reset Request</title>

</head>

<body class="body">
   <div class="container">
      <h2>Hi ${user.name},</h2>
      <p>
         We received a request to reset the password for your account. If you did not make this request, please ignore
         this message.
      </p>
      <p>
         To reset your password, click the Link:
         <a href=${resetUrl}>Reset Password</a>
      </p>
      <p>
         This link is valid for the next 30 minutes. If you do not reset your
         password within this time, you will need to submit another reset
         password request.
      </p>
      <p>Thanks.</p>
   </div>
</body>

</html>`;

   try {
      await sendEmail({
         email: user.email,
         subject: "User auth Password Recovery",
         message,
      });
      res.status(200).json({
         status: "success",
         message: `Email sent successfully to: ${user.email}`,
         resetUrl,
      });
   } catch (error) {
      //if there is error make undefined and save user
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return next(errorHandler(res, 500, error.message));
   }
}

exports.resetPassword = async (req, res, next) => {
   // Extract the reset token from the URL parameters
   const resetToken = req.params.token;

   // Render an HTML form for the user to reset their password
   res.render("reset-password-form", { resetToken });
};

exports.resetPasswordUpdate = async (req, res, next) => {
   const { password } = req.body;
   const resetToken = req.params.token;

   // Find the user by the reset token and check if it is not expired
   const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

   const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
   });

   if (!user) {
      return next(errorHandler(res, 400, "Invalid or expired token."));
   }

   // Update user password and remove reset password token and expiration
   user.password = password;
   user.resetPasswordToken = undefined;
   user.resetPasswordExpire = undefined;

   // Save the user to the database
   await user.save();

   // Redirect the user to the home page or a success page
   res.redirect("http://127.0.0.1:5173/"); // Change this to the appropriate URL
}
