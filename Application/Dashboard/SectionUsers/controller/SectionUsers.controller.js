jQuery.sap.require("schapp.Application.Dashboard.SectionServicejs.SectionService");
sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/ui/model/Filter', "sap/ui/export/Spreadsheet", "sap/ui/model/Sorter"], function (Controller, Filter, Spreadsheet, Sorter) {
    "use strict";
    return Controller.extend("schapp.Application.Dashboard.SectionUsers .controller.SectionUsers", {
        onInit: function () {
            var _this = this;
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Dashboard/SectionUsers").attachPatternMatched(_this.onBeforeShow, _this);
        },
        changePaginator: function (oEvent) {
            var _this = this
            CreateComponent.tablaPaginator(_this, 'iduserTable', "alluser", "footerToolbar", parseInt(oEvent.getSource().getSelectedKey()));
        },
        searchTable: function (oEvent) {
            var _this = this
            _this.aFilters = [];
            var sQuery = oEvent.getSource().getValue();;
            if (sQuery && sQuery.length > 2) {
                var ufnm = new Filter("ufnm", sap.ui.model.FilterOperator.Contains, sQuery);
                var ulnm = new Filter("ulnm", sap.ui.model.FilterOperator.Contains, sQuery);
                var mail = new Filter("mail", sap.ui.model.FilterOperator.Contains, sQuery);
                _this.aFilters = [ufnm, ulnm, mail]
                var finalFilter = new Filter({
                    filters: _this.aFilters,
                    and: false
                })
                var filterTable = this.byId("iduserTable");
                var binding = filterTable.getBinding("rows");
                binding.filter(finalFilter, "Application");
            } else {
                var _this = this;
                _this.aFilters = [];
                var filterTable = this.byId("iduserTable");
                var binding = filterTable.getBinding("rows");
                binding.filter(_this.aFilters, "Application");
            }
        },
        getAllUser: function () {
            var _this = this
            if (localStorage.getItem("ST") != new Date().toLocaleDateString().split(".")[2]) {
                sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
            } else {
                CreateComponent.showBusyIndicator();
                SectionService.SectionReq({
                    SN: "Sections",
                    MN: "GETUS",
                    sid: oModel.oData.UserModel[0].sid
                }).then(function (res) {
                    if (res == "None") {
                        oModel.setProperty("/alluser", [])
                        oModel.setProperty("/oRows", [])
                        CreateComponent.hideBusyIndicator();
                    } else if (res == "") {
                        oModel.setProperty("/alluser", [])
                        oModel.setProperty("/oRows", [])
                        CreateComponent.hideBusyIndicator();
                    } else {
                        oModel.setProperty("/alluser", res)
                        CreateComponent.tablaPaginator(_this, 'iduserTable', "alluser", "footerToolbar", parseInt(_this.byId("rid").getSelectedKey()))
                        CreateComponent.hideBusyIndicator();
                    }
                })
            }
        },
        onBeforeShow: function (argument) {
            CreateComponent.showBusyIndicator();
            var _this = this;
            UseronLogin.onLogin().then(function (res) {
                _this.getAllUser();
                CreateComponent.hideBusyIndicator();
            })
        },
    });
});
