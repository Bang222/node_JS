var express = require('express');
var router = express.Router();
var pw = '123456';
var un = 'guess'

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { message: "Please Input" });
});
router.post('/', function(req, res) {
    if ((un == req.body.Username) & (pw = req.body.Password))
        var;

});

module.exports = router;