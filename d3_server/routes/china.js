var express = require('express');
var router = express.Router()

var Chinas = require('../moudles/china')

router.get('/allData', (req, res) => {
    Chinas.findOne({}, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({
            result: data
        })
    })
})
module.exports = router;