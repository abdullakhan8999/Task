const mongoose = require("mongoose");

const connectDB = () => {
   mongoose
      .connect(process.env.MONGODB_URI || process.env.DB_URI, {
         autoIndex: true,
      })
      .then((data) => {
         console.log(
            `The MongoDB server is now connected, and the host information is: ${data.connection.host}.`
         );
      })
      .catch((err) => {
         console.log("Error connecting to MongoDB:", err.message);
      });
};

module.exports = connectDB;