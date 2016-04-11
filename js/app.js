var app = angular.module('netApp', [], function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
})

.controller('searchCtrl', function($scope, $http) {
    var _this = this;

    $http.get('/api/posts.json').success(function(data) {
        _this.posts = data.posts;
    });
 
})