app.controller('MainCtrl', ['$scope','posts', '$state', function($scope, posts, $state){
  $scope.posts = posts.postsArray;

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

  // invoking the GET request in the service, to show a post
  $scope.getPost = function(id){
    posts.get(id);
  };

  $scope.incrementUpvotes = function(item) {
    // updating view
    item.upvotes += 1;

    // updating service
    posts.upvote(item._id).then(function(data){
      console.log('back in the controller');
      console.log(data);
    });//$http.put(/posts/:post)
    console.log('mainController printing upvoted item:' + item);
  };

  // this is invoked when click on 'comments'
  
  $scope.incrementCommentUpvotes = function(comment){
    comment.upvotes++;
    console.log('heres the comment in the ctrl ');
    console.log(comment)
    posts.upvoteComment(comment);
  };

  $scope.getComment = function(id) {
    // console.log('mainController invoking get request of comment');
    posts.get(id);
    // $state.go('post');
  };

}]);