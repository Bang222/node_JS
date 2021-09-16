var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
    res.render('sign_up', { message: "Please Input" });
});
module.exports = router;