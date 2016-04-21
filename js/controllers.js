'use strict';

app.controller('headerCtrl', function($scope, $rootScope, $http, ProjectService, PageService) {
    var _this = this;

    // get projects
    ProjectService.then(function(response) {
        _this.projects = response.projects;
    }, function(error) {
        console.log(error);
    });

    // get pages
    PageService.then(function(response) {
        var pages = response.pages;

        // order and filter pages by title and current project
        _this.mainMenu = _.sortBy(_.filter(pages, function(page) {
            return page.title && page.project === $rootScope.project && page.type !== 'landing';
        }), function(page) {
            return page.order;
        });

        // order and filter pages by title and current project
        _this.footerMenu = _.sortBy(_.filter(pages, function(page) {
            return page.title && page.project === 'root';
        }), function(page) {
            return page.order;
        });
    });

    // set current global project
    _this.setProject = function(project) {
        $rootScope.project = project;
    };

})

.controller('searchCtrl', function($scope, $rootScope, $http, $timeout, PostService) {
    var _this = this;

    // get posts
    PostService.then(function(response) {
        
        // unfiltered posts
        _this.postsUnfiltered = response.posts;

        // filter posts by current project
        _this.posts = response.posts.filter(function(post) {
            return post.categories === $rootScope.project;
        });
    });

    // filter posts according to category
    _this.getRelated = function(filter) {

        // hack to make sure this runs next digest loop and we have our posts
        $timeout(function() {
        
            // confirm we have posts to filter
            if ( typeof _this.postsUnfiltered === 'undefined' ) return;

            // create array out of filter
            var filterArr = filter.split(' ');

            _this.related = [];

            // loop through post keywords and check if any in our filter array
            _.each(_this.postsUnfiltered, function(post) {
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

.controller('homeCtrl', function($scope, $rootScope, $http, ProjectService) {
    var _this = this;

    // get projects
    ProjectService.then(function(response) {
        _this.projects = response.projects;
    }, function(error) {
        console.log(error);
    });
 
})