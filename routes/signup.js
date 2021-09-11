var express = require('express');
var router = express.Router();
var display_table = require('../modles/tabledisplay');
var authen = require('../modles/authen1');



router.post('/', function(req, res) {
    res.render('signup', { message: "Please Input" });
});
router.post('/', async function(req, res) {
    var auth = await authen(req.body.username, req.body.password);
    console.log("check" + auth);
    //if (req.body.Username == Test_User.Username && req.body.Password == Test_User.Password)
    if (auth == true) {
        res.redirect('users');
    } else {
        res.render('login', { message: "wrong  users Name or password or shop name . Please input again" });
    };
});
module.exports = router;