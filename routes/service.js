const express = require("express");
const { Sequelize } = require("../config/database");

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




router.get("/shortlist/:serviceId", async (req, res) => {
    const serviceId = req.params.serviceId;

    const serviceOptions = await models.WorkerServices.findAll({
        where: {
            serviceId: serviceId
        },
        // attributes: [
        //     [Sequelize.fn("COUNT", Sequelize.col("worker")), "workerCount"]
        // ],
        include: [
            {
                model: models.Workers
            }
        ],
        
    })

    res.json(serviceOptions)
});


module.exports = router;
