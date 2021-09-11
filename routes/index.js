var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { message: 'DPCB Shop', title: 'Page user' });
});

module.exports = router;