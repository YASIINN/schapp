jQuery.sap.require("schapp.Application.Lesson.LlessonServicejs.LessonOnProjectService");
sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/ui/richtexteditor/RichTextEditor', 'sap/ui/model/Filter'], function (Controller, Spreadsheet, Filter) {
    "use strict";
    return Controller.extend("schapp.Application.Lesson.LessonCreatedUser.controller.LessonCreatedUser", {
        onInit: function () {
            var _this = this;
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Lesson/LessonCreatedUser").attachPatternMatched(_this.onBeforeShow, _this);
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
                    where: "lid=?",
                    wparam: filter,
                    MN: "GETU",
                    SN:"LessonOnProject"
                }
                Servertime.getY().then(function (res) {
                    if (res != new Date().toLocaleDateString().split(".")[2]) {
                        sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
                    }
                    else {
                        debugger
                LessonOnProjectService.lessonOnProjectReq(data).then(function (res) {
                    if (res == "None") {
                        CreateComponent.hideBusyIndicator();
                        oModel.setProperty("/LessonCreatedUser", []);
                    } else {
                        oModel.setProperty("/LessonCreatedUser", res);
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
