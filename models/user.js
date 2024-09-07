const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["Citizen", "Contractor", "Government Authority", "Admin"],
            default: "Citizen",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        phoneNumber: {
            type: String,
            match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
        },
        address: {
            type: String,
            trim: true,
        },
        companyName: {
            type: String,
            required: function () {
                return this.role === "Contractor";
            },
        },
        registrationNumber: {
            type: String,
            required: function () {
                return this.role === "Contractor";
            },
        },
        certifications: {
            type: [String],
            default: [],
        },
        department: {
            type: String,
            required: function () {
                return this.role === "Government Authority";
            },
        },
        position: {
            type: String,
            required: function () {
                return this.role === "Government Authority";
            },
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
