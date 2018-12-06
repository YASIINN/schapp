jQuery.sap.require("schapp.Application.Dashboard.LessonServicejs.LessonService");
sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/ui/model/Filter', "sap/ui/export/Spreadsheet", "sap/ui/model/Sorter"], function (Controller, Filter, Spreadsheet, Sorter) {
    "use strict";
    return Controller.extend("schapp.Application.Dashboard.AllLesson.controller.AllLesson", {
        onInit: function () {
            var _this = this;
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Dashboard/AllLesson").attachPatternMatched(_this.onBeforeShow, _this);
        },
        rightClick: function (oEvent) {
            var _this = this
            var sPath = oEvent.getSource()._getBindingContext().sPath
            var oIndex = parseInt(sPath.substring(sPath.lastIndexOf('/') + 1));
            if (oEvent.getSource().mProperties.text == "İlgili Projeler") {
                var param = "#/Lesson/LessonOnProject?LID=" + oModel.oData.oRows[oIndex].lid;
                _this.onGetLesson(param)
            } else if (oEvent.getSource().mProperties.text == "Dersi Görüntüle") {
                var param = "#/Lesson/LessonUd?LID=" + oModel.oData.oRows[oIndex].lid;
                _this.onGetLesson(param)
            }
            else if (oEvent.getSource().mProperties.text == "Dersi Sil") {
                sap.m.MessageBox.confirm("Bu Dersi  ve Bu Derse Bağlı Projeleri Silmek İstediğinize Emin Misiniz ?", {
                    title: "Kayıt Sil",
                    icon: sap.m.MessageBox.Icon.WARNING,
                    actions: ["Evet", "Hayır"],
                    onClose: function (oAction) {
                        if (oAction === "Evet") {
                            if (localStorage.getItem("ST") != new Date().toLocaleDateString().split(".")[2]) {
                                sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
                            }
                            else {
                                CreateComponent.showBusyIndicator(_this, "idlessonTable")

                                LessonService.lessonReq({ SN: "Lesson", "MN": "DEL", where: "lid=?", allparam: [oModel.oData.oRows[oIndex].lid] }).then(function (res) {
                                    if (res == "SuccesDel") {
                                        sap.m.MessageToast.show("Ders Başarıyla Silindi")
                                        _this.allLesson();
                                        CreateComponent.hideBusyIndicator(_this, "idlessonTable")
                                    } else if (res == "None") {
                                        sap.m.MessageToast.show("Kayıt Silinirken Hata Gerçekleşti")
                                        CreateComponent.hideBusyIndicator(_this, "idlessonTable")
                                    }
                                })
                            }
                        } else { CreateComponent.hideBusyIndicator(_this, "idlessonTable") }
                    }
                })
            }
        },
        onGetLesson: function (param) {
            window.open(param);
        },
        searchTable: function (oEvent) {
            var _this = this
            _this.aFilters = [];
            var sQuery = oEvent.getSource().getValue();;
            if (sQuery && sQuery.length > 2) {
                var lnm = new Filter("lnm", sap.ui.model.FilterOperator.Contains, sQuery);
                var lclass = new Filter("lclass", sap.ui.model.FilterOperator.Contains, sQuery);
                var lcntn = new Filter("lcntn", sap.ui.model.FilterOperator.Contains, sQuery);
                _this.aFilters = [lnm, lclass, lcntn]
                var finalFilter = new Filter({
                    filters: _this.aFilters,
                    and: false
                })
                var filterTable = this.byId("idlessonTable");
                var binding = filterTable.getBinding("rows");
                binding.filter(finalFilter, "Application");
            } else {
                var _this = this;
                _this.aFilters = [];
                var filterTable = this.byId("idlessonTable");
                var binding = filterTable.getBinding("rows");
                binding.filter(_this.aFilters, "Application");
            }
        },
        changePaginator: function (oEvent) {
            var _this = this
            CreateComponent.tablaPaginator(_this, 'idlessonTable', "allLesson", 'footerToolbar', parseInt(oEvent.getSource().getSelectedKey()));
        },
        togle: function () {
            var _this = this
            _this.byId("tableVbox").setVisible(false);
        },
        allLesson: function () {
            var _this = this
            if (localStorage.getItem("ST") != new Date().toLocaleDateString().split(".")[2]) {
                sap.m.MessageToast.show("Lütfen Bilgisayarınızın Tarih Ve Saatini Güncelleyiniz.")
            }
            else {
                CreateComponent.showBusyIndicator();
                LessonService.lessonReq({ MN: "GET", "SN": "Lesson",  where: "sid=?", allparam: [parseInt(oModel.oData.UserModel[0].sid)] }).then(function (res) {
                    if (res == "None") {
                        CreateComponent.hideBusyIndicator();
                    } else {
                        oModel.setProperty("/allLesson", res)
                        CreateComponent.tablaPaginator(_this, 'idlessonTable', "allLesson", 'footerToolbar', parseInt(_this.byId("rid").getSelectedKey()));
                        CreateComponent.hideBusyIndicator();
                    }
                })
            }
        },
        onBeforeShow: function (argument) {
            CreateComponent.showBusyIndicator();
            var _this = this;
            UseronLogin.onLogin().then(function (res) {
                _this.allLesson();
                CreateComponent.hideBusyIndicator();
            })
        },
    });
});
