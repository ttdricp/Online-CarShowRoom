const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.render(process.cwd()+"/views/about.ejs"))
    .post((req, res) => res.send("POST ABOUT"));
module.exports = router;