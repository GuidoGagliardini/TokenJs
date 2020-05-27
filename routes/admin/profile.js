var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    try {
        res.json({status : true, message : 'ok'})
    } catch(error) {
        res.status(500).json({status : false, message : 'error'})
    }
});

module.exports = router;
