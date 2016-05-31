angular.module('explore', [])
.config(function ($stateProvider) {
    $stateProvider.state('explore', {
        url: '/explore',
        templateUrl: 'views/explore/index.html'
    })
    .state('explore.list', {
        url: '/list?belong_tag',
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
.controller('exploreController', function ($rootScope, $scope, $state, $timeout, exploreService) {

    var infoList = [];
    var belong_tag = $state.params.belong_tag;
    var params = belong_tag ? { belong_tag : belong_tag } : {};
    
    $scope.leftInfoList = [];
    $scope.rightInfoList = [];
    
    exploreService.getExploreInfo(params).then(function (res) {
        
        infoList = res.data.data;

        $scope.leftInfoList = infoList.filter(function(item, index, array) {
            return !(index % 2);
        });

        $scope.rightInfoList = infoList.filter(function(item, index, array) {
            return !!(index % 2);
        });

    });
});