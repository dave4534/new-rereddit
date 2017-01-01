app.controller('PostsCtrl', ['$scope', 'posts', 'postPromise', function($scope, posts, postPromise) {
  $scope.post = postPromise;

  $scope.addComment = function() {
    if ($scope.body === '') { return; }
    var comment = {
      body: $scope.body,
      author: 'user',
      upvotes: 0
    };

    var x = 
    posts.addComment($scope.post._id, comment).then(function(savedComment){
      $scope.post.comments.push(savedComment);
    });





    $scope.body = '';

   
  };
}]);