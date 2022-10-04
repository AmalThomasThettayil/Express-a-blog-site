const expressAsyncHandler = require("express-async-handler");

//create
const createCategoryCtrl = expressAsyncHandler(async (req, res) => {
    res.json("create category")
});
module.exports = { createCategoryCtrl }