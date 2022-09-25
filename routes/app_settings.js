const express = require("express");

const router = express.Router();

var initModels = require("../models/init-models");
var models = initModels();


router.get("/", async (req, res) => {
    try {
        const settings = await models.Settings.findOne();
        const homescreenSections = await models.HomescreenSections.findAll();
        const settingObject = JSON.parse(JSON.stringify(settings))
        settingObject['homescreen_sections'] = homescreenSections
        res.json(settingObject)
    } catch (error) {
        res.json(error.toString())
    }
});

module.exports = router;
