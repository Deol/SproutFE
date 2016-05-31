angular.module('skill', [])
.config(function ($stateProvider) {
    $stateProvider.state('skill', {
        url: '/skill',
        templateUrl: 'views/skill/index.html'
    })
    .state('skill.list', {
        url: '/list',
        templateUrl: 'views/skill/list.html',
        controller: 'skillController',
        controllerAs: 'skill'
    })
    .state('skill.detail', {
        url: '/detail',
        params: {'skill': null},
        templateUrl: 'views/skill/detail.html',
        controller: 'skillController',
        controllerAs: 'skill'
    })
})
.controller('skillController', function ($rootScope, $state, $scope, $timeout, skillService) {
    
    $scope.skillList = [];
    $scope.skillDetail = {};
    $scope.bookList = [];

    var belongTags = ['core_tech', 'expand_tech', 'engineering_dev', 'program_thought'];
    var oldIndex;

    function getSkillInfo (index) {

        var i = index || 0;
        var params = { belong_tag: belongTags[i] };
        
        oldIndex = i;

        skillService.getSkillInfo(params).then(function (res) {
            $scope.skillList = res.data.data;
            console.log(res.data.data);
        });
    }

    $scope.changeTag = function (index) {
        if(index !== oldIndex) {
            getSkillInfo(index);
        }
    }

    if($state.current.url === '/list') {
        getSkillInfo(0);
    } else {
        $scope.skillDetail = $state.params.skill;
        $scope.bookList = $state.params.skill.book;
    }
});