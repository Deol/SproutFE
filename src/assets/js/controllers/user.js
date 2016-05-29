angular.module('user', [])
.config(function ($stateProvider) {
    $stateProvider.state('user', {
        url: '/user',
        templateUrl: 'views/user/index.html'
    })
    .state('user.detail', {
        url: '/detail',
        controller: 'userController',
        templateUrl: 'views/user/detail.html'
    })
    .state('user.login', {
        url: '/login',
        controller: 'loginController',
        templateUrl: 'views/user/login.html'
    })
    .state('user.register', {
        url: '/register',
        controller: 'registerController',
        templateUrl: 'views/user/register.html'
    })
})
.controller('userController', function ($rootScope, $scope, $timeout, $state, account) {
    $scope.userInfo = account.getUserInfo();
})
.controller('loginController', function ($rootScope, $scope, $timeout, $state, SharedState, pageState, account) {

    var previous = pageState.getPreviousState() || [];
    var previousState = previous[0];

    $scope.login = function () {
        var data = {
            
        }
        account.login(data).then(function (response) {
            
        }, function (error) {

        });
    }
})
.controller('registerController', function ($rootScope, $scope, $timeout, $state, account, $interval) {
    
});