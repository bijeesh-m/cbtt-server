const express = require("express");
require("dotenv").config();
const userRoute = require("./routes/user");
const tenderRoute = require("./routes/tender");
const dbConnect = require("./config/db");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser())

// dbConnect();

app.use("/user", userRoute);
app.use("/tender", tenderRoute);

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
