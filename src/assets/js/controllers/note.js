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
    .state('note.edit', {
        url: '/edit',
        templateUrl: 'views/note/edit.html',
        controller: 'editController',
        controllerAs: 'note'
    })
})
.controller('noteController', function ($rootScope, $scope, $timeout, account, noteService) {

    $scope.noteList = [];

    var params = {
        user_id: account.getUserInfo().user_id
    };

    if (params.user_id) {
        noteService.getNoteInfo(params).then(function (res) {
            
            var noteList = res.data.data;

            var periousTime = noteList[0].edit_time;

            for (var i = 1; i <= noteList.length - 1; i++) {
                if(noteList[i].edit_time === periousTime) {
                    noteList[i].edit_time = '';
                } else {
                    periousTime = noteList[i].edit_time;
                }
            }

            $scope.noteList = noteList;
        })
    }

})
.controller('editController', function ($rootScope, $state, $scope, $timeout, account, noteService) {

    $scope.newNote = '';

    var params = {
        user_id: account.getUserInfo().user_id,
    };

    $scope.addNote = function () {
        params.content = $scope.newNote;

        if (params.user_id) {
            noteService.addNote(params).then(function (res) {
                $scope.noteList = res.data.data;
                $state.go('note.list');
            })
        }
    }
});