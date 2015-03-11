var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var hello = _t('hello_user_name', 'ZaiChi', 25);
    res.render('index', {title: 'Express', hello : hello});
});

module.exports = router;
