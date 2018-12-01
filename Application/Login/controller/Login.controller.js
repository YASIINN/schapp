sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'sap/m/Dialog', 'sap/m/MessageToast', 'sap/m/Button', 'sap/m/Text', 'sap/m/GroupHeaderListItem', 'sap/viz/ui5/core/BaseChart'], function (Controller, JSONModel, Dialog, MessageToast, Button, Text, GroupHeaderListItem, BaseChart) {
    "use strict";
    var myControl = Controller.extend("schapp.Application.Login.controller.Login", {
        onInit: function () {
            var _this = this;
            _this.getView().setModel(oModel);
            var UserModel = {
                name: "",
                pass: ""
            }
            oModel.setProperty("/UserModel", UserModel);
            Servertime.getY().then(function (res) {
                if (res != new Date().toLocaleDateString().split(".")[2]) {
                    sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
                }
            })
        },
        onPress: function () {
            var _this = this;
            if (_this.checkValidate()[0] == false && _this.checkValidate()[1] == "blank") {
                sap.m.MessageToast.show("Kullanıcı Adı Veya Şifre Alanı Boş Bırakılamaz.");
            }
            else if (_this.checkValidate()[0] == false && _this.checkValidate()[1] == "length") {
                sap.m.MessageToast.show("Kullanıcı Adı Veya Şifre Alanı 3 Karakterden Az Olamaz.");
            }
            else {
                var data = {
                    name: oModel.oData.UserModel.name.toUpperCase(),
                    pass: md5(oModel.oData.UserModel.pass),
                    MN: "LG",
                    SN: "Login"
                }
                UseronLogin.onLoginControl(data).then(function (res) {
                    if (res == true) {
                        _this.onGoHome();
                    }
                })
            }
        },
        checkValidate: function () {
            var result = [false, ""]
            if (oModel.oData.UserModel.pass.trim() == "" || oModel.oData.UserModel.name.trim() == "") {
                result = [false, "blank"];
            } else if (oModel.oData.UserModel.pass.length < 3 || oModel.oData.UserModel.name.trim().length < 3) {
                result = [false, "length"];
            }
            else {
                result = [true, "validate"]
            }
            return result;
        },
        onGoHome: function () {
            var _this = this
            if (oModel.oData.UserModel) {
                UseronLogin.getUserLayout(base64.objectDecode(localStorage.getItem("UNM")).tid).then(function (res) {
                    oModel.setProperty("/userLayout", res);
                    window.open("#/Dashboard/Home" + "", "_self");
                })
            }
            else {
            }
        },
        onGoRegister: function (oEvent) {
            var url = oEvent.getSource().data("url");
            if (url) {
                window.open("#/" + url)
            } else {
                window.open(" ");
            }
        }

    });
    return myControl;
});