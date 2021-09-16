var express = require('express');
var router = express.Router();
var display_table = require('../modles/tabledisplay');
var authen = require('../modles/authenticate');
const Test_User = { username: "guess", password: "guesspass" };

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { message: "Please Input" });
});
router.post('/', async function(req, res) {
    var auth = await authen(req.body.username, req.body.password);
    console.log("check" + auth);
    //if (req.body.Username == Test_User.Username && req.body.Password == Test_User.Password)
    if (auth == true) {
        var pg_conn = require('../modles/pg_config');
        var product_query = 'SELECT * FROM product';
        var data = await pg_conn.query(product_query);
        console.log(data);
        res.render('users_fe', {
            title: "Userpage",
            h1_title: "Welcome to ATN shop page",
            h2_title: "Fetch data table by EJS",
            userData: data
        });
    } else {
        res.render('login', { message: "wrong  users Name or password or shop name . Please input again" });
    };
});
module.exports = router;