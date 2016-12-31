// The factory holds the array of posts to serve to the client
app.factory('posts', ['$http', function($http) {
    var postService = {
      posts: [],

      post: {},


      getAll: function() {
        return $http.get('/posts').then(function(data) {
          // making a copy of the data in the database (data.data) and placing it into the array that holds the posts for the client side
          angular.copy(data.data, postService.posts);
          console.log('getAll function invoked');
        });
      }, 

      // for GETting one post and it's comments 
      // get: function(id) {
      //   return $http.get('/posts/' + id + '/comments').then(function(post){
      //     console.log('id');
      //   });
      // },
        get: function(id) {
          // not working - seems the post is not being saved to a path
          console.log('get function invoked');
        return $http.get('/posts/' + id ).then(function(data) {
          angular.copy(data.data, postService.post);
          console.log(postService.post);
        });
      },
      // for POSTing one new post
      create: function(newPost) {
        return $http.post('/posts', newPost).then(function(post){
          // push the data to the service array 'posts'
          postService.posts.push(post.data);
        });
      },

      // for increasing the upvotes to one post
      upvote: function(post) {
        //update (put) the amount of upvotes in the server (index.js)
        // return $http.put('/posts/' + post._id).then(function(item){
        //   console.log(post.item);
        // });

      },

      // for adding a comment to one post
      addComment: function(id, comment) {

      },

      // for upvoting a comment on a specific post
      upvoteComment: function(post, comment) {
     
      }
    };
    
    return postService;
  }]);
  