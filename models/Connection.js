var mongoose = require('mongoose');

var ConnectionSchema = new mongoose.Schema({
    name: String,
    ip: String,
    port: String,
});

module.exports = mongoose.model('Connection', ConnectionSchema);
