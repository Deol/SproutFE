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

    $scope.showModal = 0;
    $scope.isEdit = 0;
    
    var sex = ['男', '女'];
    $scope.userSex = sex[$scope.userInfo.sex - 1];

    $scope.userInfo = account.getUserInfo();
    $scope.passwdInfo = {
        passwd: '',
        confirmPasswd: '',
        id: $scope.userInfo.user_id
    }

    $scope.toggleModal = function (index) {
        $scope.showModal = index;
    }

    $scope.resetPasswd = function () {
        if ($scope.passwdInfo.passwd === $scope.passwdInfo.confirmPasswd) {
            account.updateUserInfo($scope.passwdInfo).then(function (res) {
                if (res.data.code === 1 && res.data.data.nModified) {
                    alert('修改成功！');
                }
            });
        } else {
            alert('两次密码输入不一致');
        }
        $scope.showModal = 0;
    }

    $scope.editInfo = function () {
        $scope.userInfo.id = $scope.userInfo.user_id;

        account.updateUserInfo($scope.userInfo).then(function (res) {
            if (res.data.code === 1 && res.data.data.nModified) {
                alert('修改成功！');
                account.setUserInfo($scope.userInfo);
            }
        }); 
    }
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
                $scope.$emit('loginState', res.data.data);
                $state.go('skill.list');
            } else {
                alert(response.data.msg);
            }
        });
    }
})
.controller('registerController', function ($rootScope, $scope, $timeout, $state, account, $interval) {

    $scope.userInfo = {};

    $scope.register = function () {

        if ($scope.userInfo.passwd !== $scope.userInfo.confirm_passwd) {
            alert('两次密码输入不一致！');
        } else {
            account.register($scope.userInfo).then(function (res) {
                alert(res.data.msg);
                if (res.data.code === 1) {
                    account.setUserInfo(res.data.data);
                    console.log(sessionStorage);
                }
            });
        }
    }
});