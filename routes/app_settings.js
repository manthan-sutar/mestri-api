const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
        res.json({
            "application_name": "Mestri",
            "homescreen_sections": [
                {
                    "section_key": "showcase_section",
                    "enabled": true,
                    "api": "http:asdasdas",
                    "api_method": "GET"
                },
                {
                    "section_key": "ads",
                    "enabled": false
                },
                {
                    "section_key": "services",
                    "enabled": true,
                    "api": "http:asdasdas",
                    "api_method": "GET"
                },
                {
                    "section_key": "popular_mestries",
                    "enabled": true,
                    "api": "http:asdasdas",
                    "api_method": "GET"
                },
                {
                    "section_key": "popular_services",
                    "enabled": true,
                    "api": "http:asdasdas",
                    "api_method": "GET"
                },
                {
                    "section_key": "recent_activities",
                    "enabled": true,
                    "api": "http:asdasdas",
                    "api_method": "GET"
                }
            ],
        })
});

module.exports = router;
