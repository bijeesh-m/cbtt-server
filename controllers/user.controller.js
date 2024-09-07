const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

///////////////////////////// REGISTER ////////////////////////////////

module.exports.register = async (req, res) => {
    try {
        const isExist = await User.findOne({ email: req.body.email });

        if (isExist) {
            return res.status(409).json({ message: "User already exists", status: "failed" });
        }
        const user = await User.create(req.body);

        res.status(201).json({ message: "Registration success", user: user });
    } catch (error) {
        res.status(500).json({ message: error.message, status: "failed" });
    }
};

///////////////////////////// LOGIN ////////////////////////////////

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "user not found", status: "failed" });
        }

        if (!user.isActive) {
            return res.status(403).json({ message: "user account is blocked", status: "failed" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "invalid credentials", status: "failed" });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1hr" });
        res.cookie("accessToken", token, { httpOnly: true, maxAge: 3600000 });

        res.status(200).json({ message: "login success", token });
    } catch (error) {
        res.status(500).json({ message: error.message, status: "failed" });
    }
};

///////////////////////////// LOGOUT ////////////////////////////////

module.exports.logout = async (req, res) => {
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Successfully logged out" });
};

////////////////////// PROTECTED ROUTE //////////////////////////////

module.exports.users = async (req, res) => {
    try {

        const users = await User.find();
        res.json({ message: "this is a protected route", users });
    } catch (error) {
        console.log(error);
    }
};

///////////////////////////// UPDATE USER STATUS ///////////////////////////////

module.exports.user = async (req, res) => {
    const { id } = req.params;
    const { isActive } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { isActive: isActive }, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "User status updated successfully.", user });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating user status.", error: error.message });
    }
};
