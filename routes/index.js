var express = require('express');
var router = express.Router();
var Comment = require('.././models/comments');

var Post = require('.././models/posts');

router.get('/', function(req, res, next) {
  res.send('this is from /!');
});

router.post('/posts', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
}); 

router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);
  console.log('got here')

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

router.post('/posts/:post/comments/', function(req, res, next) {
    // res.send(req.post);
});

router.get('/posts', function(req, res, next){
  //find is a mongoose query that is predefined
  Post.find(function(error, posts){
    res.send(posts);
  });
});

module.exports = router;