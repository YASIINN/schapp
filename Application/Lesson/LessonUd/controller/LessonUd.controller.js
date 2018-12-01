jQuery.sap.require("schapp.Application.Lesson.LlessonServicejs.LessonOnProjectService");
sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/export/Spreadsheet", 'sap/ui/model/Filter'], function (Controller, Spreadsheet, Filter) {
    "use strict";
    return Controller.extend("schapp.Application.Lesson.LessonUd.controller.LessonUd", {
        onInit: function () {
            var _this = this;
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Lesson/LessonUd").attachPatternMatched(_this.onBeforeShow, _this);
            oModel.setProperty("/enb", false);
        },
        setEnb: function () {
            if (oModel.oData.enb == true) {
                oModel.setProperty("/enb", false);
            } else { oModel.setProperty("/enb", true); }
        },
        onBeforeShow: function (argument) {
            var _this = this;
            UseronLogin.onLogin().then(function (res) {
                _this.getlesson();
            })
        },
        getlesson: function () {
            var _this = this
            Servertime.getY().then(function (res) {
                if (res != new Date().toLocaleDateString().split(".")[2]) {
                    sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
                }
                else {
                    CreateComponent.showBusyIndicator();
                    var filter = window.location.hash.split("?")[1].split("=")[1];
                    if (filter.trim() != "") {
                        LessonOnProjectService.lessonOnProjectReq({ SN: "Lesson", MN: "GETWHERE", "where": "lid", allparam: [filter], field: "lesson" }).then(function (res) {
                            if (res == "None") {
                                sap.m.MessageToast.show("Beklenmeye Hata");
                                CreateComponent.hideBusyIndicator();
                            }
                            else {
                                oModel.setProperty("/lessonUp", res);
                                CreateComponent.hideBusyIndicator();
                            }
                        })
                    } else {
                        sap.m.MessageToast.show("Hatalı Parametre")
                    }
                }
            })
        },
        updateLesson: function () {
            var _this = this
            var filter = {
                MN: "SET",
                SN: "Lesson",
                where: "lid IN " + "(" + window.location.hash.split("?")[1].split("=")[1] + ")",
                wparam: [{
                    "lnm": oModel.oData.lessonUp[0].lnm.toUpperCase(),
                    lperiod: oModel.oData.lessonUp[0].lperiod.toUpperCase(),
                    lclass: oModel.oData.lessonUp[0].lclass.toUpperCase(),
                    lcntn: oModel.oData.lessonUp[0].lcntn.toUpperCase(),
                    lcode: oModel.oData.lessonUp[0].lcode,
                }],
            }
            Servertime.getY().then(function (res) {
                if (res != new Date().toLocaleDateString().split(".")[2]) {
                    sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
                }
                else {
                    LessonOnProjectService.lessonOnProjectReq(filter).then(function (res) {
                        if (res == "SuccedUpdate") {
                            sap.m.MessageToast.show("Kayıt Güncellendi");
                            oModel.setProperty("/enb", false);
                            _this.getlesson();
                        } else if (res == "None") {
                            sap.m.MessageToast.show("Kayıt Güncellenirken Bir Hata Oluştu");
                        } else {
                            sap.m.MessageToast.show("Sunucuda Bir Hata Meydana Gerçekleşti Lütfen Daha Sonra Tekrar Deneyin");
                        }
                    })
                }
            })
        }
    });
});
