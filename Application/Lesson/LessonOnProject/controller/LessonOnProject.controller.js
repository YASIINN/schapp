jQuery.sap.require("schapp.Application.Lesson.LlessonServicejs.LessonOnProjectService");
sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/export/Spreadsheet", 'sap/ui/model/Filter'], function (Controller, Spreadsheet, Filter) {
    "use strict";
    return Controller.extend("schapp.Application.Lesson.LessonOnProject.controller.LessonOnProject", {
        onInit: function () {
            var _this = this;
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Lesson/LessonOnProject").attachPatternMatched(_this.onBeforeShow, _this);
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
                    SN: "LessonOnProject",
                    where: "lid=?",
                    wparam: filter,
                    MN: "GETP"
                }
                Servertime.getY().then(function (res) {
                    if (res != new Date().toLocaleDateString().split(".")[2]) {
                        sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
                    }
                    else {
                        LessonOnProjectService.lessonOnProjectReq(data).then(function (res) {
                            if (res == "None") {
                                CreateComponent.hideBusyIndicator();
                                oModel.setProperty("/LessonOnProject", []);
                            } else {
                                res.forEach(element => {
                                    if (element.pjselect == "") {
                                        element.pjselect = "Yayınlanmadı"
                                    }
                                    else {
                                        element.pjselect = "Yayında"
                                    }
                                });
                                oModel.setProperty("/LessonOnProject", res);
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
