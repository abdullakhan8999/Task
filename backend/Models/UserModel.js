const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

//User schema object
const userSchema = new mongoose.Schema({
   googleId: {
      type: String,
      default: ""
   },
   avatar: {
      public_id: {
         type: String,
         required: true,
      },
      url: {
         type: String,
         required: true,
      },
   },
   name: {
      type: String,
      required: true,
      minLength: [4, "Name should be more than 4 characters"],
      maxLength: [30, "Name should be less than 30 characters"],
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
   },
   role: {
      type: String,
      default: "user",
   },
   OauthUser: {
      type: Boolean,
      default: false
   },
   resetPasswordToken: String,
   resetPasswordExpire: Date,
})

// before saving password hash it
userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) {
      next();
   }
   this.password = await bcrypt.hash(this.password, 10);
});

// get token 
userSchema.methods.getJwtToken = function () {
   return jwt.sign(
      {
         id: this._id,
      },
      process.env.JWT_SECRET,
      {
         expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000,
      }
   );
};

// Compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
};

// token for reset password
userSchema.methods.getResetPasswordToken = function () {
   // Generating Token
   const resetToken = crypto.randomBytes(20).toString("hex");

   // Hashing and adding resetPasswordToken to userSchema
   this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

   this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

   return resetToken;
};

module.exports = mongoose.model("user", userSchema);