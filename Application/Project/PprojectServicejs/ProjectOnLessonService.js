jQuery.sap.require("schapp.AllRequest.AllRequest");
var ProjectonLesson = {
    ProjectonLessonReq: function (json) {
        var deferred = new Promise(function (resolve, reject) {
            AllRequest.POST(json).then(function (res) {
                resolve(res);
            })
        })
        return deferred;
    },
}