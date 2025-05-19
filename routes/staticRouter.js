const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allUrls = await URL.find({})
      .sort({ createdAt: 1 }) // oldest first
      .limit(8);             // only first 8 entries

    const id = req.query.shortId || null;
    res.render("home.ejs", { id, urls: allUrls });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.render("home.ejs", { id: null, urls: [] });
  }
});



module.exports = router;