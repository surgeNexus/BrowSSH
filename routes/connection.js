const express = require('express');
const { connections } = require('mongoose');
const router = express.Router();
const Connection = require('../models/Connection');

router.get('/:id', (req, res) => {
    Connection.findById(req.params.id, (err, foundConnection) => {
        if(err){console.log(err); res.redirect('back')}
        Connection.find({}, (err, foundConnections) => {
            if(err){
                req.flash('error', 'Connection not found');
                res.redirect('back');
            } else {
                res.render('connection/index', {
                    connections: foundConnections,
                    connection: foundConnection
                });
            }
        });
    });
});

router.post('/new', (req, res) => {
    const newConnection = {
        name: req.body.name,
        ip: req.body.ip,
        port: req.body.port,
    }
    Connection.create(newConnection, (err, connection) => {
        if(err){
            req.flash('error', 'Connection not created');
            res.redirect('back');
        } else {
            res.redirect('back');
        }
    });
});

router.get('/:id/edit', (req, res) => {
    Connection.findById(req.params.id, (err, foundConnection) => {
        if(err){
            req.flash('error', 'Connection not found');
            res.redirect('back');
        } else {
            res.render('connection/edit', {
                connection: foundConnection
            });
        }
    });
});

router.put('/:id/edit', (req, res) => {
    const connectionUpdate = {
        name: req.body.name,
        ip: req.body.ip,
        port: req.body.port,
    }
    Connection.findByIdAndUpdate(req.params.id, connectionUpdate, (err, connection) => {
        if(err){
            req.flash('error', err);
            res.redirect('back');
        } else {
            res.redirect('back');
        }
    });
});

module.exports = router;