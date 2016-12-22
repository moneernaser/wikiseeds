angular.module('starter.services', ['ngtimeago', 'ngResource'])

.factory('SeedsService', function($http, $resource) {
  // Might use a resource here that returns a JSON array

  var TermsResource = $resource("http://localhost:9000/api/wikiseeds/data/:_id", {_id: '@id'});

  getAllSeeds = function () {
    return TermsResource.query();
  }

  deleteSeed= function (item) {
    return TermsResource.delete({_id: item._id});
  }

  getLeaders = function () {
    return $http.get("http://localhost:9000/api/wikiseeds/leaderboard", {params : {limit: 20}});
  }

  senderInitials = function (senderName) {
    if (senderName) {
      var firstLast = senderName.split(' ');
      if (firstLast.length > 0) {
        var x1, x2;
        x1 = firstLast[0][0].toUpperCase();
        if (firstLast.length > 1) {
          x1 += x2 = firstLast[1][0].toUpperCase();
        }
        return x1;
      }
    }
  };

  return {
    deleteSeed: deleteSeed,
    getAll: getAllSeeds,
    getLeaders: getLeaders,
    senderInitials: senderInitials
  };
});
