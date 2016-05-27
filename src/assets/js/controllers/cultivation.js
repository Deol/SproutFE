angular.module('cultivation', [])
.config(function ($stateProvider) {
    $stateProvider.state('cultivation', {
        url: '/cultivation',
        templateUrl: 'views/cultivation/index.html'
    })
    .state('cultivation.list', {
        url: '/list',
        templateUrl: 'views/cultivation/list.html',
        controller: 'cultivationController',
        controllerAs: 'cultivation'
    })
})
.controller('cultivationController', function ($rootScope, $scope, $timeout, cultivationService) {

    
});