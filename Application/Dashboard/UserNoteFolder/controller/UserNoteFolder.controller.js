jQuery.sap.require("schapp.Application.Dashboard.UserNoteFolder.FolderServicejs.FolderService");
sap.ui.define(["sap/ui/core/mvc/Controller"], function (e) {
    "use strict";
    return e.extend("schapp.Application.Dashboard.SystemSettings.controller.SystemSettings", {
        onInit: function () {
            var _this = this
            var e = this;
            e.getView().setModel(oModel),
                sap.ui.core.UIComponent.getRouterFor(this).getRoute("Dashboard/UserNoteFolder").attachPatternMatched(e.onBeforeShow, e)
        },
        openDialog: function () {
        },
        getFolder: function () {
            FolderService.getFolderReq({ MN: "GET", SN: "UploadPdf" }).then(function (res) {
                debugger
                if (res == "None") {
                    debugger
                } else if (res == "") {

                } else {
                    oModel.setProperty("/Transkriptmodel", res)
                    debugger
                }
            })
        },
        onBeforeShow: function () {
            var _this = this
            UseronLogin.onLogin().then(function (e) {
                _this.getFolder();
                if (localStorage.getItem("ST") != new Date().toLocaleDateString().split(".")[2]) {
                    sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
                }
            })
        }
    })
});