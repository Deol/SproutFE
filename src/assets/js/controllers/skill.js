angular.module('skill', [])
.config(function ($stateProvider) {
    $stateProvider.state('skill', {
        url: '/skill',
        templateUrl: 'views/skill/index.html'
    })
    .state('skill.list', {
        url: '/list',
        templateUrl: 'views/skill/list.html',
        controller: 'skillController',
        controllerAs: 'skill'
    })
    .state('skill.detail', {
        url: '/select',
        templateUrl: 'views/skill/detail.html',
        controller: 'skillController',
        controllerAs: 'skill'
    })
})
.controller('skillController', function ($rootScope, $scope, $timeout) {
    
});