require('dotenv').config();  // Load environment variables
const express = require("express");
const app = express();
const PORT = 8000;
const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter");
const {connectToMongoDB} = require("./connect")
const URL = require("./models/url");
const path = require("path");
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));



app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use("/url",urlRoute);
app.use("/",staticRoute);


app.get("/url/:shortId",async (req,res) => {
    let shortId = req.params.shortId;
    let entry = await URL.findOneAndUpdate({
        shortId,
    },{
        $push : {
            visitHistory : {
                timestamps : Date.now()
            }
        }
    })
    res.redirect(entry.redirectUrl);
})


connectToMongoDB(process.env.MONGODB_URI)
.then(() => console.log("Connected to mongodb"))
.catch(() => console.log("Error in connection"));

app.listen(PORT, () => {
    console.log("Server listening on port 8000");
})