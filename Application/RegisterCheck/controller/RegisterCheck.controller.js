sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'sap/m/Dialog', 'sap/m/MessageToast', 'sap/m/Button', 'sap/m/Text', 'sap/m/GroupHeaderListItem', 'sap/viz/ui5/core/BaseChart'], function (Controller, JSONModel, Dialog, MessageToast, Button, Text, GroupHeaderListItem, BaseChart) {
    "use strict";
    var lid = ""
    var i = 120;
    var timeControl = ""
    var myControl = Controller.extend("schapp.Application.RegisterCheck.controller.RegisterCheck", {
        onInit: function () {
            var _this = this;
            _this.getView().setModel(oModel);
            if (oModel.oData.userRegister == undefined) {
                // UserServices.UserReq({ SN: "Register", MN: "DELALL" }).then(function (res) {
                // })
                UseronLogin.outLogin();
            } else {
                lid = _this.byId("lid");
                timeControl = setInterval(_this.timerfunction, 1000)
            }
        },
        timerfunction: function () {
            var _this = this
            lid.setText(i--)
            if (lid.getText() == "0") {
                clearInterval(timeControl);
                // if (oModel.oData.userRegister != undefined) {
                //     if (oModel.oData.userRegister[0].rtrcode) {
                //         var param = "'" + oModel.oData.userRegister[0].rtrcode + "'";
                //         UserServices.UserReq({ SN: "Register", MN: "DEL", where: "rtrcode", param: param }).then(function (res) {
                //         })
                //     }
                // } else {
                //     UserServices.UserReq({ SN: "Register", MN: "DELALL" }).then(function (res) {
                //     })
                // }
                delete oModel.oData.userRegister
                lid.setText("")
                UseronLogin.outLogin();
            }
        },
        onPress: function () {
            CreateComponent.showBusyIndicator();
            var _this = this
            var oRouter = sap.ui.core.UIComponent.getRouterFor(_this);
            if (oModel.oData.userRegister[0].rtrcode == _this.byId("codeInput").getValue()) {
                CreateComponent.hideBusyIndicator();
                sap.m.MessageToast.show("İşleminiz Onaylandı ");
                oRouter.navTo("Login");
            } else {
                sap.m.MessageToast.show("Kod Geçersiz !")
                CreateComponent.hideBusyIndicator();
            }
        },
    });
    return myControl;
});