angular.module('Sprout.directive', [])
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
});
