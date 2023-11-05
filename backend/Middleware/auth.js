const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

exports.isAuthenticatedUser = async (req, res, next) => {
   const token = req.header('token');
   if (!token) {
      return res.status(401)
         .json({
            error: "Please Login to access this resource"
         });
   }

   const decodedData = jwt.verify(token, process.env.JWT_SECRET);
   req.user = await User.findById(decodedData.id);
   next();
};

exports.authorizedRoles = (...roles) => {
   return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
         return res.status(401)
            .json({
               error: "Not authorized to access this route"
            });
      }
      next();
   };
};