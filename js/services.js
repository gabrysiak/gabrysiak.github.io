'use strict';

app.factory('ProjectService', 
function($http, $q) {
    var Projects;

    return (function() {
        // if Projects exists return cached value
        return Projects = Projects || $http.get('/api/projects.json').then(function(response) {
            return response.data;
        });
    })();
})
.factory('PageService',
function($http, $q) {
    var Pages;

    return (function() {
        // if Pages exists return cached value
        return Pages = Pages || $http.get('/api/pages.json').then(function(response) {
            return response.data;
        });
    })();
})
.factory('PostService',
function($http, $q) {
    var Posts;

    return (function() {
        // if Posts exists return cached value
        return Posts = Posts || $http.get('/api/posts.json').then(function(response) {
            return response.data;
        });
    })();
})