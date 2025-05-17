const {handleGenerateShortURL,handleGetAlalytics} = require("../controllers/url")
const express = require("express");
const router = express.Router();
router.post("/",handleGenerateShortURL);
router.get("/analytics/:shortId",handleGetAlalytics);
module.exports = router;