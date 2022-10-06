const express = require("express");

var initModels = require("../models/init-models");
var models = initModels();

const router = express.Router();

router.get("/:serviceCategoryId", async (req, res) => {
    try {
        const users = await models.Services.findAll({
            where: {
                serviceCategoryId: req.params.serviceCategoryId
            }
        });
        res.json(users)
    } catch (error) {
        res.json(error.toString())
    }
});


module.exports = router;
