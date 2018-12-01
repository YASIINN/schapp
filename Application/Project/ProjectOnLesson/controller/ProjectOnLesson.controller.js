jQuery.sap.require("schapp.Application.Project.PprojectServicejs.ProjectOnLessonService");
sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/export/Spreadsheet", 'sap/ui/model/Filter'], function (Controller, Spreadsheet, Filter) {
    "use strict";
    return Controller.extend("schapp.Application.Project.ProjectOnLesson.controller.ProjectOnLesson", {
        onInit: function () {
            var _this = this;
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Project/ProjectOnLesson").attachPatternMatched(_this.onBeforeShow, _this);
        },
        onBeforeShow: function (argument) {
            CreateComponent.showBusyIndicator();
            var _this = this;
            UseronLogin.onLogin().then(function (res) {
                _this.getProjectonLesson();
            })
        },
        getProjectonLesson: function () {
            var _this = this
            var filter = window.location.hash.split("?")[1].split("=")[1];
            if (filter.trim() != "") {
                var data = {
                    SN:"ProjectOnLesson",
                    "MN": "GETP",
                    where: "pjid=?",
                    param: filter,
                }
                Servertime.getY().then(function (res) {
                    if (res != new Date().toLocaleDateString().split(".")[2]) {
                        sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
                    }
                    else {
                        ProjectonLesson.ProjectonLessonReq(data).then(function (res) {
                            if (res == "None") {
                                oModel.setProperty("/ProjectOnLesson", [])
                                CreateComponent.hideBusyIndicator();
                            } else {
                                oModel.setProperty("/ProjectOnLesson", res)
                                CreateComponent.hideBusyIndicator();
                            }
                        })
                    }
                })
            } else {
                sap.m.MessageToast.show("Hatalı Parametre")
            }
        },
    });
});
