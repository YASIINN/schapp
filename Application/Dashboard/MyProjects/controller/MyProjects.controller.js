jQuery.sap.require("schapp.Application.Dashboard.MyProjects.MyProjectService.MyProjectService");
sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/export/Spreadsheet", 'sap/ui/model/Filter'], function (Controller, Spreadsheet, Filter) {
    "use strict";
    return Controller.extend("schapp.Application.Dashboard.MyProjects.controller.MyProjects", {
        onInit: function () {
            var _this = this;
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Dashboard/MyProjects").attachPatternMatched(_this.onBeforeShow, _this);
        },
        onBeforeShow: function (argument) {
            CreateComponent.showBusyIndicator();
            var _this = this;
            UseronLogin.onLogin().then(function (res) {
                _this.getMyProject();
            })
        },
        getMyProject: function () {
            var _this = this
            var data = {
                SN: "ActivePonUser",
                where: "ap.uid=?",
                param: oModel.oData.UserModel[0].uid,
                MN: "GET"
            }
            Servertime.getY().then(function (res) {
                if (res != new Date().toLocaleDateString().split(".")[2]) {
                    sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
                }
                else {
                    MyProject.getMyProject(data).then(function (res) {
                        if (res == "None") {
                            CreateComponent.hideBusyIndicator();
                            oModel.setProperty("/MyProjects", []);
                        } else if (res == "") {
                            CreateComponent.hideBusyIndicator();
                            oModel.setProperty("/MyProjects", []);
                        }
                        else {
                            debugger
                            var projdata = []
                            var data = _.groupBy(res, 'pjid')
                            var pjid = Object.keys(data)
                            pjid.sort()
                            for (let index = 0; index < pjid.length; index++) {
                                var lnm = ""
                                var lid = ""
                                for (let j = 0; j < data[pjid[index]].length; j++) {
                                    if (data[pjid[index]].length - 1 == j) {
                                        lnm += data[pjid[index]][j].lnm
                                        lid += data[pjid[index]][j].lid
                                        data[pjid[index]].splice(1, data[pjid[index]].length)
        
                                    } else {
                                        lid += data[pjid[index]][j].lid + ","
                                        lnm += data[pjid[index]][j].lnm + ","
                                    }
                                }
                                data[pjid[index]][0].lid = ""
                                data[pjid[index]][0].lid = lid
                                data[pjid[index]][0].lnm = ""
                                data[pjid[index]][0].lnm = lnm
                                projdata.push(
                                    data[pjid[index]][0]
                                )
                            }
                            oModel.setProperty("/MyProjects", projdata)
                            // oModel.setProperty("/MyProjects", res);
                            CreateComponent.hideBusyIndicator();
                        }
                    })
                }
            })
        },
    });
});
