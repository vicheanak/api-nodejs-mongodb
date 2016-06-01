var express = require('express');
var mongoose = require('mongoose');
var Product = require('../models/product');

var router = express.Router();

router.get('/products', function(req, res) {
    Product.find(function(err, products){
        res.send(products);
    });
});

router.post('/products', function(req, res) {
    new Product({name : req.body.name})
        .save(function(err, product) {
            res.send(product);
        });
});

router.put('/product/:id', function(req, res) {
    var query = {"_id": req.params.id};
    var update = {name : req.body.name};
    var options = {new: true};
    Product.findOneAndUpdate(query, update, options, function(err, product){
        res.send(product);
    });
});

router.delete('/product/:id', function(req, res) {
    var query = {"_id": req.params.id};
    Product.findOneAndRemove(query, function(err, product){
        res.send(true);
    });
});

module.exports = router;
