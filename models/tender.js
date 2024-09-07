const mongoose = require("mongoose");

const tenderSchema = new mongoose.Schema(
    {
        organisationChain: {
            type: String,
            required: true,
        },
        tenderReferenceNumber: {
            type: String,
            required: true,
            unique: true,
        },
        tenderID: {
            type: String,
            required: true,
            unique: true,
        },
        tenderType: {
            type: String,
            enum: ["Open", "Limited", "EOI"],
            required: true,
        },
        tenderCategory: {
            type: String,
            enum: ["Works", "Goods", "Services", "Consultancy"],
            required: true,
        },
        tenderLocation: {
            type: String,
            required: true,
        },
        generalTechnicalEvaluationAllowed: {
            type: Boolean,
            default: false,
        },
        paymentMode: {
            type: String,
            enum: ["Online", "Offline"],
            required: true,
        },
        isMultiCurrencyAllowedForFee: {
            type: Boolean,
            default: false,
        },
        withdrawalAllowed: {
            type: Boolean,
            default: false,
        },
        formOfContract: {
            type: String,
            enum: ["Item Rate", "Lump Sum", "Percentage"], 
            required: true,
        },
        numberOfCovers: {
            type: Number,
            min: 1,
            required: true,
        },
        itemWiseTechnicalEvaluationAllowed: {
            type: Boolean,
            default: false,
        },
        isMultiCurrencyAllowedForBOQ: {
            type: Boolean,
            default: false,
        },
        allowTwoStageBidding: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const tenderModel = mongoose.model("tender", tenderSchema);
module.exports = tenderModel;
