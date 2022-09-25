const express = require("express");
const FileHelper = require("../helpers/FileHelper");
const fileHelper = new FileHelper()

const { Sequelize } = require('sequelize');

var initModels = require("../models/init-models");
var models = initModels();

const router = express.Router();


router.post("/", async (req, res) => {
    const userId = req.body.userId
    const serviceTypeId = req.body.userId
    const isAttachmentExist = req.body.attachments.length > 0 ? true : false;

    const job = {
        userId: userId,
        serviceTypeId: serviceTypeId
    }

    var newJobId;

    try {
        //Create New Job
        const newJob = await models.Jobs.create(job)

        //Add details
        const details = req.body.details;
        details.jobId = newJob.id;
        newJobId = newJob.id

        //Check Attachments

        var uploadedFiles = []

        if (isAttachmentExist) {
            const attachments = req.body.attachments;
            attachments.forEach(async element => {
                const filePath = await fileHelper.uploadBase64Img({
                    base64String: element
                })
                uploadedFiles.push(filePath);
            });
        }

        await models.JobDetails.create(details)

        //Save Uploaded Files Path
        uploadedFiles.forEach(async element => {
            await models.JobAttachments.create({
                jobId: newJobId,
                file: element
            })
        });

        res.send("Success");

    } catch (error) {
        const newCreatedJob = await models.Jobs.find(
            {
                where: {
                    id: newJobId
                }
            }
        )
        await newCreatedJob.destroy()
        res.send(error.toString())
    }

});

router.get("/:userId", async (req, res) => {
    const userId = req.params.userId
    try {
        const jobs = await models.Jobs.findAll(
            {
                where: {
                    userId: userId
                },
                include: [
                    {
                        model: models.JobDetails
                    },
                    {
                        model: models.JobAttachments
                    },
                    {
                        model: models.JobQuotes
                    }
                ],
            }
        )
        res.json(jobs);
    } catch (error) {
        res.json(error.toString())
    }
})

module.exports = router;

