var express = require('express');

var auth = require('../middleware/auth');
var login = require('./api/login');
var posts = require('./api/posts');
var router = express.Router();
const axios = require('axios');

const API = 'https://jsonplaceholder.typicode.com';

router.options('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Api is running');
});


router.use('/login', login);
router.use('/posts', auth.requireRole('admin'), posts);


router.get('/crash', function(req, res) {

        process.exit(1);
      });

// Get all posts
// router.get('/posts', (req, res) => {
//   // Get posts from the mock api
//   // This should ideally be replaced with a service that connects to MongoDB
//   axios.get(`${API}/posts`)
//     .then(posts => {

//       res.status(200).json(posts.data);
//     })
//     .catch(error => {
//       res.status(500).send(error)
//     });
// });

//  router.post('/post', function (req, res) {
//   if (!req.body) return res.sendStatus(400)
//   res.send('New Post, ' + req.body.title)
// })




// router.use('/posts', posts)

var enforceContentType = require('enforce-content-type');

router.use(enforceContentType({
  type: 'application/json'
}));


module.exports = router;
