const app = require('./app');
const connectDB = require("./Config/ConfigDB.js");
const cloudinary = require("cloudinary");

connectDB()

// Config
if (process.env.NODE_ENV !== "production") {
   require("dotenv").config({ path: "Config/.env" })
}

// Cloudinary
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, async () => {
   // log the port
   console.log(`Server is up and running! Access it at http://localhost:${process.env.PORT}`);
});