var express = require('express');
var router = express.Router();
// commented out because not sure if needed
// var mongoose = require('mongoose');

var Post = require('.././models/posts');
var Comment = require('.././models/comments');

// not sure what this is for so commented it out
// router.get('/', function(req, res, next) {
//   res.send('this is from /!');
// });

// GET all posts from db
router.get('/posts', function(req, res, next){
  //find is a mongoose query that is predefined
  Post.find(function(error, posts){
    res.send(posts);
  });
});

// GET specific post from db
router.get('/posts/:post', function(req, res, next){
  //find is a mongoose query that is predefined
  req.post.populate('comments', function(err, post){
    res.send(post);
  });
});

// new post POST request
router.post('/posts', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
}); 

// find a post by id
router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);
  console.log('got here');

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

// router param for comment
router.param('comment', function(req, res, next, id) {
  // searching in the db for id
  var query = Comment.findById(id);
  console.log('got here');
  // back from db, to this middleware function
  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error('can\'t find comment')); }

    req.comment = comment;
    //req = { comment: {text: 'coool', _id: 890986}}
    return next();
  });
});


// add comment to specific post
router.post('/posts/:post/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post._id;
  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

// PUT request to increment upvotes on a post
router.put('/posts/:post', function(req, res){
  req.post.upvotes ++;
  req.post.save();
  res.send('server upvote function invoked');
});

// upvote a comment
router.put('/comments/:comment', function(req, res){
  // req.params.comment === 8907546
  req.comment.upvotes++;
  req.comment.save();
  res.send('h7hh');

});

module.exports = router;