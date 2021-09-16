var express = require('express');
var router = express.Router();
var pg_conn = require('../modles/pg_config');


/* GET users listing. */
router.get('/', function(req, res) {
    res.render('users', { title: "User page", message: "Authorized users" });
});

router.get('/edit/:name', function(req, res) {
    var prod_name = req.params.name;
    const edit_query = {
        text: `SELECT * FROM product WHERE idproduct=$1`,
        values: [prod_name]
    };
    pg_conn.query(edit_query, function(err, data) {
        if (err) throw err;
        res.render('edit_form', { title: "EDIT DATA PAGE", edit_data: data.rows[0] });
    });
});
/* POST from the edit_form submision */
router.post('/edit/:name', function(req, res) {
    var prod_name = req.params.name;
    const update_query = {
        text: "UPDATE product SET idproduct=$1, nameproduct=$2, costp=$3,amount = $4,shop_name=$5 WHERE idproduct=$6",
        values: [req.body.idproduct, req.body.nameproduct, req.body.costp, req.body.amount, req.body.shop_name, prod_name]
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
                    h2_title: "Welcome to DPCB shop Page",
                    h1_title: "Insert query database successfully",
                    userData: data
                });
            });
        };
    });
});
router.get('/insert', function(req, res) {
    res.render('insert_form', { title: "PLEASE INSERT DATA BASE " });
});
router.post('/insert', function(req, res) {
    const insert_query = {
        text: `INSERT INTO product VALUES ($1,$2,$3,$4,$5)`,
        values: [req.body.idproduct, req.body.nameproduct, req.body.costp, req.body.amount, req.body.shop_name]
    };
    pg_conn.query(insert_query, function(err, data) {
        if (err) {
            throw err;
            res.render('error', { message: "Insert got error", error: err })
        } else {
            var product_query = {
                text: 'SELECT * FROM product',
                values: []
            }
            pg_conn.query(product_query, function(err, data) {
                res.render('users_fe', {
                    title: "Welcome to ATN shop Page",
                    h2_title: "Welcome to DPCB shop Page",
                    h1_title: "Insert query database successfully",
                    userData: data
                });
            });
        };
    });
});
router.get('/delete/:name', function(req, res) {
    var prod_name = req.params.name;
    const del_query = {
        text: `DELETE FROM product WHERE idproduct =$1`,
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
                    h2_title: "Welcome to DPCB shop Page",
                    h1_title: "DELETE query database successfully",
                    userData: data
                });
            });
        };
    });
});
module.exports = router;