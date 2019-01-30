jQuery.sap.require("schapp.Servicejs.MailService");
jQuery.sap.require("schapp.Application.Dashboard.SystemSettings.SystemSettingsServicejs.SystemSettings");
sap.ui.define(["sap/ui/core/mvc/Controller",'sap/m/MessageBox'], function (e,MessageBox) {
    "use strict";
    return e.extend("schapp.Application.Dashboard.SystemSettings.controller.SystemSettings", {
        onInit: function () {
            var _this = this
            oModel.setProperty("/enb", false);
            _this.passvalidate = ""
            var e = this;
            e.getView().setModel(oModel),
                sap.ui.core.UIComponent.getRouterFor(this).getRoute("Dashboard/SystemSettings").attachPatternMatched(e.onBeforeShow, e)
        },
        onShowPass: function (oEvent) {
            var _this = this;
            if (_this.byId("passid").getType() == "Text") {
                _this.byId("showid").setIcon("sap-icon://show");
                _this.byId("passid").setType("Password");
            } else {
                _this.openDialog();
                _this.byId("showid").setIcon("sap-icon://hide");
                _this.byId("passid").setType("Text");
            }
        },
        checkvalidateSys: function () {
            var result = false
            if (!CreateComponent.validateemail(oModel.oData.SysSettings[0].emailaddres)) {
                sap.m.MessageToast.show("Email Adresi Geçersiz");
            }
            else if (oModel.oData.SysSettings[0].emailpass.trim() == "") {
                sap.m.MessageToast.show("Şifre Alanı Zorunludur");
            }
            else if (isNaN(oModel.oData.SysSettings[0].pjscontenjan) || oModel.oData.SysSettings[0].pjscontenjan <= 0) {
                sap.m.MessageToast.show("Kontenjan Alanı Sayı Girilmek Zorundadır");
            }
            else if (isNaN(oModel.oData.SysSettings[0].quotaoneducator) || oModel.oData.SysSettings[0].quotaoneducator <= 0) {
                sap.m.MessageToast.show("Seçilecek Hoca Sayısı Alanı Sayı Girilmek Zorundadır");
            }
            else {
                result = true;
            }
            return result
        },
        backupperiod:function(){
            var _this = this
            MessageBox.warning(
                "Dönem Yedekleme İşlemi Uzun Sürebilir, Tüm Kayıtlar Silinip Yedekleme Yapılacaktır Devam Etmek İstiyor Musunuz ?",
                {
                    title: "Dönem Yedekleme",
                    actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
                    styleClass: "sapUiSizeCompact",
                    initialFocus: MessageBox.Action.OK,
                    onClose: function (sAction) {
                        if (sAction == "OK") {
                            CreateComponent.showBusyIndicator();
                            
                        }else{
                            CreateComponent.hideBusyIndicator();
                        }
                    }
                }
            );
        },
        setSysSetting: function () {
            var _this = this
            var resultboolt = false;
            if (localStorage.getItem("ST") != new Date().toLocaleDateString().split(".")[2]) {
                sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
            }
            else {
                CreateComponent.showBusyIndicator();
                MailService.AddMail({ "systemcheck": [], "maildata": [{ "mail": oModel.oData.SysSettings[0].emailaddres, "messega": "Email Doğrulama", "epass": oModel.oData.SysSettings[0].emailpass, "subject": "KİMLİĞİNİZİ DOĞRULAMAK İÇİN BU MESAJ GÖNDERİLMİŞTİR." }] }).then(function (res) {
                    if (res == "None" || res == "") {
                        CreateComponent.hideBusyIndicator();
                        sap.m.MessageToast.show("Email Adresiniz Veya Parolanız Yanlış");
                    } else {
                        if (_this.checkvalidateSys() == false) {
                        } else {
                            resultboolt = true;
                            _this.setSys();
                        }
                    }
                })
            }
        },
        setSys: function () {
            var _this = this
            CreateComponent.showBusyIndicator();
            SystemService.getSystemSetting({
                MN: "SETSYS", SN: "SystemSettings",
                where: oModel.oData.UserModel[0].sid,
                param: [{
                    pjscontenjan: oModel.oData.SysSettings[0].pjscontenjan,
                    emailaddres: oModel.oData.SysSettings[0].emailaddres,
                    emailpass: oModel.oData.SysSettings[0].emailpass,
                    notice: oModel.oData.SysSettings[0].notice,
                    quotaoneducator: oModel.oData.SysSettings[0].quotaoneducator
                }]
            }).then(function (res) {
                if (res == "None") {
                    oModel.setProperty("/SysSettings", [])
                } else if (res == "") {
                    sap.m.MessageToast.show("Beklenmeyen Hata Lütfen Daha Sonra Tekrar Deneyiniz")
                } else {
                    CreateComponent.hideBusyIndicator();
                    sap.m.MessageToast.show("Sistem Ayarları Güncellendi");
                    oModel.setProperty("/enb", false)
                    _this.getSystemSettings();
                }
            })
        },
        setEnb: function () {
            if (oModel.oData.enb == true) {
                oModel.setProperty("/enb", false);
            } else {
                oModel.setProperty("/enb", true);
            }
        },
        getSystemSettings: function () {
            var _this = this
            if (localStorage.getItem("ST") != new Date().toLocaleDateString().split(".")[2]) {
                sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
            }
            else {
                SystemService.getSystemSetting({ MN: "GETSYS", SN: "SystemSettings", where: "sid=?", param: oModel.oData.UserModel[0].sid }).then(function (res) {
                    if (res == "None") {
                        oModel.setProperty("/SysSettings", [])
                    } else if (res == "") {
                        sap.m.MessageToast.show("Beklenmeyen Hata Lütfen Daha Sonra Tekrar Deneyiniz")
                    } else {
                        oModel.setProperty("/SysSettings", res)
                        oModel.setProperty("/SysSettingsPrev", JSON.parse(JSON.stringify(res)))
                    }
                })
            }
        },
        getuper: function () {
            var _this = this
            SystemService.getSystemSetting({ MN: "GUPER", SN: "SystemSettings" }).then(function (res) {
                if (res == false) {
                    _this.byId("quotaid").setEnabled(false);
                    _this.byId("educatorid").setEnabled(false);
                } else if (res == true) {
                    _this.byId("quotaid").setEnabled(true);
                    _this.byId("educatorid").setEnabled(true);

                } else {
                    _this.byId("quotaid").setEnabled(false);
                    _this.byId("educatorid").setEnabled(false);
                }
            })
        },
        onBeforeShow: function () {
            var _this = this
            UseronLogin.onLogin().then(function (e) {
                _this.getSystemSettings();
                _this.getuper();
                if (localStorage.getItem("ST") != new Date().toLocaleDateString().split(".")[2]) {
                    sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
                }
            })
        }
    })
});