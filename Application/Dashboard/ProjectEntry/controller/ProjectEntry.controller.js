jQuery.sap.require("schapp.Application.Dashboard.LessonServicejs.LessonService");
jQuery.sap.require("schapp.Application.Dashboard.SectionServicejs.SectionService");
jQuery.sap.require("schapp.Servicejs.ProjectService");
sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
    "use strict";
    return Controller.extend("schapp.Application.Dashboard.ProjectEntry.controller.ProjectEntry", {
        onInit: function () {
            var _this = this;
            _this.getView().setModel(oModel);
            _this.lessondialog = ""
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Dashboard/ProjectEntry").attachPatternMatched(_this.onBeforeShow, _this);
            oModel.setProperty("/projectModel", [{
                pjnm: "",
                psd: "",
                ptek: "",
                pperiod: new Date().toLocaleDateString("tr-TR"),
                pjquota: ""
            }])
        },
        checkValidate: function () {
            var result = [false, ""]
            if (oModel.oData.projectModel[0].pjnm.trim() == "" || oModel.oData.projectModel[0].pjnm.trim().length < 3) {
                result = [false, "project"];
            } else if (oModel.oData.projectModel[0].psd.trim() == "") {
                result = [false, "psd"];
            }
            else if (oModel.oData.projectModel[0].ptek.trim() == "") {
                result = [false, "ptek"];
            }
            else if (isNaN(oModel.oData.projectModel[0].pjquota) || oModel.oData.projectModel[0].pjquota <= 0) {
                result = [false, "pquota"];
            }
            else {
                result = [true, "validate"]
            }
            return result;
        },
        handleSelectionFinish: function (oEvent) {
            oModel.setProperty("/selectedLess", oEvent.getParameter("selectedItems"));
        },
        addless: function () {
            debugger
            var _this = this
            var filter = {
                MN: "GET",
                "SN": "Sections",
                where: "sid=?",
                allparam: [parseInt(oModel.oData.UserModel[0].sid)]
            }
            if (localStorage.getItem("ST") != new Date().toLocaleDateString().split(".")[2]) {
                sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
            }
            else {
                SectionService.SectionReq(filter).then(function (res) {
                    if (res != "None") {
                        oModel.setProperty("/section", res)
                    }
                })
            }
            if (_this.lessondialog) {
                _this.lessondialog.open(_this);
                return
            }
            _this.lessondialog = new sap.m.Dialog(
                {
                    contentWidth: "40%",
                    contentHeight: "40%",
                    stretchOnPhone: true,
                    showCloseButton: true
                }).addStyleClass(
                    "dialogHasFooter sapUiNoMargin sapUiNoContentPadding sapUiSizeCompact"
                )
            var bar = new sap.m.Bar({});
            bar.addContentMiddle(new sap.m.HBox({
                alignItems: sap.m.FlexAlignItems.Center,
                justifyContent: sap.m.FlexJustifyContent.Stretch,
                items: [
                    new sap.m.Text(
                        {
                            text: "Ders Ekle",
                            width: "150px"
                        }).addStyleClass("sapUiSmallMarginBegin")
                ]
            }).addStyleClass("sapUiNoMargin"))
            bar.addContentRight(
                new sap.m.Button({
                    icon: "sap-icon://sys-cancel",
                    text: "Kapat",
                    type: "Transparent",
                    press: function () {
                        _this.lessondialog.close();
                    }
                }).addStyleClass("sapUiNoMargin"))
            var lesarea = new sap.m.VBox({
                width: "100%",
                height: "100%",
                alignItems: sap.m.FlexAlignItems.Stretch,
                justifyContent: sap.m.FlexJustifyContent.Start,
                items: [
                    new sap.m.VBox({
                        width: "100%",
                        alignItems: sap.m.FlexAlignItems.Stretch,
                        justifyContent: sap.m.FlexJustifyContent.Start,
                        items: [
                            new sap.m.Input("lnm", {
                                value: "",
                                placeholder: "Ders Adı"
                            }),
                            new sap.m.TextArea("lcntn", {
                                width: "100%", growing: true, rows: 3, placeholder: "Dersin Kısa İçeriği"
                            }),
                            new sap.m.Input("lcode", {
                                value: "",
                                placeholder: "Ders Kodu"
                            }),
                            new sap.m.Select("class", {
                                width: "100%",
                                items: [
                                    {
                                        text: "1.Sınıf",
                                        key: "1"
                                    },
                                    {
                                        text: "2.Sınıf",
                                        key: "2"
                                    },
                                    {
                                        text: "3.Sınıf",
                                        key: "3"
                                    },
                                    {
                                        text: "4.Sınıf",
                                        key: "4"
                                    },
                                ]
                            }),
                            new sap.m.Select("period", {
                                width: "100%",
                                items: [
                                    {
                                        text: "1.Dönem",
                                        key: "1"
                                    },
                                    {
                                        text: "2.Dönem",
                                        key: "2"
                                    },
                                ]
                            })
                        ]
                    }),
                    new sap.m.HBox({
                        width: "100%",
                        alignItems: sap.m.FlexAlignItems.Center,
                        justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
                        items: [
                            new sap.m.Button({
                                text: "Kaydet",
                                width: "90px",
                                type: "Unstyled",
                                press: function () {
                                    if (localStorage.getItem("ST") != new Date().toLocaleDateString().split(".")[2]) {
                                        sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
                                    }
                                    else {
                                        if (sap.ui.getCore().byId("lnm").getValue().trim() == "") {
                                            sap.m.MessageToast.show("Ders Adı Alanı Girilmek Zorundadır")
                                        } else if (sap.ui.getCore().byId("lcntn").getValue().trim() == "") {
                                            sap.m.MessageToast.show("Ders İçeriği Girilmek Zorundadır")
                                        } else {
                                            CreateComponent.showBusyIndicator();
                                            var filter = {
                                                lnm: sap.ui.getCore().byId("lnm").getValue().toUpperCase(),
                                                lcntn: sap.ui.getCore().byId("lcntn").getValue().toUpperCase(),
                                                lclass: sap.ui.getCore().byId("class").getSelectedKey().toUpperCase(),
                                                lcruid: oModel.oData.UserModel[0].uid,
                                                lcode: sap.ui.getCore().byId("lcode").getValue().toUpperCase(),
                                                lperiod: sap.ui.getCore().byId("period").getSelectedKey().toUpperCase(),
                                                sid: oModel.oData.section[0].sid
                                            }
                                            LessonService.lessonReq({ SN: "Lesson", MN: "GET", "where": "lnm=? OR lcode=?", allparam: [filter.lnm, filter.lcode]}).then(function (res) {
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
                                                            sap.m.MessageToast.show("Ders Başaryıla Eklendi");
                                                            CreateComponent.hideBusyIndicator();
                                                            sap.ui.getCore().byId("lnm").setValue("");
                                                            sap.ui.getCore().byId("lcode").setValue("");
                                                            sap.ui.getCore().byId("lcntn").setValue("");
                                                            sap.ui.getCore().byId("class").setSelectedKey(1);
                                                            sap.ui.getCore().byId("period").setSelectedKey(1);
                                                            _this.getLesson();
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    }
                                }
                            }).addStyleClass("sapUiSmallMarginBegin"),
                            new sap.m.Button({
                                text: "Vazgeç",
                                width: "90px",
                                type: "Unstyled",
                                press: function () {
                                    _this.lessondialog.close();
                                }
                            }).addStyleClass("sapUiSmallMarginEnd")
                        ]
                    })
                ]
            })
            _this.lessondialog.addContent(lesarea);
            _this.lessondialog.setCustomHeader(bar);
            _this.lessondialog.open();
        },
        onSaveData: function () {
            var _this = this
            if (oModel.oData.selectedLess == undefined || oModel.oData.selectedLess.length == 0) {
                sap.m.MessageToast.show("Lütfen Ders Seçimi Yapınız");
            } else if (_this.checkValidate()[0] == false && _this.checkValidate()[1] == "project") {
                sap.m.MessageToast.show("Lütfen Proje Alanını Doldurun.")
            } else if (_this.checkValidate()[0] == false && _this.checkValidate()[1] == "psd") {
                sap.m.MessageToast.show("Lütfen Proje Açıklamasını Giriniz.")
            } else if (_this.checkValidate()[0] == false && _this.checkValidate()[1] == "ptek") {
                sap.m.MessageToast.show("Lütfen Proje Teknolojilerini Seçiniz.")
            }
            else if (_this.checkValidate()[0] == false && _this.checkValidate()[1] == "pquota") {
                sap.m.MessageToast.show("Proje Kontenjanına Lütfen Sayı Giriniz")
            }
            else {
                if (localStorage.getItem("ST") != new Date().toLocaleDateString().split(".")[2]) {
                    sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
                }
                else {
                    CreateComponent.showBusyIndicator();
                    ProjectService.ProjectReq({ MN: 'GETWHERE', SN: "Project", where: "pjnm=?", allparam: [oModel.oData.projectModel[0].pjnm.toUpperCase()] }).then(function (res) {
                        if (res != "None") {
                            sap.m.MessageToast.show("Bu Proje Mevcut")
                            CreateComponent.hideBusyIndicator();
                        } else {
                            var data = [{
                                uid: oModel.oData.UserModel[0].uid,
                                pjnm: oModel.oData.projectModel[0].pjnm.toUpperCase(),
                                psd: oModel.oData.projectModel[0].psd.toUpperCase(),
                                ptek: oModel.oData.projectModel[0].ptek.toUpperCase(),
                                pperiod: oModel.oData.projectModel[0].pperiod.split('.')[2],
                                pjquota: oModel.oData.projectModel[0].pjquota
                            }];
                            var lessonData = []
                            for (let index = 0; index < oModel.oData.selectedLess.length; index++) {
                                lessonData.push({
                                    lesson: oModel.oData.selectedLess[index].mProperties.key
                                })
                            }
                            var allData = {
                                projectdata: data,
                                lessondata: lessonData,
                                MN: "ADD",
                                SN: "Project"
                            }
                            ProjectService.ProjectReq(allData).then(function (res) {
                                if (res[0] == "None") {
                                    CreateComponent.hideBusyIndicator();
                                    oModel.setProperty("/projectModel", [{
                                        pjnm: "",
                                        psd: "",
                                        ptek: "",
                                        pperiod: new Date().toLocaleDateString("tr-TR"),
                                        pjquota: ""
                                    }])
                                } else {
                                    sap.m.MessageToast.show("Kayıt Başarıyla Gerçekleşti.")
                                    _this.byId("lessonCombo").removeAllSelectedItems();
                                    CreateComponent.hideBusyIndicator();
                                    oModel.setProperty("/projectModel", [{
                                        pjnm: "",
                                        psd: "",
                                        ptek: "",
                                        pperiod: new Date().toLocaleDateString("tr-TR"),
                                        pjquota: ""
                                    }])
                                }

                            })
                        }
                    })
                }
            }
        },
        getLesson: function () {
            if (localStorage.getItem("ST") != new Date().toLocaleDateString().split(".")[2]) {
                sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
            }
            else {
                CreateComponent.showBusyIndicator();
                LessonService.lessonReq({ MN: "GET", "SN": "Lesson", where: "sid=?", allparam: [parseInt(oModel.oData.UserModel[0].sid)] }).then(function (res) {
                    if (res == "None") {
                    } else {
                        oModel.setProperty("/allLesson", res)
                    }
                    CreateComponent.hideBusyIndicator();
                })
            }
        },
        onBeforeShow: function () {
            var _this = this
            UseronLogin.onLogin().then(function (res) {
                _this.getLesson();
            })
        },
    });
});