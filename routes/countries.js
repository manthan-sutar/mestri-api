const express = require("express");
var initModels = require("../models/init-models");
var models = initModels();
const router = express.Router();

router.get("/", async (req, res) => {
    const countries = await models.Countries.findAll()
    res.json(countries)
})


module.exports = router;
