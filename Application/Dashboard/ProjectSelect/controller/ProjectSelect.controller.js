jQuery.sap.require("schapp.Application.Project.PprojectServicejs.ProjectOnLessonService");
jQuery.sap.require("schapp.Servicejs.ActiveProjectService");
jQuery.sap.require("schapp.Servicejs.UserService");
jQuery.sap.require("schapp.Application.Dashboard.ProjectSelect.FileUpload.fileupload");
jQuery.sap.require("schapp.Application.Dashboard.ProjectSelect.ProjectSelectService.ProjectSelectService");
jQuery.sap.require("schapp.Application.Dashboard.ProjectSelect.UserPointService.UserPointService");
jQuery.sap.require("schapp.Application.Dashboard.SystemSettings.SystemSettingsServicejs.SystemSettings");
sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/ui/model/Filter', "sap/ui/export/Spreadsheet", "sap/ui/model/Sorter"], function (Controller, Filter, Spreadsheet, Sorter) {
    "use strict";
    return Controller.extend("schapp.Application.Dashboard.ProjectSelect.controller.ProjectSelect", {
        onInit: function () {
            var _this = this;
            _this.pjdata = [];
            _this.b64 = ""
            _this.size = "";
            _this.type = "";
            _this.sortData = [];
            this._wizard = this.byId("wizardd");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Dashboard/ProjectSelect").attachPatternMatched(_this.onBeforeShow, _this);
        },
        // searchTable: function (oEvent) {
        //     var _this = this
        //     _this.aFilters = [];
        //     var sQuery = oEvent.getSource().getValue();;
        //     if (sQuery && sQuery.length > 2) {
        //         var pjnm = new Filter("pjnm", sap.ui.model.FilterOperator.Contains, sQuery);
        //         var pjtechnology = new Filter("pjtechnology", sap.ui.model.FilterOperator.Contains, sQuery);
        //         var ufnm = new Filter("ufnm", sap.ui.model.FilterOperator.Contains, sQuery);
        //         var lnm = new Filter("lnm", sap.ui.model.FilterOperator.Contains, sQuery);
        //         _this.aFilters = [pjnm, pjtechnology, ufnm, lnm]
        //         var finalFilter = new Filter({
        //             filters: _this.aFilters,
        //             and: false
        //         })
        //         var filterTable = _this.byId("idactivesproject");
        //         var binding = filterTable.getBinding("rows");
        //         binding.filter(finalFilter, "Application");
        //     } else {
        //         var _this = this;
        //         _this.aFilters = [];
        //         var filterTable = this.byId("idactivesproject");
        //         var binding = filterTable.getBinding("rows");
        //         binding.filter(_this.aFilters, "Application");
        //     }
        // },
        getActiveProject: function () {
            var _this = this
            CreateComponent.showBusyIndicator();
            ActiveProject.ActiveProjReq({
                SN: "ActiveProject",
                MN: "GETLP",
                where: "apperiod=? AND quotaremaning>0",
                allparam: [new Date().toLocaleDateString().split(".")[2]]
            }).then(function (res) {
                if (res == "None") {
                    CreateComponent.hideBusyIndicator();
                    oModel.setProperty("/allProject", []);
                    oModel.setProperty("/oRows", []);
                } else if (res == "") {
                    CreateComponent.hideBusyIndicator();
                    sap.m.MessageToast.show("Sunucuda Hata Gerçekleşti Lütfen Daha Sonra Tekrar Deneyin.")
                } else {
                    CreateComponent.hideBusyIndicator();
                    var projdata = []
                    var data = _.groupBy(res, 'pjid')
                    var pjid = Object.keys(data)
                    pjid.sort()
                    for (let index = 0; index < pjid.length; index++) {
                        var lnm = ""
                        var lid = ""
                        for (let j = 0; j < data[pjid[index]].length; j++) {
                            if (data[pjid[index]].length - 1 == j) {
                                lnm += data[pjid[index]][j].lnm
                                lid += data[pjid[index]][j].lid
                                data[pjid[index]].splice(1, data[pjid[index]].length)

                            } else {
                                lid += data[pjid[index]][j].lid + ","
                                lnm += data[pjid[index]][j].lnm + ","
                            }
                        }
                        data[pjid[index]][0].lid = ""
                        data[pjid[index]][0].lid = lid
                        data[pjid[index]][0].lnm = ""
                        data[pjid[index]][0].lnm = lnm
                        projdata.push(
                            data[pjid[index]][0]
                        )
                    }
                    oModel.setProperty("/allProject", projdata)
                }
            })
        },
        onDelete: function (oEvent) {
            var splicedata = oEvent.mParameters.listItem.oBindingContexts.undefined.sPath.split("/")[2];
            var result = oModel.oData.sorting.splice(splicedata, 1)
            oModel.refresh();
        },
        chechkSort: function () {
            var _this = this
            debugger
            if (!oModel.oData.sorting) {
                sap.m.MessageToast.show("Lütfen Proje Tercih İşlemlerini Tamamlayınız")
                _this.byId("idIconTabBarSeparatorNoIcon").getItems()[6].setEnabled(false);
                return false
            }
            else if (oModel.oData.SysSetProjSelect[0].pjscontenjan != oModel.oData.sorting.length) {
                sap.m.MessageToast.show("Lütfen Proje Tercih İşlemlerini Tamamlayınız")
                _this.byId("idIconTabBarSeparatorNoIcon").getItems()[6].setEnabled(false);
                return false;
            } else {
                _this.byId("idIconTabBarSeparatorNoIcon").getItems()[6].setEnabled(true);
                _this.byId("idIconTabBarSeparatorNoIcon").setSelectedKey("check");
                return true;
            }
        },
        sort: function (oEvent) {
            var _this = this
            if (!_this.sortData.length) {
                _this.sortData.push(oModel.getProperty(oEvent.oSource._getBindingContext().sPath));
            } else {
                var found = _this.sortData.every(function (x) {
                    if (x.pjid == oModel.getProperty(oEvent.oSource._getBindingContext().sPath).pjid) return false
                    else return true
                })
                if (found && _this.sortData.length < oModel.oData.SysSetProjSelect[0].pjscontenjan) {
                    _this.sortData.push(oModel.getProperty(oEvent.oSource._getBindingContext().sPath));
                } else {
                    sap.m.MessageToast.show("Lütfen Proje Tercih Sıranızı Ve Seçimlerinizi Kontrol Ediniz")
                }
            }
            for (let index = 0; index < _this.sortData.length; index++) {
                debugger
                _this.sortData[index].seqnmbr = index + 1;

            }
            oModel.setProperty("/sorting", _this.sortData);
        },
        saveProject: function (control) {
            var _this = this
            var result = true;
            var Table = this.byId("idactivesproject");
            if (Table.getSelectedContextPaths().length > 0) {
                var selected = Table.getSelectedContextPaths();
                if (oModel.oData.SysSetProjSelect[0].pjscontenjan != selected.length) {
                    sap.m.MessageToast.show("Lütfen Toplam " + oModel.oData.UserModel[0].quotaremain + " " + "Adet Proje Seçiniz");
                    _this.pjdata = []
                    result = false;
                } else {
                    for (let index = 0; index < selected.length; index++) {
                        _this.pjdata.push(oModel.getProperty(selected[index]));
                    }
                    var educatorcontrol = _.groupBy(_this.pjdata, 'uid')
                    var lid = [];
                    var lnm = [];
                    var lpntmodel = []
                    if (Object.keys(educatorcontrol).length < oModel.oData.SysSetProjSelect[0].quotaoneducator) {
                        sap.m.MessageToast.show("Lütfen Sistemde Belirtilen Sayı Kadar hoca seçiniz")
                        _this.pjdata = []
                        result = false;
                        CreateComponent.hideBusyIndicator()
                    } else {
                        debugger
                        oModel.setProperty("/pjdata", JSON.parse(JSON.stringify(_this.pjdata)));
                        oModel.oData.pjdata.forEach(function (x) {
                            x.uid = oModel.oData.UserModel[0].uid
                            x.sid = oModel.oData.UserModel[0].sid
                        })
                        for (let index = 0; index < _this.pjdata.length; index++) {
                            if (!_this.pjdata[index].lid.includes(",")) {
                                if (!lid.includes(_this.pjdata[index].lid)) {
                                    lid.push(_this.pjdata[index].lid);
                                    lnm.push(_this.pjdata[index].lnm);
                                }
                            } else {
                                var morelnm = _this.pjdata[index].lnm.split(",");
                                var more = _this.pjdata[index].lid.split(",");
                                for (let index = 0; index < more.length; index++) {
                                    if (!lid.includes(more[index])) {
                                        lid.push(more[index]);
                                        lnm.push(morelnm[index]);
                                    }
                                }
                            }
                        }
                        for (let index = 0; index < lid.length; index++) {
                            lpntmodel.push({
                                lid: lid[index],
                                lnm: lnm[index],
                                upnt: oModel.oData.userpoint == undefined ? "" : oModel.oData.userpoint[index].upnt,
                                uid: oModel.oData.UserModel[0].uid,
                                upperiod: new Date().toLocaleDateString().split(".")[2]
                            })
                        }
                        oModel.setProperty("/userpoint", lpntmodel);
                        _this.pjdata = []
                        result = true;
                    }
                    return result;
                }
            } else {
                result = false;
                sap.m.MessageToast.show("Seçili Kayıt Bulunamadı")
                return result;
            }
        },
        changekey: function (oEvent) {
            var _this = this
            var tabicon = _this.byId("idIconTabBarSeparatorNoIcon");
            // if (oEvent.oSource.getSelectedKey() == "project") {
            //     tabicon.getItems()[2].setEnabled(false);
            //     tabicon.getItems()[4].setEnabled(false);
            //     tabicon.getItems()[6].setEnabled(false);
            // }else if()
            switch (oEvent.oSource.getSelectedKey()) {
                case "project":
                    delete oModel.oData.userpoint
                    tabicon.getItems()[2].setEnabled(false);
                    tabicon.getItems()[4].setEnabled(false);
                    tabicon.getItems()[6].setEnabled(false);
                    tabicon.getItems()[8].setEnabled(false);
                    oModel.refresh()
                    break;

                case "point":
                    tabicon.getItems()[4].setEnabled(false);
                    tabicon.getItems()[6].setEnabled(false);
                    tabicon.getItems()[8].setEnabled(false);
                    oModel.refresh()
                    _this.sortData = [];
                    oModel.setProperty("/sorting", _this.sortData)
                    break;
                case "sort":
                    oModel.refresh()
                    delete oModel.oData.fdata
                    tabicon.getItems()[6].setEnabled(false);
                    tabicon.getItems()[8].setEnabled(false);
                    break;
                case "check":
                    oModel.refresh()
                    tabicon.getItems()[8].setEnabled(false);
                    break;
                    case "file":
                    tabicon.getItems()[8].setEnabled(true);
                    oModel.refresh();
                    break;
            }
        },
        acceptCheck: function (oEvent) {
            var _this = this
            _this.byId("idIconTabBarSeparatorNoIcon").getItems()[8].setEnabled(true);
            _this.byId("idIconTabBarSeparatorNoIcon").setSelectedKey("file");
        },
        projectcheck: function () {
            var _this = this
            var res = true;
            if (_this.saveProject() == true) {
                _this.byId("idIconTabBarSeparatorNoIcon").getItems()[2].setEnabled(true);
                _this.byId("idIconTabBarSeparatorNoIcon").setSelectedKey("point");
                res = true;
            } else {
                oModel.setProperty("/pjdata", []);
                _this.byId("idIconTabBarSeparatorNoIcon").getItems()[2].setEnabled(false);
                res = false;
            }
            return res;
        },
        userpointcheck: function () {
            var _this = this
            var res = true;
            if (_this.userpoint() == true) {
                res = true;
                _this.byId("idIconTabBarSeparatorNoIcon").getItems()[4].setEnabled(true);
                _this.byId("idIconTabBarSeparatorNoIcon").setSelectedKey("sort");
                debugger
            } else {
                _this.byId("idIconTabBarSeparatorNoIcon").getItems()[4].setEnabled(false);
                res = false;
            }
            return res;
        },
        userpoint: function () {
            var result = true;
            for (let index = 0; index < oModel.oData.userpoint.length; index++) {
                if (isNaN(oModel.oData.userpoint[index].upnt)) {
                    result = false;
                    sap.m.MessageToast.show("Lütfen Notlarınızı Kontrol Edin Notlarınız  Yalnızca Sayı Olabilir 0 dan küçük ve 100 den büyük Değerler İçeremez")
                    break;
                }
                if (oModel.oData.userpoint[index].upnt < 0) {
                    result = false;
                    sap.m.MessageToast.show("Lütfen Notlarınızı Kontrol Edin Notlarınız  Yalnızca Sayı Olabilir 0 dan küçük ve 100 den büyük Değerler İçeremez")
                    break;
                }
                if (oModel.oData.userpoint[index].upnt > 100) {
                    result = false;
                    sap.m.MessageToast.show("Lütfen Notlarınızı Kontrol Edin Notlarınız  Yalnızca Sayı Olabilir 0 dan küçük ve 100 den büyük Değerler İçeremez")
                    break;
                }
                if (oModel.oData.userpoint[index].upnt.trim() == "") {
                    result = false;
                    sap.m.MessageToast.show("Lütfen Notlarınızı Kontrol Edin Notlarınız  Yalnızca Sayı Olabilir 0 dan küçük ve 100 den büyük Değerler İçeremez")
                    break;
                }
                else {
                    result = true;
                }
            }
            return result;
        },
        allResult: function () {
            var _this = this
            if (!oModel.oData.fdata) {
                sap.m.MessageToast.show("Lütfen Pdf Dosyası Yükleyiniz.")
            }

            // else if (_this.projectcheck() == false) {
            //     /*sap.m.MessageToast.show("Proje Seçim Ekranında Hata")*/
            // } else if (_this.userpointcheck() == false) {
            //     /* sap.m.MessageToast.show("Not Girme Ekranında Hata")*/
            // } else if (_this.chechkSort() == false) {

            // }
            else {
                delete oModel.oData.pjdata
                debugger
                oModel.setProperty("/pjdata", oModel.oData.sorting);
                debugger
                _this.uploadPdfFile().then(function (res) {
                    if (res == false) {
                    }
                    else if (res == true) {
                        _this.adduserPoint().then(function (res) {
                            if (res == false) {
                                _this.delActiveponUser();
                            }
                            else if (res == true) {
                                _this.upload().then(function (res) {
                                    if (res == false) {
                                        _this.delPoint();
                                        _this.delActiveponUser();
                                    }
                                    else if (res == true) {
                                        _this.setActiveProjectQuota().then(function (res) {
                                            if (res == false) {
                                                _this.delFile();
                                                _this.delPoint();
                                                _this.delActiveponUser();
                                            } else if (res == true) {
                                                _this.userSet();
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        },
        delFile: function () {
            file.addfile({
                MN: "DEL",
                SN: "UploadPdf",
                where: "uid IN" + "(" + oModel.oData.UserModel[0].uid + ")",
            }).then(function (res) { })
        },
        delPoint: function () {
            PointReq.PointReq({
                MN: "DEL",
                SN: "Point",
                allparam: oModel.oData.userpoint,
                where: "uid=?"
            }).then(function (res) {
                if (res == "None") {
                } else if (res == "") {
                }
                else {
                }
            })
        },
        delActiveponUser: function () {
            ProjectSelectReq.getProjectSelectReq({
                MN: 'DEL',
                SN: "ActivePonUser",
                allparam: oModel.oData.pjdata,
                where: "uid=?"
            }).then(function (res) {
                if (res == "None") {
                } else if (res == "") {
                } else {
                }
            })
        },
        uploadPdfFile: function () {
            var deferred = new Promise(function (resolve, reject) {
                CreateComponent.showBusyIndicator();
                ProjectSelectReq.getProjectSelectReq({
                    MN: 'ADD',
                    SN: "ActivePonUser",
                    apudata: oModel.oData.pjdata
                }).then(function (res) {
                    if (res == "None") {
                        CreateComponent.hideBusyIndicator();
                        sap.m.MessageToast.show("Proje Seçim İşlemini Tamamlanamadı Hata.")
                        resolve(false);
                    } else if (res == "") {
                        CreateComponent.hideBusyIndicator();
                        sap.m.MessageToast.show("Bilinmeyen Hata Lütfen Daha Sonra Tekrar Deneyiniz.")
                        resolve(false);
                    } else {
                        resolve(true);
                        CreateComponent.hideBusyIndicator();
                    }
                })
            })
            return deferred;
        },
        adduserPoint: function () {
            var _this = this
            var deferred = new Promise(function (resolve, reject) {
                PointReq.PointReq({
                    MN: "ADD",
                    SN: "Point",
                    pdata: oModel.oData.userpoint
                }).then(function (res) {
                    if (res == "None") {
                        CreateComponent.hideBusyIndicator();
                        sap.m.MessageToast.show("Not Ekleme İşlemi Tamamlanamadı Hata.")
                        resolve(false);
                    } else if (res == "") {
                        CreateComponent.hideBusyIndicator();
                        sap.m.MessageToast.show("Bilinmeyen Hata Lütfen Daha Sonra Tekrar Deneyiniz.")
                        resolve(false);
                    }
                    else {
                        resolve(true);
                        CreateComponent.hideBusyIndicator();
                    }
                });
            })
            return deferred

        },
        userSet: function () {
            var _this = this
            CreateComponent.showBusyIndicator();
            UserServices.UserReq({
                userdata: [{
                    quotaremain: 0
                }],
                SN: "User",
                MN: "SETQUOTA",
                where: "uid=?",
                param: oModel.oData.UserModel[0].uid
            }).then(function (res) {
                if (res == "None") {
                    sap.m.MessageToast.show("Güncelleme Sırasında Hata Oluştu Lütfen Daha Sonra Tekrar Deneyin.")
                } else if (res == "") {
                    sap.m.MessageToast.show("Beklenmeyen Bir Hata Gerçekleşti.")
                } else {
                    sap.m.MessageToast.show("Proje Seçim İşleminiz Başarıyla Tamamlandı")
                    window.location.reload();
                    _this.byId("savedata").setVisible(true)
                    _this.byId("idactivesproject").removeSelections(true);
                    _this.byId("idactivesproject").setMode(sap.m.ListMode.None);
                    var tabicon = _this.byId("idIconTabBarSeparatorNoIcon");
                    tabicon.getItems()[2].setEnabled(false);
                    tabicon.getItems()[4].setEnabled(false);
                    tabicon.getItems()[6].setEnabled(false);
                    tabicon.getItems()[8].setEnabled(false);
                    CreateComponent.hideBusyIndicator();
                    _this.getActiveProject();
                    UseronLogin.onLogin().then(function (res) {
                    })
                }
            })
        },
        upload: function (oEvent) {
            var _this = this
            var deferred = new Promise(function (resolve, reject) {
                file.addfile({
                    MN: "ADD",
                    SN: "UploadPdf",
                    "file": _this.b64,
                    tfperiod:new Date().toLocaleDateString().split(".")[2],
                    tfuid: oModel.oData.UserModel[0].uid,
                    tfname: oModel.oData.UserModel[0].unm,
                    tfsize: _this.size,
                    tftype: _this.type
                }).then(function (res) {
                    if (res == "SuccesAdd") {
                        resolve(true);
                    }
                    else {
                        sap.m.MessageToast.show("Hata Gerçekleşti Lütfen Daha Sonra Tekrar Deneyin");
                    }
                })
            });
            return deferred;
        },
        cvb64: function (param) {
            var _this = this
            _this.b64 = ""
            _this.size = param.size;
            _this.type = param.type;
            var reader = new FileReader();
            var dt = "";
            var deferred = new Promise(function (resolve, reject) {
                if (typeof (FileReader) != "undefined") {
                    reader.onload = function (evn) {
                        dt = evn.target.result;
                        _this.b64 = dt.substring(28);
                        resolve(true)
                    }
                    reader.readAsDataURL(param);
                }
            })
            return deferred;
        },
        changefile: function (oEvent) {
            debugger
            var _this = this
            _this.cvb64(oEvent.getParameter("files")[0]).then(function (res) {
                if (res) {
                    oModel.setProperty("/fdata", _this.b64);
                    // oModel.setProperty("/fdata", oEvent.getParameter("files")[0]);
                }
            })

        },
        setActiveProjectQuota: function () {
            oModel.oData.pjdata.forEach(function (x) {
                x.quotaremaning = x.quotaremaning - 1;
            })
            var deferred = new Promise(function (resolve, reject) {
                ActiveProject.ActiveProjReq({
                    MN: "SET",
                    SN: "ActiveProject",
                    wparam: oModel.oData.pjdata,
                    where: "pjid=?",
                }).then(function (res) {
                    if (res == "SuccedUpdate") {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                })
            })
            return deferred;
        },
        // onAfterRendering: function () {
        //     var _this = this
        //     var oPage = this.getView().byId("wizardContentPage");
        //     debugger
        //     $("#"+oPage.sId+" section").scroll(function(oEvent) {
        //         debugger
        //         var wstep=_this.byId("wizardd");

        //         console.log( wstep.getCurrentStep());
        //         // for (let index = 0; index < wstep.getSteps().length; index++) {
        //         //     const element = array[index];

        //         // }
        //         // wstep.getSteps()[0].sId
        //         debugger

        //     });

        //     //    oPage.attachBrowserEvent("window.scroll", function(oEvent) {
        //     //            console.log("onscoll");
        //     //           });	
        // },
        onBeforeShow: function (argument) {
            var _this = this;
            var tabicon = _this.byId("idIconTabBarSeparatorNoIcon");
            tabicon.getItems()[2].setEnabled(false);
            tabicon.getItems()[4].setEnabled(false);
            tabicon.getItems()[6].setEnabled(false);
            tabicon.getItems()[8].setEnabled(false);
            UseronLogin.onLogin().then(function (res) {
                if (oModel.oData.UserModel[0].quotaremain == "0") {
                    // var wizard = _this.byId("wizardd");
                    // wizard.setCurrentStep("__xmlview1--ProjectStep")
                    // _this._wizard.invalidateStep(_this.byId("ProjectStep"));
                    _this.byId("idactivesproject").setMode(sap.m.ListMode.None);
                    _this.byId("savedata").setVisible(false)
                }
                else {
                    // var wizard = _this.byId("wizardd");
                    // wizard.setCurrentStep("__xmlview1--ProjectStep")
                    // _this._wizard.invalidateStep(_this.byId("ProjectStep"));
                    // _this.byId("idactivesproject").setMode(sap.m.ListMode.MultiSelect);
                    // _this.byId("savedata").setVisible(true)
                }
                _this.getActiveProject();
            })
            SystemService.getSystemSetting({ MN: "GETSYS", SN: "SystemSettings" }).then(function (res) {
                if (res == "None") {
                    oModel.setProperty("/SysSetProjSelect", [])
                } else if (res == "") {
                    sap.m.MessageToast.show("Beklenmeyen Hata Lütfen Daha Sonra Tekrar Deneyiniz")
                } else {
                    oModel.setProperty("/SysSetProjSelect", res)
                }
            })
        },
    });
});
