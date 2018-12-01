jQuery.sap.require("schapp.Application.Dashboard.SectionServicejs.SectionService");
jQuery.sap.require("schapp.Servicejs.PluginsService");
sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
    "use strict";
    return Controller.extend("schapp.Application.Dashboard.AddUser.controller.AddUser", {
        onInit: function () {
            var _this = this;
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Dashboard/AddUser").attachPatternMatched(_this.onBeforeShow, _this);
        },
        checkValidate: function () {
            var result = [false, ""]
            var _this = this
            if (!CreateComponent.validateemail(oModel.oData.AddUser[0].email)) {
                result = [false, "email"];
            }
            else if (oModel.oData.AddUser[0].ufnm.trim() == "" || oModel.oData.AddUser[0].ufnm.trim().length < 3) {
                result = [false, "ufnm"];
            } else if (oModel.oData.AddUser[0].ulnm.trim() == "" || oModel.oData.AddUser[0].ulnm.trim().length < 2) {
                result = [false, "ulnm"];
            }
            else if (oModel.oData.AddUser[0].unm.trim() == "" || oModel.oData.AddUser[0].unm.trim().length < 3) {
                result = [false, "unm"];
            }
            else if (!oModel.oData.AddUser[0].utel.length || oModel.oData.AddUser[0].utel.split("_")[0].length != 11) {
                result = [false, "utel"];
            }
            else if (!oModel.oData.AddUser[0].upass.trim().length || oModel.oData.AddUser[0].upass.trim().length < 6) {
                result = [false, "upass"];
            }
            else {
                result = [true, "validate"]
            }
            return result;
        },
        onAddUser: function () {
            var _this = this
            if (_this.checkValidate()[0] == false && _this.checkValidate()[1] == "email") {
                sap.m.MessageToast.show("Email Adresi Geçersiz.");
            } else if (_this.checkValidate()[0] == false && _this.checkValidate()[1] == "ufnm") {
                sap.m.MessageToast.show("Ad alanı Boş veya 3 karakterden Daha Az olamaz");
            }
            else if (_this.checkValidate()[0] == false && _this.checkValidate()[1] == "ulnm") {
                sap.m.MessageToast.show("Soyad alanı Boş veya 2 karakterden Daha Az olamaz");
            }
            else if (_this.checkValidate()[0] == false && _this.checkValidate()[1] == "unm") {
                sap.m.MessageToast.show("Kullanıcı Adı alanı Boş veya 3 karakterden Daha Az olamaz");
            }
            else if (_this.checkValidate()[0] == false && _this.checkValidate()[1] == "utel") {
                sap.m.MessageToast.show("Telefon Numarası Alanı Geçersiz");
            } else if (_this.checkValidate()[0] == false && _this.checkValidate()[1] == "upass") {
                sap.m.MessageToast.show("Şifre Alanı Boş veya 6 karakterden Daha Az Olamaz");
            } else {
                _this.getAllWhereUser();
            }
        },
        getAllWhereUser: function () {
            var _this = this
            var data = {
                SN: "User",
                MN: "GAUW",
                uwhere: "unm=?",
                uparam: oModel.oData.AddUser[0].unm.toUpperCase(),
                mwhere: "mail=?",
                mparam: oModel.oData.AddUser[0].email,
                pwhere: "pnmbr=?",
                pparam: oModel.oData.AddUser[0].utel
            }
            if (localStorage.getItem("ST") != new Date().toLocaleDateString().split(".")[2]) {
                sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
            }
            else {
                UserServices.UserReq(data).then(function (res) {
                    if (res == "haveUNM") {
                        sap.m.MessageToast.show("Bu Kullanıcı Adı Mevcut")
                    } else if (res == "haveM") {
                        sap.m.MessageToast.show("Bu Email Adresi  Mevcut")
                    } else if (res == "haveP") {
                        sap.m.MessageToast.show("Bu Telefon Numarası  Mevcut")
                    } else if (res == "") {
                        sap.m.MessageToast.show("Sunucuda Hata Gerçekleşti Lütfen Daha Sonra Tekrar Deneyin.")
                    } else {
                        _this.SaveUserData();
                    }
                })
            }
        },
        SaveUserData: function () {
            CreateComponent.showBusyIndicator();
            var _this = this
            oModel.oData.AddUser[0].tid = _this.byId("tid").getSelectedKey();
            oModel.oData.AddUser[0].uauthr = _this.byId("autid").getSelectedKey();
            oModel.oData.AddUser[0].upass = md5(oModel.oData.AddUser[0].upass)
            oModel.oData.AddUser[0].sid = _this.byId("sections").getSelectedKey();
            oModel.oData.AddUser[0].quotaremain = "";
            UserServices.UserReq({ userdata: [oModel.oData.AddUser[0]], MN: "ADD", SN: "User" }).then(function (res) {
                if (res == "SuccesAdd") {
                    CreateComponent.hideBusyIndicator();
                    sap.m.MessageToast.show("Kullanıcı Başarı İle Oluşturuldu");
                    _this.resetdata();
                    oModel.setProperty("/AddUser", data)
                } else if (res == "") {
                    sap.m.MessageToast.show("Sunucuda Hata Gerçekleşti Lütfen Daha Sonra Tekrar Deneyin.")
                } else {
                    sap.m.MessageToast.show("Kullanıcı Oluşturulurken Hata Meydana Geldi");
                    _this.resetdata();
                    CreateComponent.hideBusyIndicator();
                }
            })
        },
        resetdata: function () {
            var data = [{
                ufnm: "",
                ulnm: "",
                unm: "",
                email: "",
                utel: "",
                upass: "",
                upnt: "",
                usno: ""
            }]
            oModel.setProperty("/AddUser", data)
        },
        onBeforeShow: function (argument) {
            var _this = this
            UseronLogin.onLogin().then(function (res) {
                var filter = {
                    MN: "GET",
                    "SN": "Sections",
                }
                SectionService.SectionReq(filter).then(function (res) {
                    if (res != "None") {
                        oModel.setProperty("/section", res)
                    }
                })
                PluginService.PluginReq({ SN: "Authority", MN: "GETA" }).then(function (res) {
                    oModel.setProperty("/authority", res)
                })
                PluginService.PluginReq({ SN: "Title", MN: "GETT" }).then(function (res) {
                    oModel.setProperty("/title", res)
                })
                _this.resetdata();
            })
        },
    });
});