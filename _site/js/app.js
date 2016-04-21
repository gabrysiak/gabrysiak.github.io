'use strict';

var app = angular.module('netApp', [], function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
})

.run(function($rootScope) {
    // get current project from url
    var project = window.location.pathname.split('/');

    // set current project to our global rootscope
    $rootScope.project = project[1];
})