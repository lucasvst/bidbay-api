const express = require('express');
const router = express.Router();

const Opportunity = require('./model');

router.get('/', function(req, res) {

    Opportunity.find({}, function(err, data) {
        if (err) {
            res.sendStatus(500);
        } else {
            res.json(data);
        }
    });
});

router.get('/:id', function(req, res) {

    const query = { _id: req.params.id };

    Opportunity.findOne(query, function(err, data) {
        if (err || data == null) {
            res.sendStatus(404);
        } else {
            res.json(data);
        }
    });
});

router.post('/', function(req, res) {

    const _body = req.body;
    const opportunities = [];

    if (Array.isArray(_body)) {
        opportunities.push(..._body.map(_op => new Opportunity(_op)));
    } else {
        opportunities.push(new Opportunity(_body));
    }

    opportunities.map(op => op.save((err, data) => {

        if (err) { console.log(err); }
    }));

    res.status(201).json(opportunities);
});

router.put('/:id', function(req, res) {

    const query = { _id: req.params.id };
    const mod = req.body;
    delete mod._id;

    Opportunity.update(query, mod, function(err, data) {
        if (err) {
            res.status(400).json(err);
        } else {
            res.json(data);
        }
    });
});

router.delete('/:id', function(req, res) {

    const query = { _id: req.params.id };

    Opportunity.remove(query, function(err, data) {
        if (err) {
            res.status(400).json(err);
        } else {
            res.json(data);
        }
    });
});

module.exports = router;