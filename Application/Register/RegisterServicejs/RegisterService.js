jQuery.sap.require("schapp.AllRequest.AllRequest");
var RegisterService = {
    RegisterReq: function (json) {
        var deferred = new Promise(function (resolve, reject) {
            AllRequest.POST(json).then(function (res) {
                resolve(res);
            })
        })
        return deferred;
    },
}


