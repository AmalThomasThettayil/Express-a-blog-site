const express = require("express");
const { createCategoryCtrl } = require("../../controllers/category/categoryCtrl");
const categoryRoute = express.Router();

categoryRoute.post("/", createCategoryCtrl);

module.exports = categoryRoute;