jQuery.sap.require("schapp.Application.Project.PprojectServicejs.ProjectOnLessonService");
sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/ui/richtexteditor/RichTextEditor', 'sap/ui/model/Filter'], function (Controller, Spreadsheet, Filter) {
    "use strict";
    return Controller.extend("schapp.Application.Lesson.LessonCreatedUser.controller.LessonCreatedUser", {
        onInit: function () {
            var _this = this;
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Project/ProjectOnCreated").attachPatternMatched(_this.onBeforeShow, _this);
        },
        onBeforeShow: function (argument) {
            CreateComponent.showBusyIndicator();
            var _this = this;
            UseronLogin.onLogin().then(function (res) {
                _this.onCreatedUser();
            })
        },
        onCreatedUser: function () {
            var filter = window.location.hash.split("?")[1].split("=")[1];
            if (filter.trim() != "") {
                var data = {
                    SN:"ProjectOnLesson",
                    "MN": "GETU",
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
                                CreateComponent.hideBusyIndicator();
                                oModel.setProperty("/ProjectOnCreated", []);
                            } else {
                                oModel.setProperty("/ProjectOnCreated", res);
                                CreateComponent.hideBusyIndicator();
                            }
                        })
                    }
                })
            } else {
                sap.m.MessageToast.show("Hatalı Parametre")
            }
        }
    });
});
