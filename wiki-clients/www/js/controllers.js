angular.module('starter.controllers', [])

.controller('SeedsCtrl', function($scope, SeedsService) {

  $scope.shouldShowReorder = false;
  $scope.listCanSwipe = true;

  $scope.seeds  =SeedsService.getAll();


  $scope.deleteSeed = function (item, index) {
    SeedsService.deleteSeed(item).$promise.then(function () {
      $scope.seeds.splice(index, 1);
      console.log("item " + item.toString() + " deleted.")
    });
  };

  $scope.senderInitials = function (senderName) {
   return SeedsService.senderInitials(senderName);
  }
})

.controller('LeaderboardCtrl', function($scope, SeedsService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.senderInitials = function (senderName) {
    return SeedsService.senderInitials(senderName);
  };

  SeedsService.getLeaders().success(function (data) {
    $scope.leaders = data;
  });
})

.controller('AboutCtrl', function($scope) {

});
