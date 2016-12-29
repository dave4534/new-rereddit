// The factory holds the array of posts to serve to the client
app.factory('posts', ['$http', function($http) {
    var postService = {
      posts: [],


      getAll: function() {
        return $http.get('/posts').then(function(data) {
          // making a copy of the data in the database (data.data) and placing it into the array that holds the posts for the client side
          angular.copy(data.data, postService.posts);
        });
      }, 

      // for GETting one post and it's comments 
      get: function(id) {
        return $http.get('/posts/' + id + '/comments').then(function(post){
          console.log(post);
        });
      },

      // for POSTing one new post
      create: function(post) {
        return $http.post('/posts', post).then(function(post){
          // push the data to the service array 'posts'
          postService.posts.push(post.data);
        });
      },

      // for increasing the upvotes to one post
      upvote: function(post) {

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
  