const express = require("express");
const { Sequelize } = require("../config/database");
var initModels = require("../models/init-models");
var models = initModels();
const router = express.Router();


router.get("/:workerId", async (req, res) => {
    const workerId = req.params.workerId;
    
    try {

        // const jobQuotes = await models.JobQuotes.findAll({
        //     where: {
        //         quoterId: workerId
        //     }
        // });

        const worker = await models.Workers.findOne({
            where: {
                id: workerId
            },
            include: [
                {
                    model: models.Ratings,
                    attributes: []
                },
            ],
            attributes: {
                include: [ // this adds AVG attribute to others instead of rewriting
                    [Sequelize.fn('AVG', Sequelize.col('ratings.rating')), 'avgRating'],
                ],
            },
        })

        const data = JSON.parse(JSON.stringify(worker))
        data.totalJobsDone = 64
        // jobQuotes.map((e) => e.id)

        res.json(data)
    } catch (error) {
        res.send(error.toString())
    }
})


module.exports = router;
