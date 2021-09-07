var express = require('express');
var router = express.Router();
var display_table = require('../modles/tabledisplay');
var authen = require('../modles/authenticate');
const Test_User = { Username: "guess", Password: "guesspass" };

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { message: "Please Input" });
});
router.post('/', async function(req, res) {
    var auth = await authen(req.body.username, req.body.password)
    console.log("check" + auth)
        //if (req.body.Username == Test_User.Username && req.body.Password == Test_User.Password)
    if (auth == true) {
        /*
        table_String = await display_table();
        //res.render('user', { title: "Please Input", message: `hello ${req.body.username}!` });
        res.render('user', { title: "Please Input", message: table_String });
        */
        var pg_conn = require('../modles/pg_config');
        var product_query = 'SELECT * FROM product';
        var data = await pg_conn.query(product_query);
        res.render('users_fe', {
            title: "Welcome to ATN shop Page",
            h1_title: "Welcome to ATN shop Page",
            h2_title: "data table",
            userData: data
        });

    } else {
        res.render('login', { message: "wrong  users Name or password. Please input again" });
    };
});
module.exports = router;