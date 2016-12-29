app.controller('MainCtrl', ['$scope','posts', '$state', function($scope, posts, $state){
  $scope.posts = posts.posts;

  $scope.addPost = function() {
    // if there is nothing in the input, return (exit) the function
    if ($scope.title === '') { return; }
    
    // define a post, create it according to a certain
    // object structure, invoke the create function that
    // is defined in the service

    var post = {
      title: $scope.title,
      link: $scope.link
    };

    posts.create(post);

    // reset inputs after submission
    $scope.title = '';
    $scope.link = '';
  };

  $scope.incrementUpvotes = function(item) {
    item.upvotes += 1;
  };

  // this is invoked from the client?
  $scope.getComment = function(id) {
    posts.get(id);
    // $state.go('post');
  };

}]);