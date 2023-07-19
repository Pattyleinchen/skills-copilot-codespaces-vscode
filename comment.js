// Create web server

var express = require('express');
var router = express.Router();

// Database
var db = require('../models');

// Routes
router.get('/', function(req, res) {
    db.Comment.findAll({
        include: [db.Post]
    }).then(function(comments) {
        res.json(comments);
    });
});

router.get('/:id', function(req, res) {
    db.Comment.findOne({
        where: {
            id: req.params.id
        },
        include: [db.Post]
    }).then(function(comment) {
        res.json(comment);
    });
});

router.post('/', function(req, res) {
    db.Comment.create({
        text: req.body.text,
        PostId: req.body.PostId
    }).then(function(comment) {
        res.json(comment);
    });
});

router.delete('/:id', function(req, res) {
    db.Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(comment) {
        res.json(comment);
    });
});

module.exports = router;
