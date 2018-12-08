jQuery.sap.require("schapp.Application.Dashboard.SystemSettings.SystemSettingsServicejs.SystemSettings");
sap.ui.define(["sap/ui/core/mvc/Controller"], function (e) {
    "use strict";
    return e.extend("schapp.Application.Dashboard.SectionAnnouncements.controller.SectionAnnouncements", {
        onInit: function () {
            var _this = this
            oModel.setProperty("/enb", false);
            _this.passvalidate = ""
            var e = this;
            e.getView().setModel(oModel),
                sap.ui.core.UIComponent.getRouterFor(this).getRoute("Dashboard/SectionAnnouncements").attachPatternMatched(e.onBeforeShow, e)
        },
        getSystemSettings: function () {
            var _this = this
            if (localStorage.getItem("ST") != new Date().toLocaleDateString().split(".")[2]) {
                sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
            }
            else {
                SystemService.getSystemSetting({ MN: "GETSYS", SN: "SystemSettings", where: "sid=?", param: oModel.oData.UserModel[0].sid }).then(function (res) {
                    if (res == "None") {
                        oModel.setProperty("/announcements", [])
                    } else if (res == "") {
                        sap.m.MessageToast.show("Beklenmeyen Hata Lütfen Daha Sonra Tekrar Deneyiniz")
                    } else {
                        oModel.setProperty("/announcements", res)
                    }
                })
            }
        },
        onBeforeShow: function () {
            var _this = this
            UseronLogin.onLogin().then(function (e) {
                _this.getSystemSettings();
                if (localStorage.getItem("ST") != new Date().toLocaleDateString().split(".")[2]) {
                    sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
                }
            })
        }
    })
});