const shortid = require('shortid');
const URL = require("../models/url");

let handleGenerateShortURL = async(req,res) => {
    const shortID = shortid();
    const body = req.body;
    if(!body.url) return res.status(400).json({ err : 'url is required'});
    await URL.create({
        shortId : shortID,
        redirectUrl : body.url,
        visitHistory : [],
    })
    let allUrls = await URL.find({});
    res.redirect('/?shortId=' + shortID);
    // res.render("home.ejs",{ id : shortID,urls : allUrls});
    // return res.json({ id : shortID});
}

let handleGetAlalytics = async(req,res) => {
    const shortId = req.params.shortId;
    const result =  await URL.findOne({shortId});
    return res.json({totalClicks : result.visitHistory.length, analytics : result.visitHistory});
}

module.exports = {
    handleGenerateShortURL,
    handleGetAlalytics,
}

