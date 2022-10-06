const express = require("express");

var initModels = require("../models/init-models");
var models = initModels();

const router = express.Router();

router.get("/", async (req, res) => {
    const query = req.query;
    if(Object.keys(query).length == 0){
        try {
            const users = await models.Services.findAll();
            res.json(users)
        } catch (error) {
            res.json(error.toString())
        }
    }else{
        try {
            const users = await models.Services.findAll({
                where: query
            });
            res.json(users)
        } catch (error) {
            res.json(error.toString())
        }
    }
});


module.exports = router;
