// The factory holds the array of posts to serve to the client
app.factory('posts', ['$http', function($http) {
    var postService = {
      postsArray: [],

      // postObj: {},


      getAll: function() {
        return $http.get('/posts').then(function(data) {
          // making a copy of the data in the database (data.data) and placing it into the array that holds the posts for the client side
          angular.copy(data.data, postService.postsArray);
          console.log('getAll function invoked');
        });
      }, 

      // for GETting one post and it's comments 
        get: function(id) {
          // not working - seems the post is not being saved to a path
          console.log('get function invoked');
        return $http.get('/posts/' + id ).then(function(data) {
          // angular.copy(data.data);
          // data.data is basically one post
          return (data.data);
          // console.log(postService.postsArray);
        });
      },
      // for POSTing one new post
      create: function(newPost) {
        return $http.post('/posts', newPost).then(function(post){
          // push the data to the service array 'posts'
          postService.postsArray.push(post.data);
        });
      },

      // for increasing the upvotes to one post
      upvote: function(post) {
        // invoke the server upvote function
        console.log('invoked the upvote, about to http put');

        return $http.put('/posts/' + post).then(function(msg){
          console.log(msg);
          postService.getAll();
          console.log(postService.postsArray);
        });

      },

      // for adding a comment to one post
      addComment: function(id, comment) {
        return $http.post('/posts/' + id + '/comments', comment).then(function(data){
          return data.data;
        });

      },

      // for upvoting a comment on a specific post
      upvoteComment: function(comment) {
        console.log(comment);
        return $http.put('/comments/' + comment._id);
      }
    };
    
    return postService;
  }]);
  