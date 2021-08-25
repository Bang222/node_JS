var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('users', { title: "User page", message: "Bang" });
});

module.exports = router;