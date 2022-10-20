const express = require("express");
const { Sequelize } = require("../config/database");

var initModels = require("../models/init-models");
var models = initModels();

const router = express.Router();

router.get("/", async (req, res) => {
    const query = req.query;
    if (Object.keys(query).length == 0) {
        try {
            const users = await models.Services.findAll();
            res.json(users)
        } catch (error) {
            res.json(error.toString())
        }
    } else {
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
        attributes: [
            [Sequelize.fn("AVG", Sequelize.col("worker.ratings.rating")), "workerRatings",],
            "description"
        ],
        include: [
            {
                model: models.Workers,
                include: [
                    {
                        model: models.Ratings,
                        attributes: []
                    },
                ]
            },
            {
                model: models.Services,
            }
        ],
        order: Sequelize.literal('workerRatings DESC')
    })

    res.json(serviceOptions)
});


module.exports = router;
