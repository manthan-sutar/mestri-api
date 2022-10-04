const express = require("express");
const socketClient = require('socket.io-client')
var initModels = require("../models/init-models");
var models = initModels();

const router = express.Router();

router.post("/enter", async (req, res) => {
    const userId = req.body.userId;
    try {
        const socket = socketClient("http://192.168.1.7:3000")
        socket.emit("enter", userId);
        res.send("Success")
    } catch (error) {
        res.send(error)
    }

})

// router.post("/get", async (req, res) => {
//     const userId = req.body.userId;
//     try {
//         const socket = socketClient("http://192.168.1.7:3000")
//         socket.emit("getUserId", userId);
//     } catch (error) {
//         res.send(error)
//     }

// })

module.exports = router;
