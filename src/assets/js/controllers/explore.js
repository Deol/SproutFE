angular.module('explore', [])
.config(function ($stateProvider) {
    $stateProvider.state('explore', {
        url: '/explore',
        templateUrl: 'views/explore/index.html'
    })
    .state('explore.list', {
        url: '/list',
        templateUrl: 'views/explore/list.html',
        controller: 'exploreController',
        controllerAs: 'explore'
    })
    .state('explore.select', {
        url: '/select',
        templateUrl: 'views/explore/select.html',
        controller: 'exploreController',
        controllerAs: 'explore'
    })
})
.controller('exploreController', function ($rootScope, $scope, $timeout, exploreService) {
    
});