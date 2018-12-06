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
        getTranskriptFolder: function (oEvent) {
            jQuery.sap.require("schapp.Application.Dashboard.TFolder.controller.TFolder");
            TFolder.open(oModel.getProperty(oEvent.getSource().getBindingContext().sPath).tfname);
        },
        getFolder: function () {
            CreateComponent.showBusyIndicator();
            FolderService.getFolderReq({ MN: "GET", SN: "UploadPdf", where: "tfperiod=? AND sid=? ", param: [new Date().toLocaleDateString().split(".")[2], oModel.oData.UserModel[0].sid] }).then(function (res) {
                debugger
                if (res == "None") {
                    CreateComponent.hideBusyIndicator();
                } else if (res == "") {
                    CreateComponent.hideBusyIndicator();
                } else {
                    CreateComponent.hideBusyIndicator();
                    oModel.setProperty("/Transkriptmodel", res)
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