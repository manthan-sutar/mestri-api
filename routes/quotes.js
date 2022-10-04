const express = require("express");
const FileHelper = require("../helpers/FileHelper");
const Joi = require('joi');
const jobStatusHelper = require('../helpers/JobHelper')

var initModels = require("../models/init-models");
var models = initModels();

const router = express.Router();

router.get("/:jobId", async (req, res) => {

    const jobId = req.params.jobId
    try {
        const jobs = await models.JobQuotes.findAll({
            where: {
                jobId: jobId
            },
            include: [
                {
                    model: models.Users,
                    include: [
                        {
                            model: models.Roles,
                            attributes: ["type"]
                        }
                    ]
                }
            ]
        })
        res.json(jobs);
    } catch (error) {
        res.json(error.toString())
    }
})

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

router.post("/accept", async (req, res) => {
    const jobId = req.body.jobId
    try {
        await models.JobAssigned.create(
            req.body
        )
        await jobStatusHelper.updateJobStatus.assigned(jobId)
        const job = await models.Jobs.findOne({
            where: {
                id: jobId
            },
            include: [
                {
                    model: models.JobStatus,
                    attributes: ["name"],
                },
            ]
        })
        const response = {
            "message": "Accepted Successfully",
            "data": job
        }
        res.json(response)
    } catch (error) {
        res.json(error.toString()).status(400)
    }
})





module.exports = router;

