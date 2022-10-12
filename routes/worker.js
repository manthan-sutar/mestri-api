const express = require("express");
var initModels = require("../models/init-models");
var models = initModels();
const router = express.Router();

router.post("/:workerId", async (req, res) => {
    
})


module.exports = router;
