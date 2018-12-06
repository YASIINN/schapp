
jQuery.sap.require("schapp.Application.Dashboard.ProjectOnStudtens.Servicejs.ProjectStudentS");
sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/ui/model/Filter', "sap/ui/export/Spreadsheet", "sap/ui/model/Sorter"], function (Controller, Filter, Spreadsheet, Sorter) {
    "use strict";
    return Controller.extend("schapp.Application.Dashboard.ProjectOnStudtens.controller.ProjectOnStudtens", {
        onInit: function () {
            var _this = this;
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Dashboard/ProjectOnStudtens").attachPatternMatched(_this.onBeforeShow, _this);
        },
        getData: function () {
            var _this = this
            PStudent.psreq({
                SN: "ActivePonUser",
                MN: "GETMY",
                where: "p.uid=?",
                param: [oModel.oData.UserModel[0].uid]
            }).then(function (res) {
                if (res == "None") {

                } else if (res == "") {
                    sap.m.MessageToast.show("Beklenmeyen Hata Lütfen Daha Sonra Tekrar Deneyiniz")

                } else {
                    _this.getAvarage(res);
                }
            })
        },
        getAvarage: function (param) {
            var _this = this
            var nmodel = [];
            var udata = [];
            debugger
            for (let index = 0; index < param.length; index++) {
                udata.push({
                    where: "pjid=? AND uid=?",
                    param: [param[index].pjid, param[index].uid]
                })

            }
            PStudent.psreq({
                SN: "ActivePonUser",
                MN: "GETAVARAGE",
                udata: udata
            }).then(function (res) {
                debugger
                for (let index = 0; index < param.length; index++) {
                    debugger
                    param[index].avg = res[index]["AVG(upnt)"]
                    nmodel.push(param[index])
                }
                oModel.setProperty("/psmodel", nmodel);
                CreateComponent.tablaPaginator(_this, 'idstudent', "psmodel", "footerToolbar", parseInt(_this.byId("rid").getSelectedKey()));
            })

        },
        onBeforeShow: function (argument) {
            var _this = this;
            UseronLogin.onLogin().then(function (res) {
                _this.getData();
            });
        },
    });
});