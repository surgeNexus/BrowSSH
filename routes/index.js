const express = require('express');
const router = express.Router();
const Connection = require('../models/Connection');

router.get('/', (req, res) => {
    Connection.find({}, (err, foundConnections) => {
        if(err){
            req.flash('error', 'No connections found');
        } else {
            res.render('index', {
                connections: foundConnections
            });
        }
    })
});

module.exports = router;