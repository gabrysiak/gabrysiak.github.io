'use strict';

app.controller('searchCtrl', function($scope, $rootScope, $http, $timeout, PostService) {
    var _this = this;

    // initialize controller by getting posts or events
    _this.init = function(type) {
        // get posts
        PostService.then(function(response) {  
            
            // filter posts by type blog or post
            _this.posts = _.reject(response.posts, function(post) {
                return post.type !== type;
            });
        });
    };
})

.controller('relatedCtrl', function($scope, $rootScope, $http, $timeout, PostService) {
    var _this = this;

    
    _this.getRelated = function(filter, currentPostUrl, type) {
        // get posts
        PostService.then(function(response) {  
            // posts
            _this.posts = response.posts;

            // confirm we have posts to filter
            if ( typeof _this.posts === 'undefined' ) return;

            // create array out of filter
            var filterArr = filter.split(' ');

            _this.related = [];
            
            // filter posts by type blog or post
            _this.posts = _.reject(response.posts, function(post) {
                return post.type !== type;
            });

            // remove current post from related results
            _this.posts = _.reject(_this.posts, function(post) {
                return post.url === currentPostUrl;
            });

            // loop through post keywords and check if any in our filter array
            _.each(_this.posts, function(post) {
                var keywordsArr = post.keywords.split(' ');

                // check if keywords in arrays intersect
                var intersect = _.intersection(keywordsArr, filterArr);

                // if intersect isn't empty then post contains keywords in our filter
                if (intersect.length) {
                    _this.related.push(post);
                }
            });

        });
    };
 
})

.controller('footerCtrl', function($scope, $rootScope, $http) {
    var _this = this;

    _this.submitForm = function(isValid) {

        if (isValid) {
            alert('Yay... success.');

            // clear fields
            _this.name = '';
            _this.email = '';
        }
    }
 
})