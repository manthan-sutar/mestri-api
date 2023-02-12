const express = require("express");
const { Sequelize } = require("../config/database");
const sequelize = require("../config/database");
const { success, failed } = require("../helpers/constants");
const FileHelper = require("../helpers/FileHelper");
const fileHelper = new FileHelper()

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


router.get("/booked/:userId", async (req, res) => {
    try {
        const bookings = await models.Bookings.findAll({
            where: {
                userId: req.params.userId
            },
            include: [
                {
                    model: models.BookingAttachments,
                },
                {
                    model: models.BookingDetails,
                },
                {
                    model: models.WorkerServices,
                }
            ],
        })
        res.json(success("Success", bookings))
    } catch (error) {
        res.send(failed(error.toString()))
    }
});



router.post("/book", async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const isAttachmentExist = req.body.attachments.length > 0 ? true : false;
        var bookingData = req.body
        const attachments = bookingData.attachments
        var bookingDetails = req.body.details
        //remove extra parameters
        delete bookingData.attachments
        delete bookingData.details

        const newBooking = await models.Bookings.create(bookingData, {
            transaction: transaction
        })

        const newBookingId = newBooking.id
        bookingDetails.bookingId = newBookingId;
        // res.json(bookingDetails)
        await models.BookingDetails.create(bookingDetails, {
            transaction: transaction
        })


        if (isAttachmentExist) {
            attachments.forEach(async element => {
                const filePath = await fileHelper.uploadBase64Img({
                    base64String: element,
                    path: "bookings"
                })
                await models.BookingAttachments.create({
                    bookingId: newBookingId,
                    file: filePath
                })
            });
        }

        await transaction.commit();

        res.json(success("Service Successfully Booked", newBooking))

    } catch (error) {
        await transaction.rollback();
        res.send(failed(error.toString()))
    }
});



module.exports = router;
