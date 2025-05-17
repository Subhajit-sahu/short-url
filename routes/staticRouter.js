const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/", async (req, res) => {
  const allUrls = await URL.find({});
  const id = req.query.shortId || null;
  res.render("home.ejs", { id, urls: allUrls });
});


module.exports = router;