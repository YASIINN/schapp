jQuery.sap.require("schapp.Application.Dashboard.LessonServicejs.LessonService");
sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
    "use strict";
    return Controller.extend("schapp.Application.Dashboard.AddLesson.controller.AddLesson", {
        onInit: function () {
            var _this = this;
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Dashboard/AddLesson").attachPatternMatched(_this.onBeforeShow, _this);
        },
        onBeforeShow: function (argument) {
            var _this = this
            UseronLogin.onLogin().then(function (res) {
                _this.allLesson();
                oModel.setProperty("/lessonAddModel", {
                    lnm: "",
                    lcntn: "",
                    lcode: "",
                })
            })
        },
        allLesson: function () {
            var _this = this
                if (localStorage.getItem("ST") != new Date().toLocaleDateString().split(".")[2]) {
                    sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
                }
                else {
                    CreateComponent.showBusyIndicator();
                    LessonService.lessonReq({ MN: "GET", "SN": "Lesson", where: "sid=?", allparam: [parseInt(oModel.oData.UserModel[0].sid)] }).then(function (res) {
                        if (res == "None") {
                            CreateComponent.hideBusyIndicator();
                        } else {
                            oModel.setProperty("/AdlesAll", res)
                            CreateComponent.hideBusyIndicator();
                        }
                    })
                }
        },
        validateData: function () {
            var _this = this
            if (oModel.oData.lessonAddModel.lnm.trim() == "") {
                sap.m.MessageToast.show("Ders Adı Girilmek Zorundadır")
            } else if (oModel.oData.lessonAddModel.lcntn.trim() == "") {
                sap.m.MessageToast.show("Ders İçeriği Girilmek Zorundadır")
            } else if (oModel.oData.lessonAddModel.lcode.trim() == "") {
                sap.m.MessageToast.show("Ders Kodu Girilmek Zorundadır")
            }
            else {
                _this.onAddLesson();
            }
        },
        onAddLesson: function () {
            var _this = this
                if (localStorage.getItem("ST") != new Date().toLocaleDateString().split(".")[2]) {
                    sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
                }
                else {
                    CreateComponent.showBusyIndicator();
                    var filter = {
                        lcode: oModel.oData.lessonAddModel.lcode,
                        lnm: oModel.oData.lessonAddModel.lnm.toUpperCase(),
                        lcntn: oModel.oData.lessonAddModel.lcntn.toUpperCase(),
                        lclass: _this.byId("addlessclass").getSelectedKey(),
                        lcruid: oModel.oData.UserModel[0].uid,
                        lperiod: _this.byId("addless").getSelectedKey(),
                        sid: oModel.oData.UserModel[0].sid
                    }
                    LessonService.lessonReq({ SN: "Lesson", MN: "GET", "where": "lnm=? OR lcode=?", allparam: [oModel.oData.lessonAddModel.lnm, oModel.oData.lessonAddModel.lcode]}).then(function (res) {
                        if (res != "None" && res != "") {
                            sap.m.MessageToast.show("Bu Ders Veya Ders Kodu Daha Önce Girildi")
                            CreateComponent.hideBusyIndicator();
                        } else if (res == "") {
                            sap.m.MessageToast.show("Sunucuda Hata Gerçekleşti Lütfen Daha Sonra Tekrar Deneyin.")
                            CreateComponent.hideBusyIndicator();

                        } else {
                            LessonService.lessonReq({ lesson: [filter], MN: "ADD", SN: "Lesson" }).then(function (res) {
                                if (res[0].status == "None") {
                                    sap.m.MessageToast.show("Ders Eklenirken Bir Hata Oluştu");
                                    CreateComponent.hideBusyIndicator();
                                } else if (res == "") {
                                    sap.m.MessageToast.show("Sunucuda Hata Gerçekleşti Lütfen Daha Sonra Tekrar Deneyin.")
                                    CreateComponent.hideBusyIndicator();
                                }
                                else {
                                    _this.allLesson();
                                    sap.m.MessageToast.show("Ders Başaryıla Eklendi");
                                    oModel.setProperty("/lessonAddModel", {
                                        lnm: "",
                                        lcntn: "",
                                        lcode: ""
                                    })
                                    _this.byId("addless").setSelectedKey("");
                                    CreateComponent.hideBusyIndicator();
                                }
                            })
                        }
                    })
                }
        }
    })
});