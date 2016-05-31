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

    $scope.user = {
        phone: '',
        passwd: ''
    }

    $scope.login = function () {
        var data = {
            phone: $scope.user.phone,
            passwd: $scope.user.passwd
        }
        account.login(data).then(function (res) {
            if (res.data.code === 1) {
                account.setUserInfo(res.data.data);
                // 登录成功，返回之前的状态
                if (previousState) {
                    return previousState.params ? $state.go(previousState.to, previousState.params) : $state.go(previousState.to);
                }
                else {
                    $state.go('skill.list');
                }
            } else {
                alert(response.data.msg);
            }
        });
    }
})
.controller('registerController', function ($rootScope, $scope, $timeout, $state, account, $interval) {
    
});