const express = require("express");

var initModels = require("../models/init-models");
var models = initModels();

const router = express.Router();

router.get("/popular_mestries", async (req, res) => {
    const users = await models.Users.findAll();
    res.json(users);
});


module.exports = router;
