const Tender = require("../models/tender");

////////////////// GET ALL TENDERS /////////////////////////////

module.exports.tenders = async (req, res) => {
    try {

        
        // const tenders = await Tender.find();
        res.status(200).json({ message: "success", tenders });
    } catch (error) {
        res.status(500).json({ message: error.message, status: "failed" });
    }
};

//////////////////////// TENDER BY ID ///////////////////////////

module.exports.tenderById = async (req, res) => {
    try {
        const tender = await Tender.findById(req.params.id);
        res.status(200).json({ message: "success", tender });
    } catch (error) {
        res.status(500).json({ message: error.message, status: "failed" });
    }
};

//////////////////////// TENDER BY FILTER //////////////////////////

module.exports.tenderByFilter = async (req, res) => {
    console.log("from tenderByCategory");

    try {
        const { location, category } = req.query;

        let query = {};

        if (location) {
            query.tenderLocation = location;
        }
        if (category) {
            query.tenderCategory = category;
        }

        console.log(category);

        const tender = await Tender.find(query);
        res.status(200).json({ message: "success", tender });
    } catch (error) {
        res.status(500).json({ message: error.message, status: "failed" });
    }
};

////////////////////////////// CREATE A TENDER //////////////////////////////

module.exports.createTender = async (req, res) => {
    try {
        const tender = await Tender.create(req.body);
        res.status(201).json({ message: "tender posted successfully", tender });
    } catch (error) {
        res.status(500).json({ message: "something went wrong", error: error.message });
    }
};
