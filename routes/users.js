const express = require("express");
const Role = require("../models/Role");
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await User.findAll(
            {
                include: [
                    {
                        model: Role
                    }
                ]
            }
        );
        res.json(users)
    } catch (error) {
        res.json(error)
    }
});
module.exports = router;
