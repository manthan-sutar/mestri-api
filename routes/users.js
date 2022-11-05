const express = require("express");
const socketClient = require('socket.io-client');
const constants = require("../helpers/constants");
const UserHelper = require("../helpers/UserHelper");
const userHelper = new UserHelper()
var initModels = require("../models/init-models");
var models = initModels();
const router = express.Router();

const multer = require("multer");

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './storage')
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, file.fieldname + '-' + Date.now() + '.' + extension)
    }
})

const upload = multer({ storage: storage })

router.post("/enter", async (req, res) => {
    const userId = req.body.userId;
    try {
        const socket = socketClient(constants.socket_url)
        socket.emit("enter", userId);
        res.send("Success")
    } catch (error) {
        res.send(error)
    }
})


router.put("/:userId", async (req, res) => {
    const userId = req.params.userId;
    const payload = req.body;
    res.json(await userHelper.updateUser(userId, payload))
})

router.post("/update-profile-picture", upload.array('files'), async (req, res) => {
    // const payload = req.body;
    // const userId = payload.userId;
    res.json("success")
    // res.json(await userHelper.updateUser(userId, payload))
})

module.exports = router;
