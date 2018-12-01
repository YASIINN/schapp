jQuery.sap.require("schapp.Application.Dashboard.SystemSettings.SystemSettingsServicejs.SystemSettings");
jQuery.sap.require("schapp.Servicejs.MailService");
jQuery.sap.require("schapp.Servicejs.UserService");
jQuery.sap.require("schapp.Application.Register.RegisterServicejs.RegisterService");
sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/ui/model/Filter', "sap/ui/export/Spreadsheet", "sap/ui/model/Sorter"], function (Controller, Filter, Spreadsheet, Sorter) {
    "use strict";
    return Controller.extend("schapp.Application.Dashboard.AcceptUsers.controller.AcceptUsers", {
        onInit: function () {
            var _this = this;
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Dashboard/AcceptUsers").attachPatternMatched(_this.onBeforeShow, _this);
        },
        searchTable: function (oEvent) {
            var _this = this
            _this.aFilters = [];
            var sQuery = oEvent.getSource().getValue();;
            if (sQuery && sQuery.length > 2) {
                var rtnm = new Filter("rtnm", sap.ui.model.FilterOperator.Contains, sQuery);
                var rtlnm = new Filter("rtlnm", sap.ui.model.FilterOperator.Contains, sQuery);
                var rtsno = new Filter("rtsno", sap.ui.model.FilterOperator.Contains, sQuery);
                var rttcno = new Filter("rttcno", sap.ui.model.FilterOperator.Contains, sQuery);
                _this.aFilters = [rtnm, rtlnm, rtsno, rttcno]
                var finalFilter = new Filter({
                    filters: _this.aFilters,
                    and: false
                })
                var filterTable = this.byId("idacceptusers");
                var binding = filterTable.getBinding("rows");
                binding.filter(finalFilter, "Application");
            } else {
                var _this = this;
                _this.aFilters = [];
                var filterTable = this.byId("idacceptusers");
                var binding = filterTable.getBinding("rows");
                binding.filter(_this.aFilters, "Application");
            }
        },
        getAcceptUser: function () {
            var _this = this
            if (localStorage.getItem("ST") != new Date().toLocaleDateString().split(".")[2]) {
                sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
            }
            else {
                CreateComponent.showBusyIndicator();
                RegisterService.RegisterReq({ SN: "Register", MN: "GET", where: "sid=?", param: [oModel.oData.UserModel[0].sid] }).then(function (res) {
                    if (res == "None") {
                        CreateComponent.hideBusyIndicator();
                        oModel.setProperty("/acceptuser", []);
                        oModel.setProperty("/oRows", []);
                    }
                    else if (res == "") {
                        CreateComponent.hideBusyIndicator();
                        oModel.setProperty("/acceptuser", []);
                        oModel.setProperty("/oRows", []);
                        sap.m.MessageToast.show("Sunucuda Hata Gerçekleşti Lütfen Daha Sonra Tekrar Deneyin.")
                    } else {
                        CreateComponent.hideBusyIndicator();
                        oModel.setProperty("/acceptuser", res)
                        CreateComponent.tablaPaginator(_this, 'idacceptusers', "acceptuser", "footerToolbar", parseInt(_this.byId("rid").getSelectedKey()))
                    }
                })
            }
        },
        changePaginator: function (oEvent) {
            var _this = this
            CreateComponent.tablaPaginator(_this, 'idacceptusers', "acceptuser", "footerToolbar", parseInt(oEvent.getSource().getSelectedKey()));
        },
        delRegister: function () {
            var _this = this
            var Table = _this.byId("idacceptusers");
            var rdata = []
            var mdata = []
            var selected = Table.getSelectedIndices();
            if (_this.byId("idacceptusers").getSelectedIndices().length > 0) {
                for (let index = 0; index < Table.getSelectedIndices().length; index++) {
                    var spath = _this.byId("idacceptusers").getRows()[selected[index]]._getBindingContext().sPath
                    mdata.push({
                        "mail": oModel.getProperty(spath).rtemail,
                        "messega": "Kaydınız  Onaylandı Şifreniz TC KİMLİK NUMARANIZ olarak Belirlenmiştir."
                    })
                    rdata.push({
                        rtemail: oModel.getProperty(spath).rtemail,
                        rid: oModel.getProperty(spath).rtid
                    })
                }
                    if (localStorage.getItem("ST") != new Date().toLocaleDateString().split(".")[2]) {
                        sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
                    } else {
                        CreateComponent.showBusyIndicator();
                        var param = "";
                        for (let index = 0; index < rdata.length; index++) {
                            if (index == rdata.length - 1) {
                                param += "'" + rdata[index].rid + "'"
                            } else {
                                param += "'" + rdata[index].rid + "'" + ","
                            }
                        }
                        debugger
                        RegisterService.RegisterReq({
                            MN: "DEL",
                            SN: "Register",
                            where: "rtid IN " + "(" + param + ")",
                            param: []
                        }).then(function (res) {
                            if (res == "SuccesDel") {
                                CreateComponent.hideBusyIndicator();
                                sap.m.MessageToast.show("İşlem Başarıyla Gerçekleşti")
                                MailService.AddMail({ maildata: mdata }).then(function (res) {
                                })
                                _this.getAcceptUser();
                            } else if (res == "None") {
                                sap.m.MessageToast.show("Lütfen Daha Sonra Tekrar Deneyin")
                            }
                        })
                    }
            } else {
                sap.m.MessageToast.show("Seçili Kayıt Bulunamadı");
            }
        },
        AddUser: function () {
            var _this = this
            if (localStorage.getItem("ST") != new Date().toLocaleDateString().split(".")[2]) {
                sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
            } else {
                var data = []
                var Table = _this.byId("idacceptusers");
                if (_this.byId("idacceptusers").getSelectedIndices().length > 0) {
                    var selected = Table.getSelectedIndices();
                    for (let index = 0; index < Table.getSelectedIndices().length; index++) {
                        var spath = _this.byId("idacceptusers").getRows()[selected[index]]._getBindingContext().sPath
                        data.push({
                            ufnm: oModel.getProperty(spath).rtnm,
                            ulnm: oModel.getProperty(spath).rtlnm,
                            utel: oModel.getProperty(spath).phone,
                            email: oModel.getProperty(spath).rtemail,
                            upnt: "",
                            tid: "2",
                            uauthr: "3",
                            usno: oModel.getProperty(spath).rtsno,
                            sid: parseInt(oModel.getProperty(spath).sid),
                            unm: oModel.getProperty(spath).rtsno,
                            upass: md5(oModel.getProperty(spath).rttcno),
                            quotaremain: oModel.oData.SysSettings[0].pjscontenjan,
                        })
                    }
                    UserServices.UserReq({ MN: "ADD", SN: "User", userdata: data }).then(function (res) {
                        if (res == "SuccesAdd") {
                            _this.delRegister();
                        } else if (res == "") {
                            sap.m.MessageToast.show("Sunucuda Hata Gerçekleşti Lütfen Daha Sonra Tekrar Deneyiniz")
                        } else if (res == "None") {
                            sap.m.MessageToast.show("Bilinmeyen Bir Hata Gerçekleşti Lütfen Daha Sonra Tekrar Deneyiniz")
                        }
                    })
                }
                else {
                    sap.m.MessageToast.show("Seçili Kayıt Bulunamadı")
                }
            }
        },
        onBeforeShow: function (argument) {
            var _this = this;
            UseronLogin.onLogin().then(function (res) {
                SystemService.getSystemSetting({ MN: "GETSYS", SN: "SystemSettings" }).then(function (res) {
                    if (res == "None") {
                        oModel.setProperty("/SysSettings", [])
                    } else if (res == "") {
                        sap.m.MessageToast.show("Beklenmeyen Hata Lütfen Daha Sonra Tekrar Deneyiniz")
                    } else {
                        oModel.setProperty("/SysSettings", res)
                    }
                })
                _this.getAcceptUser();
            })
        },
    });
});
