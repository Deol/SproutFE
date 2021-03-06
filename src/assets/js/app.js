angular.module('Sprout',
        [
          'ui.router', 'mobile-angular-ui',
          'user', 'skill', 'note', 'explore', 'cultivation',
          'Sprout.service', 'Sprout.directive'
        ]
    )
    .run(function ($rootScope) {
        $rootScope.previousState = [];
        $rootScope.isBack = false;

        FastClick.attach(document.body);

        //see https://github.com/mcasimir/mobile-angular-ui/issues/308
        if (((navigator.userAgent.match(/iPhone/i)) ||(navigator.userAgent.match(/iPod/i)))) {

            // 1 为 iOS 2 为 android
            $rootScope.systemType = 1;
            document.addEventListener("click", function (e) {
                var elem = e.target;
                if (elem.tagName && elem.tagName === "A") {
                    e.preventDefault();
                    window.location.href = elem.href;
                }
            }, true);
        }
        else {
            $rootScope.systemType = 2;
        }
    })
    .factory('pageState', function () {
        var previousState = [];

        function getPreviousState() {
            return JSON.parse(sessionStorage.getItem('page'));
        }

        function setPreviousState(obj) {
            sessionStorage.setItem('page', JSON.stringify(obj));
        }

        return {
            previousState: previousState,
            getPreviousState: getPreviousState,
            setPreviousState: setPreviousState
        }
     })
    .config(function ($httpProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/skill/list');
    })
    .controller('mainController', function ($rootScope, $scope, $state, SharedState, pageState, account) {

        $rootScope.$on('$stateChangeStart', function (event, to, toParams, from, fromParams) {
            $rootScope.loading = true;
            var previousState = pageState.getPreviousState() || [];
            var prev = previousState[0];
            if ((!prev || prev.to !== to.name)) {
                if (from.name) {
                    previousState.unshift({to: from.name, params: fromParams});
                    pageState.setPreviousState(previousState);
                }
            }
            else {
                if (from.name) {
                    previousState.shift();
                    pageState.setPreviousState(previousState);
                }
            }
        });

        $scope.isLogin = false;
        $scope.userInfo = {};

        $scope.logout = function () {
            $scope.isLogin = false;
            account.logout().then(function (res) {
                if (res.data.code === 1) {
                    alert('退出成功！');
                }
            });
            sessionStorage.removeItem('user_id');
            sessionStorage.removeItem('user');
            $state.go('skill.list');
        }

        if (sessionStorage.getItem('user_id')) {
            $scope.isLogin = true;
            $scope.userInfo = account.getUserInfo();
        }

        $scope.$on('loginState', function(e, newInfo) {
            if (sessionStorage.getItem('user_id')) {
                $scope.isLogin = true;
                $scope.userInfo = newInfo;
            }
        });

        $scope.$on('mobile-angular-ui.state.changed.isLogin', function (event, newValue, oldValue) {
            $scope.userInfo = newValue ? account.getUserInfo() : {};
        });
    })