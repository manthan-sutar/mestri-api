const express = require("express");
const FileHelper = require("../helpers/FileHelper");
const fileHelper = new FileHelper()
const jobsHelper = require('../helpers/JobHelper')
const socketClient = require('socket.io-client');
const { Sequelize } = require('sequelize');

var initModels = require("../models/init-models");
const constants = require("../helpers/constants");
var models = initModels();

const Op = Sequelize.Op;
const START = new Date();
START.setHours(0, 0, 0, 0);
const NOW = new Date();

const router = express.Router();

router.post("/", async (req, res) => {
    const userId = req.body.userId
    const serviceId = req.body.serviceId
    const isAttachmentExist = req.body.attachments.length > 0 ? true : false;

    const job = {
        userId: userId,
        serviceId: serviceId
    }

    var newJobId

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
        const newCreatedJob = await models.Jobs.findOne(
            {
                where: {
                    id: newJobId
                }
            }
        )
        await newCreatedJob.destroy()

    }
});

router.get("/:userId", async (req, res) => {
    const userId = req.params.userId
    try {
        const jobs = await jobsHelper.getJobs({
            userId: userId
        })
        res.json(jobs);
    } catch (error) {
        res.json(error.toString())
    }
})

router.get("/today/:userId", async (req, res) => {
    const userId = req.params.userId

    res.json(START.toISOString())
    
    try {
        const jobs = await jobsHelper.getJobs({
            userId: userId,
            createdAt: {
                [Op.between]: [START.toISOString(), NOW.toISOString()]
            },
        })
        res.json(jobs);
    } catch (error) {
        res.json(error.toString())
    }
})

router.post("/update-status", async (req, res) => {
    const jobId = req.body.jobId;
    const status = req.body.status;
    try {
        switch (status) {
            case "ASSIGNED": await jobsHelper.updateJobStatus.assigned(jobId)
                break;
            case "PENDING": await jobsHelper.updateJobStatus.pending(jobId)
                break;
            case "CANCELED": await jobsHelper.updateJobStatus.canceled(jobId)
                break;
            case "COMPLETED": await jobsHelper.updateJobStatus.complete(jobId)
                break;
            case "INPROGRESS": await jobsHelper.updateJobStatus.inProgress(jobId)
                break;
            case "FAILED": await jobsHelper.updateJobStatus.failed(jobId)
                break;
        }
        const socket = socketClient(constants.socket_url)
        const response = {
            jobId: jobId,
            status: status
        }
        socket.emit("jobs", response);
        res.send("Success")
    } catch (error) {
        res.send(error.toString())
    }
});

router.get("/available/:workerId", async (req, res) => {
    const workerId = req.params.workerId
    const servicesProvided = await models.WorkerServices.findAll({
        where: {
            workerId: workerId
        },
        attributes: ['serviceId'],
        group: ['serviceId']
    })
    var serviceTypeIds = [];
    servicesProvided.forEach((e) => {
        serviceTypeIds.push(e.serviceId);
    })
    try {
        const jobs = await jobsHelper.getJobs({
            serviceId: {
                [Sequelize.Op.in]: serviceTypeIds
            },
            statusId: 1
        })
        res.json(jobs);
    } catch (error) {
        res.json(error.toString())
    }
})






module.exports = router;

