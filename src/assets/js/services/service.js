angular.module('Sprout.service', [])
.constant('urlConfig', {
    baseUrl: 'http://0.0.0.0:3000/sprout/v1'
})
.service('account', function ($http, urlConfig) {
    var baseUrl = urlConfig.baseUrl;

    function login(data) {
        var url = baseUrl + '/user/login'
        return $http.post(url, data);
    }

    function logout(data) {
        var url = baseUrl + '/user/logout'
        return $http.post(url, data);
    }

    function register(data) {
        var url = baseUrl + '/user/register';
        return $http.post(url, data);
    }

    function updateUserInfo(data) {
        var url = baseUrl + '/user/' + data.id;
        return $http.post(url, data);
    }

    function setUserInfo(data) {
        sessionStorage.setItem('user_id', data.user_id);
        sessionStorage.setItem('user', JSON.stringify(data));
    }

    function getUserInfo() {
        return JSON.parse(sessionStorage.getItem('user'));
    }

    return {
        login: login,
        logout: logout,
        register: register,
        updateUserInfo: updateUserInfo,
        setUserInfo: setUserInfo,
        getUserInfo: getUserInfo
    };
})
.service('skillService', function ($http, urlConfig) {
    var baseUrl = urlConfig.baseUrl;

    function addSkill(data) {
        var url = baseUrl + '/skill'
        return $http.post(url, data);
    }

    function getSkillInfo(data) {
        var url = baseUrl + '/skill?belong_tag=' + data.belong_tag;
        return $http.get(url, data);
    }

    function setSkillInfo(data) {
        var url = baseUrl + '/skill';
        return $http.put(url, data);
    }

    function deleteSkill(data) {
        var url = baseUrl + '/skill/' + data.id;
        return $http.delete(url, data);
    }

    return {
        addSkill: addSkill,
        getSkillInfo: getSkillInfo,
        setNoteInfo: setSkillInfo,
        deleteSkill: deleteSkill
    };
})
.service('noteService', function ($http, urlConfig) {
    var baseUrl = urlConfig.baseUrl;

    function addNote(data) {
        var url = baseUrl + '/note'
        return $http.post(url, data);
    }

    function getNoteInfo(data) {
        var url = baseUrl + '/note?user_id=' + data.user_id;
        return $http.get(url, data);
    }

    function setNoteInfo(data) {
        var url = baseUrl + '/note/' + data.id;
        return $http.put(url, data);
    }

    function deleteNote(data) {
        var url = baseUrl + '/note/' + data.id;
        return $http.delete(url, data);
    }

    return {
        addNote: addNote,
        getNoteInfo: getNoteInfo,
        setNoteInfo: setNoteInfo,
        deleteNote: deleteNote
    };
})
.service('exploreService', function ($http, urlConfig) {
    var baseUrl = urlConfig.baseUrl;

    function getExploreInfo(data) {
        var url = baseUrl + '/explore';
        if(data.belong_tag) {
            url += '?belong_tag=' + data.belong_tag;
        }
        return $http.get(url, data);
    }

    function addExplore(data) {
        var url = baseUrl + '/explore'
        return $http.post(url, data);
    }

    function setExploreInfo(data) {
        var url = baseUrl + '/explore/' + data.id;
        return $http.put(url, data);
    }

    function deleteExplore(data) {
        var url = baseUrl + '/explore/' + data.id;
        return $http.delete(url, data);
    }

    return {
        getExploreInfo: getExploreInfo,
        addExplore: addExplore,
        setExploreInfo: setExploreInfo,
        deleteExplore: deleteExplore
    };
})
.service('cultivationService', function ($http, urlConfig) {
    var baseUrl = urlConfig.baseUrl;

    function getCultivationInfo(data) {
        var url = baseUrl + '/cultivation';
        return $http.get(url, data);
    }

    function addCultivation(data) {
        var url = baseUrl + '/cultivation'
        return $http.post(url, data);
    }

    function setCultivationInfo(data) {
        var url = baseUrl + '/cultivation/' + data.id;
        return $http.put(url, data);
    }

    function deleteCultivation(data) {
        var url = baseUrl + '/cultivation/' + data.id;
        return $http.delete(url, data);
    }

    return {
        getCultivationInfo: getCultivationInfo,
        addCultivation: addCultivation,
        setCultivationInfo: setCultivationInfo,
        deleteCultivation: deleteCultivation
    };
});