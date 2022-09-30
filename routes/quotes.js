const express = require("express");
const FileHelper = require("../helpers/FileHelper");
const fileHelper = new FileHelper()

const { Sequelize } = require('sequelize');

var initModels = require("../models/init-models");
var models = initModels();

const router = express.Router();

router.get("/:userId", async (req, res) => {
    const userId = req.params.userId
    try {
        const jobs = await models.Jobs.findAll(
            {
                where: {
                    userId: userId
                },
                attributes: ["id"],
                include: [
                    {
                        model: models.JobStatus,
                        attributes: ["name"],
                    },
                    {
                        model: models.JobDetails
                    },
                    {
                        model: models.JobAttachments
                    },
                    {
                        model: models.JobQuotes
                    },
                    {
                        model: models.Services,
                        attributes: ["name"],
                        include: [
                            {
                                model: models.ServiceCategories,
                                attributes: ["name"],
                            },
                            {
                                model: models.ServiceTypes,
                                attributes: ["name"],
                            }
                        ]
                    },
                ],
            }
        )
        res.json(jobs);
    } catch (error) {
        res.json(error.toString())
    }
})

module.exports = router;

