var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/admin', function(req, res, next) {
  var adminId = 'super_secret_session';
  res.cookie('session', adminId, {signed: true});
  req.session = adminId;
  res.redirect('/');
});


module.exports = router;
