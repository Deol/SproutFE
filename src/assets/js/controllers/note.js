angular.module('note', [])
.config(function ($stateProvider) {
    $stateProvider.state('note', {
        url: '/note',
        templateUrl: 'views/note/index.html'
    })
    .state('note.list', {
        url: '/list',
        templateUrl: 'views/note/list.html',
        controller: 'noteController',
        controllerAs: 'note'
    })
})
.controller('noteController', function ($rootScope, $scope, $timeout, noteService) {

    
});