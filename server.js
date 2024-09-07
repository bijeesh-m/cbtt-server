const express = require("express");
require("dotenv").config();
const userRoute = require("./routes/user");
const tenderRoute = require("./routes/tender");
const dbConnect = require("./config/db");
const cookieParser = require("cookie-parser");

const Tender = require("./models/tender");
const User = require("./models/user");

const app = express();

app.use(express.json());
app.use(cookieParser());

dbConnect();

app.get("/", async (req, res) => {
    //    const tenders =  await Tender.find();
    //    res.send(tenders)
    const users = await User.find();
    res.send(users);
});

app.use("/user", userRoute);
app.use("/tender", tenderRoute);

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
