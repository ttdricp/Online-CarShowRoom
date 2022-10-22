const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.render(process.cwd()+"/views/accessories.ejs"))
    .post((req, res) => res.send("POST ACCESSORIES"));
module.exports = router;