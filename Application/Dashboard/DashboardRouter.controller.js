sap.ui.define(['sap/ui/core/mvc/Controller'], function (Controller) {
    "use strict";
    var PageController = Controller.extend("schapp.Application.Dashboard.DashboardRouter", {
        onInit: function (oEvent) {
            var _this = this
            _this.getView().setModel(oModel);
            UseronLogin.onLogin().then(function (res) {
                Servertime.getY().then(function (res) {
                    if (res != new Date().toLocaleDateString().split(".")[2]) {
                        sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
                    } else {
                        localStorage.setItem("ST", res);
                    }
                })
                _this.getView().addEventDelegate({
                    onBeforeShow: jQuery.proxy(function (evt) {
                        _this.onBeforeShow(_this);
                    }, _this)
                });
            })
        },
        onClose: function (oEvent) {
            var UserModel = {
                name: "",
                pass: ""
            }
            oModel.setProperty("/UserModel", UserModel);
            oModel.setProperty("/userLayout", []);
            window.location.reload();
            UseronLogin.outLogin();
        },
        goHomePage: function () {
            window.open("#/Dashboard/Home", "_self");
        },
        DashboardrouterEvent: function (oEvent) {
            var _this = this
            var url = oEvent.getSource().data("url");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(_this);
            oRouter.navTo("Dashboard/" + url)
        },
    });
    return PageController;
});