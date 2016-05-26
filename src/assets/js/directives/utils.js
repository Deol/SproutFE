angular.module('SproutDirective', [])
.directive('toggleText', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attr, ctrl) {
            var prev = angular.element(elem[0].previousElementSibling);
            elem.on('click', function () {
                prev.toggleClass('text-overflow');
                elem.toggleClass('arrow-actived');
            })
        }
    }
})
.directive('goBack', function ($rootScope, $state, pageState) {
    return {
        restrict: 'AE',
        link: function(scope, elem, attr, ctrl) {
            elem.on('click', function () {
                var previous = pageState.getPreviousState() || [];
                var previousState = previous[0];
                if (previousState) {
                    return previousState.params ? $state.go(previousState.to, previousState.params) : $state.go(previousState.to);
                }
            })
        }
    }
})
.directive('pushRefresh', function ($rootScope, $window, $interval) {
    return {
        scope: {
            pushRefresh: '&',
            throttleTime: '=',
            pushRefreshDisabled: '=',
            pushRefreshDistance: '='
        },
        link: function (scope, elem, attrs) {
            var height;
            var handler;
            var checkWhenEnabled = null;
            var refreshEnabled = true;
            throttleTime = parseInt(attrs.throttleTime, 10);
            pushRefreshDistance = parseInt(attrs.pushRefreshDistance, 10);

            height = function (element) {
                element = elem[0] || element;
                if (isNaN(element.offsetHeight)) {
                    return element.document.documentElement.clientHeight;
                }
                else {
                    return element.offsetHeight;
                }
            };

            handler = function () {
                var remaining;
                var containerBottom;
                containerBottom = height();
                remaining = elem[0].scrollHeight - elem[0].scrollTop - containerBottom;
                if (remaining <= pushRefreshDistance) {
                    checkWhenEnabled = true;

                    if (refreshEnabled) {
                        if (scope.$$phase || $rootScope.$$phase) {
                            return scope.pushRefresh();
                        }
                        else {
                            return scope.$apply(scope.pushRefresh);
                        }
                    }
                }
                else {
                    return checkWhenEnabled = false;
                }

            };

            throttle = function (func, wait) {
                var later;
                var previous;
                var timeout;
                timeout = null;
                previous = 0;
                later = function () {
                    var context;
                    previous = new Date().getTime();
                    $interval.cancel(timeout);
                    timeout = null;
                    func.call();
                    return context = null;
                }
                return function () {
                    var now;
                    var remaining;
                    now = new Date().getTime();
                    remaining = wait - (now - previous);
                    if (remaining <= 0) {
                        clearTimeout(timeout);
                        $interval.cancel(timeout);
                        timeout = null;
                        previous = now;
                        return func.call();
                    }
                    else {
                        if (!timeout) {
                            return timeout = $interval(later, remaining, 1);
                        }
                    }
                }
            }

            handler = throttle(handler, throttleTime);
            elem.bind('scroll', handler);
            scope.$on('$destroy', function () {
                elem.unbind('scroll', handler);
            });
            handler();
        }
    }
});
