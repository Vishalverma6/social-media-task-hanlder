const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const database = require("./config/database");
const {cloudinaryConnect} = require("./config/cloudinary");
const cookieParser = require("cookie-parser");
const fileUpload =require("express-fileupload");
const cors = require("cors");

const adminRoutes = require("./routes/Admin")
const userDataRoutes = require("./routes/Data");

// database connection
database.connect();

// middlewares
app.use(express.json());
app.use(cookieParser());



app.use(
    cors({
        origin:"*",
        // http://localhost:3000
        credentials:true,
    })
)


app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

// cloudinary Coonection
cloudinaryConnect();

// Routes
app.use("/api/v1/auth",adminRoutes);
app.use("/api/v1/userData",userDataRoutes);

// default route 
app.get("/", (req, res) => {
    return res.json({
        success:true,
        
        message: "Your server is up and running...",
    });
});


app.listen(PORT, () => {
    console.log(`App is running At ${PORT}`);
})