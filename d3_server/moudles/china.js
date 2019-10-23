let mongoose = require('mongoose');
var Schema = mongoose.Schema;
var china = new Schema({
    "type": String,
    "features": Array,
    "srcSize": Object
});

module.exports = mongoose.model("Chinas", china)