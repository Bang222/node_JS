var express = require('express');
var router = express.Router();
var pg_conn = require('../modles/pg_config');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('users', { title: "User page", message: "DPCB Shop" });
});
router.get('/edit/:name', function(req, res) {
    var prod_name = req.params.name;
    const edit_query = {
        text: `SELECT * FROM product WHERE nameproduct=$1`,
        values: [prod_name]
    };
    pg_conn.query(edit_query, function(err, data) {
        if (err) throw err;
        res.render('edit_form', { title: "Edit page", edit_data: data.rows[0] });
    });
});
/* POST from the edit_form submision */
router.post('/edit/:name', function(req, res) {
    var prod_name = req.params.name;
    const update_query = {
        text: "UPDATE product SET nameproduct=$1, idproduct=$2, costp=$3 WHERE nameproduct=$4",
        values: [req.body.idproduct, req.body.nameproduct, req.body.costp, prod_name]
    };
    pg_conn.query(update_query, function(err, data) {
        if (err) {
            throw err;
            res.render('error', { message: "Insert got error", error: err })
        } else {
            var product_query = 'SELECT * FROM product';
            pg_conn.query(product_query, function(err, data) {
                res.render('users_fe', {
                    title: "Welcome to ATN shop Page",
                    h1_title: "Welcome to ATN shop Page",
                    h2_title: "Update query database successfully",
                    userData: data
                });
            });
        };
    });
});
router.get('/insert', function(req, res) {
    res.render('insert_form', { title: "please Insert Data base " });
});
router.post('/insert', function(req, res) {
    const insert_query = {
        text: `INSERT INTO product VALUSE ($1,$2,$3)`,
        values: [req.body.nameproduct, req.body.idproduct, req.body.costp]
    };
    pg_conn.query(insert_query, function(err, data) {
        if (err) {
            throw err;
            res.render('error', { message: "Insert got error", error: err })
        } else {
            var product_query = 'SELECT * FROM product';
            pg_conn.query(product_query, function(err, data) {
                res.render('users_fe', {
                    title: "Welcome to ATN shop Page",
                    h1_title: "Welcome to ATN shop Page",
                    h2_title: "Insert query database successfully",
                    userData: data
                });
            });
        };
    });
});
router.get('/delete/:name', function(req, res) {
    var prod_name = req.params.name;
    const del_query = {
        text: `DELETE FROM product WHERE nameproduct =$1`,
        values: [prod_name]
    };
    pg_conn.query(del_query, function(err, data) {
        if (err) {
            throw err;
            res.render('error', { message: "DELETE got error", error: err })
        } else {
            var product_query = 'SELECT * FROM product';
            pg_conn.query(product_query, function(err, data) {
                res.render('users_fe', {
                    title: "Welcome to ATN shop Page",
                    h1_title: "Welcome to ATN shop Page",
                    h2_title: "DELETE query database successfully",
                    userData: data
                });
            });
        };
    });
});
module.exports = router;