var express = require('express');
var router = express.Router();

router.all('*', function(req, res, next) {
  var hasSession = req.cookies.session;

  if (hasSession) {
    req.session = hasSession;
  } else {
    var newSession = Math.floor(Math.random() *
      1000000000);
    res.cookie('session', newSession,{ signed:
      true });
    req.session = newSession;
  }

  console.log('Current Session: ', req.session);
  next();
});

module.exports = router;
