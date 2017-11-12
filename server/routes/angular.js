var path = require("path");
var express = require("express");
var fs = require("fs");
var cheerio = require("cheerio");

var router = express.Router();

var angularBuildPath = path.resolve(__dirname, "../../dist");

var angularIndexFile = cheerio.load(
  fs.readFileSync(path.join(angularBuildPath, "index.html"), {
    encoding: "utf8"
  })
);

router.use(express.static(angularBuildPath));



router.get('*', (req, res, next) => {
  if (req.url.startsWith('/api')) return next();
  var locale = req.get('Accept-Language').split(',')[0];
  console.log("locale", locale);
  angularIndexFile('head script').html('document.locale = "' + locale + '"');
  res.contentType('text/html; charset=UTF-8');
  res.send(angularIndexFile.html());
});

router.get("*", (req, res, next) => {
  if (req.url.startsWith("/api")) return next();
  res.sendFile(path.join(angularBuildPath, "index.html"));
});

module.exports = router;
