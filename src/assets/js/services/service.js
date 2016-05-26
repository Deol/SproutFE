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

    function setUserInfo(data) {
        var url = baseUrl + '/user/' + data.id;
        return $http.post(url, data);
    }

    return {
        login: login,
        logout: logout,
        register: register,
        setUserInfo: setUserInfo
    };
})
.service('noteService', function ($http, urlConfig) {
    var baseUrl = urlConfig.baseUrl;

    function addNote(data) {
        var url = baseUrl + '/note'
        return $http.post(url, data);
    }

    function getNoteInfo(data) {
        var url = baseUrl + '/note' + data.userId;
        return $http.get(url, data);
    }

    function setNoteInfo(data) {
        var url = baseUrl + '/note' + data.id;
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

    function addExplore(data) {
        var url = baseUrl + '/explore'
        return $http.post(url, data);
    }

    function getExploreInfo(data) {
        var url = baseUrl + '/explore' + data.belongTag;
        return $http.get(url, data);
    }

    function setExploreInfo(data) {
        var url = baseUrl + '/explore' + data.id;
        return $http.put(url, data);
    }

    function deleteExplore(data) {
        var url = baseUrl + '/explore/' + data.id;
        return $http.delete(url, data);
    }

    return {
        addExplore: addExplore,
        getExploreInfo: getExploreInfo,
        setExploreInfo: setExploreInfo,
        deleteExplore: deleteExplore
    };
})
.service('cultivationService', function ($http, urlConfig) {
    var baseUrl = urlConfig.baseUrl;

    function addCultivation(data) {
        var url = baseUrl + '/cultivation'
        return $http.post(url, data);
    }

    function getCultivationInfo(data) {
        var url = baseUrl + '/cultivation';
        return $http.get(url, data);
    }

    function setCultivationInfo(data) {
        var url = baseUrl + '/cultivation' + data.id;
        return $http.put(url, data);
    }

    function deleteCultivation(data) {
        var url = baseUrl + '/cultivation/' + data.id;
        return $http.delete(url, data);
    }

    return {
        addCultivation: addCultivation,
        getCultivationInfo: getCultivationInfo,
        setCultivationInfo: setCultivationInfo,
        deleteCultivation: deleteCultivation
    };
});