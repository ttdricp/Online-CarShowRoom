const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.render(process.cwd()+"/views/index.ejs"))
    .post((req, res) => res.send("POST HEADPHONES"));
module.exports = router;