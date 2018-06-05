var express = require('express');
var router = express.Router();

router.get("/", (req, res, next) => {
    res.render("../views/index.html");
})

module.exports = router;